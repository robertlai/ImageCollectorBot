import _ from 'lodash';

const regex = {
	users: /^>users$/,
	admin: /^>admin$/,
	blacklist: /^>blacklist$/,
	postImg: /^>postImg$/,
	channels: /^>channels$/,
	albums: /^>albums$/,
	announce: /^>announce$/,
	count: /^>count$/,
	help: /^>help$/,
	leaderboard: /^>leaderboard$/
};

function CommonCommands(message, bot, Data) {
	if(regex.help.test(message.content)) {
		console.log('>Received help command.');
		bot.sendMessage(
			message.channel,
			'**Common commands:**\n' +
			'>help - List commands\n' +
			'>users - List users in user list\n' +
			'>admin - List users in admin list\n' +
			'>blacklist - List users in the blacklist\n' +
			'>postImg - Toggle posting images to a channel\n' +
			'>announce - Toggle posting announcements in a channel\n' +
			'>channels - List channels\n' +
			'>albums - List albums\n' +
			'>count - Post the image count of the current album\n' +
			'>leaderboard - Post the current monthly leaderboard\n' +
			'**User commands:**\n' +
			'>getImg - Toggle getting images from a channel\n' +
			'>delete - Remove an image from an album on imgur\n' +
			'**Admin commands:**\n' +
			'>listen - Add users to the user list\n' +
			'>unlisten - Remove users from the user list\n' +
			'>ignore - Add users to the blacklist\n' +
			'>unignore - Remove users from the blacklist\n' +
			'>join - Join servers\n\n' +
			'Visit me on github: https://github.com/robertlai/ImageCollectorBot\n' +
			'For feature requests, open a github issue.'
		);
		console.log('>Posted command list.');
	}
	else if(regex.leaderboard.test(message.content)) {
		console.log('>Received leaderboard command.');
		if(Data.trackScores) {
			const leaders = _(Data.scores)
				.map((score, id) => {
					return {
						id: id,
						score: score
					};
				})
				.sortBy((user) => {
					return user.score * -1;
				})
				.slice(0, 10)
				.value();
			bot.sendMessage(
				message.channel,
				'**Current standings for ' + Data.currentMonth + ':**\n' +
				_.map(leaders, (user, i) => {
					return `${i + 1} - ${bot.users.get('id', user.id).username} (${user.score})`;
				}).join('\n')
			);
			console.log('>Posted leaderboard.');
		}
		else {
			bot.sendMessage(
				message.channel,
				'**Score tracking is not active.**'
			);
		}
	}
	else if(regex.albums.test(message.content)) {
		console.log('>Received albums command.');
		const albumList = _.map(Data.albums, (album, title) => {
			return `- ${title}: https://imgur.com/a/${album.id} (${album.imgCount} images)`;
		});
		bot.sendMessage(
			message.channel,
			'**Albums:**\n' + albumList.join('\n')
		);
		console.log('>Posted album list.');
	}
	else if(regex.count.test(message.content)) {
		console.log('>Received count command.');
		bot.sendMessage(
			message.channel,
			`**Album ${Data.currentMonth} now contains ${Data.albums[Data.currentMonth].imgCount} images!**`
		);
		console.log('>Posted image count.');
	}
	else if(regex.channels.test(message.content)) {
		console.log('>Received channels command.');
		const inChannelList = _.map(Data.inChannels, (channel) => {
			return `- ${channel.name} in ${channel.server.name}`;
		});
		const outChannelList = _.map(Data.outChannels, (channel) => {
			return `- ${channel.name} in ${channel.server.name}`;
		});
		const announceChannelList = _.map(Data.announceChannels, (channel) => {
			return `- ${channel.name} in ${channel.server.name}`;
		});
		bot.sendMessage(
			message.channel,
			'**Getting images from:**\n' + inChannelList.join('\n') +
			'\n**Posting images to:**\n' + outChannelList.join('\n') +
			'\n**Posting announcements in:**\n' + announceChannelList.join('\n')
		);
		console.log('>Posted channel list.');
	}
	else if(regex.blacklist.test(message.content)) {
		console.log('>Received blacklist command.');
		const blacklist = _.map(Data.blacklist, (user) => {
			return `- ${user.username} (${user.id})`;
		});
		bot.sendMessage(
			message.channel,
			'**Blacklist:**\n' + blacklist.join('\n')
		);
		console.log('>Posted blacklist.');
	}
	else if(regex.users.test(message.content)) {
		console.log('>Received users command.');
		const userList = _.map(Data.users, (user) => {
			return `- ${user.username} (${user.id})`;
		});
		bot.sendMessage(
			message.channel,
			'**Users:**\n' + userList.join('\n')
		);
		console.log('>Posted user list.');
	}
	else if(regex.admin.test(message.content)) {
		console.log('>Received admin command.');
		const adminList = _.map(Data.admin, (user) => {
			return `- ${user.username} (${user.id})`;
		});
		bot.sendMessage(
			message.channel,
			'**Administrators:**\n' + adminList.join('\n')
		);
		console.log('>Posted admin list.');
	}
	else if(regex.postImg.test(message.content)) {
		console.log('>Received postImg command.');
		if(message.author.id === message.channel.server.ownerID) {
			let channel = _.pick(message.channel, ['id', 'name', 'server']);
			channel.server = _.pick(channel.server, ['id', 'name']);
			const channelString = `${channel.name} in ${channel.server.name}`;
			Data.outChannels = _.xorBy(Data.outChannels, [channel], 'id');
			const addedChannel = _.map(Data.outChannels, 'id').indexOf(channel.id) !== -1;
			console.log('>' + (addedChannel ? 'Added' : 'Removed') + ' outChannel.');
			console.log('================================================================');
			console.log('Channel: ' + channelString);
			console.log('Time: ' + new Date());
			console.log('================================================================');
			Data.writeData();
			bot.sendMessage(
				message.channel,
				`**${addedChannel ? 'P' : 'No longer p'}osting images to:** ${channelString}.`
			);
		}
		else {
			bot.sendMessage(
				message.channel,
				'**This command can only be used by the server owner.**'
			);
			console.log('>Unauthorized.');
		}
	}
	else if(regex.announce.test(message.content)) {
		console.log('>Received announce command.');
		if(message.author.id === message.channel.server.ownerID) {
			let channel = _.pick(message.channel, ['id', 'name', 'server']);
			channel.server = _.pick(channel.server, ['id', 'name']);
			const channelString = `${channel.name} in ${channel.server.name}`;
			Data.announceChannels = _.xorBy(Data.announceChannels, [channel], 'id');
			const addedChannel = _.map(Data.announceChannels, 'id').indexOf(channel.id) !== -1;
			console.log('>' + (addedChannel ? 'Added' : 'Removed') + ' announceChannel.');
			console.log('================================================================');
			console.log('Channel: ' + channelString);
			console.log('Time: ' + new Date());
			console.log('================================================================');
			Data.writeData();
			bot.sendMessage(
				message.channel,
				`**${addedChannel ? 'P' : 'No longer p'}osting announcements in:** ${channelString}.`
			);
		}
		else {
			bot.sendMessage(
				message.channel,
				'**This command can only be used by the server owner.**'
			);
			console.log('>Unauthorized.');
		}
	}
}

export default CommonCommands;