import _ from 'lodash';

function CommonCommands(message, bot, Data) {
	if(/^>users$/.test(message.content)) {
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
	else if(/^>admin$/.test(message.content)) {
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
	else if(/^>blacklist$/.test(message.content)) {
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
	else if(/^>channels$/.test(message.content)) {
		console.log('>Received channels command.');
		const inChannelList = _.map(Data.inChannels, (channel) => {
			return `- ${channel.name} in ${channel.server.name}`;
		});
		const outChannelList = _.map(Data.outChannels, (channel) => {
			return `- ${channel.name} in ${channel.server.name}`;
		});
		bot.sendMessage(
			message.channel,
			'**Getting images from:**\n' + inChannelList.join('\n') +
			'\n**Posting images to:**\n' + outChannelList.join('\n')
		);
		console.log('>Posted channel list.');
	}
	else if(/^>albums$/.test(message.content)) {
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
	else if(/^>getZip/.test(message.content)) {
		console.log('>Received getZip command.');
		const album = message.content.split(' ')[1];
		if(album && Data.albums[album]) {
			bot.sendMessage(
				message.channel,
				`${album}: https://s.imgur.com/a/${Data.albums[album].id}/zip`
			);
			console.log('>Posted album zip link.');
		}
		else {
			bot.sendMessage(
				message.channel,
				'**Invalid parameters.**'
			);
			console.log('>Invalid parameters.');
		}
	}
	else if(/^>announce/.test(message.content)) {
		console.log('>Received announce command.');
		if(message.author.id === message.channel.server.ownerID) {
			var channel = _.pick(message.channel, ['id', 'name', 'server']);
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
	else if(/^>count/.test(message.content)) {
		console.log('>Received count command.');
		bot.sendMessage(
			message.channel,
			`**Album ${Data.currentMonth} now contains ${Data.albums[Data.currentMonth].imgCount} images!**`
		);
		console.log('>Posted image count.');
	}
	else if(/^>help$/.test(message.content)) {
		console.log('>Received help command.');
		bot.sendMessage(
			message.channel,
			'**Common commands:**\n' +
			'>help - List commands\n' +
			'>users - List users in user list\n' +
			'>admin - List users in admin list\n' +
			'>blacklist - List users in the blacklist\n' +
			'>channels - List channels\n' +
			'>albums - List albums\n' +
			'>getZip - Link a zipped album\n' +
			'>announce - Toggle posting announcements in a channel\n' +
			'>count - Post the image count of the current album\n' +
			'**User commands:**\n' +
			'>getImg - Toggle getting images from a channel\n' +
			'**Admin commands:**\n' +
			'>listen - Add users to the user list\n' +
			'>unlisten - Remove users from the user list\n' +
			'>ignore - Add users to the blacklist\n' +
			'>unignore - Remove users from the blacklist\n' +
			'>postImg - Toggle posting images to a channel\n' +
			'>join - Join servers\n\n' +
			'Visit me on github: https://github.com/robertlai/ImageCollectorBot\n' +
			'For feature requests, open a github issue.'
		);
		console.log('>Posted command list.');
	}
}

export default CommonCommands;