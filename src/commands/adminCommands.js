import _ from 'lodash';

function AdminCommands(message, bot, Data) {
	if(/^>listen/.test(message.content)) {
		console.log('>Received listen command.');
		if(/^>listen(\s*<@\d+>\s*)+$/.test(message.content)){
			const users = _.map(message.mentions, (user) => _.pick(user, ['id', 'username']));
			const usersString = _.map(users, 'username').join(', ');
			Data.users = _.unionBy(Data.users, users, 'id');
			console.log('>Added users.');
			console.log('================================================================');
			console.log('Users: ' + usersString);
			console.log('Time: ' + new Date());
			console.log('================================================================');
			Data.writeData();
			bot.sendMessage(
				message.channel,
				'**Added users:** ' + usersString
			);
		}
		else {
			bot.sendMessage(
				message.channel,
				'**Invalid parameters.**'
			);
			console.log('>Invalid parameters.');
		}
	}
	else if(/^>unlisten/.test(message.content)) {
		console.log('>Received unlisten command.');
		if(/^>unlisten(\s*<@\d+>\s*)+$/.test(message.content)){
			const users = _.map(message.mentions, (user) => _.pick(user, ['id', 'username']));
			const usersString = _.map(users, 'username').join(', ');
			Data.users = _.differenceBy(Data.users, users, 'id');
			console.log('>Removed users.');
			console.log('================================================================');
			console.log('Users: ' + usersString);
			console.log('Time: ' + new Date());
			console.log('================================================================');
			Data.writeData();
			bot.sendMessage(
				message.channel,
				'**Removed users:** ' + usersString
			);
		}
		else {
			bot.sendMessage(
				message.channel,
				'**Invalid parameters.**'
			);
			console.log('>Invalid parameters.');
		}
	}
	else if(/^>postImg$/.test(message.content)) {
		console.log('>Received postImg command.');
		var channel = _.pick(message.channel, ['id', 'name', 'server']);
		channel.server = _.pick(channel.server, ['id', 'name']);
		const channelString = `${channel.name} in ${channel.server.name}`;
		Data.outChannels = _.xorBy(Data.outChannels, [channel], 'id');
		const addedChannel = _.map(Data.outChannels, 'id').indexOf(channel.id) !== -1;
		console.log('>' + (addedChannel ? 'Added' : 'Removed') + 'inChannel.');
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
}

export default AdminCommands;