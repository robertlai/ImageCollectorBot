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
	else if(/^>ignore/.test(message.content)) {
		console.log('>Received ignore command.');
		if(/^>ignore(\s*<@\d+>\s*)+$/.test(message.content)){
			const users = _.map(message.mentions, (user) => _.pick(user, ['id', 'username']));
			const usersString = _.map(users, 'username').join(', ');
			Data.blacklist = _.unionBy(Data.blacklist, users, 'id');
			console.log('>Ignored users.');
			console.log('================================================================');
			console.log('Users: ' + usersString);
			console.log('Time: ' + new Date());
			console.log('================================================================');
			Data.writeData();
			bot.sendMessage(
				message.channel,
				'**Ignored users:** ' + usersString
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
	else if(/^>unignore/.test(message.content)) {
		console.log('>Received unignore command.');
		if(/^>unignore(\s*<@\d+>\s*)+$/.test(message.content)){
			const users = _.map(message.mentions, (user) => _.pick(user, ['id', 'username']));
			const usersString = _.map(users, 'username').join(', ');
			Data.blacklist = _.differenceBy(Data.blacklist, users, 'id');
			console.log('>Unignored users.');
			console.log('================================================================');
			console.log('Users: ' + usersString);
			console.log('Time: ' + new Date());
			console.log('================================================================');
			Data.writeData();
			bot.sendMessage(
				message.channel,
				'**Unignored users:** ' + usersString
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
	else if(/^>join/.test(message.content)) {
		console.log('>Received join command.');
		if(/^>join(\s*https?:\/\/discord\.gg\/[A-Za-z0-9]+\s*)+$/.test(message.content)) {
			const invites = message.content.match(/https?:\/\/discord\.gg\/[A-Za-z0-9]+/gi);
			_.forEach(invites, (invite) => {
				bot.joinServer(invite);
			});
			bot.sendMessage(
				message.channel,
				'**Joined Servers.**'
			);
			console.log('>Joined servers.');
		}
		else {
			bot.sendMessage(
				message.channel,
				'**Invalid parameters.**'
			);
			console.log('>Invalid parameters.');
		}
	}
}

export default AdminCommands;