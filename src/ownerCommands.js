import _ from 'lodash';

function OwnerCommands(message, bot, Data) {
	if(/^>reload$/.test(message.content)) {
		console.log('>Received reload command.');
		Data.loadData();
		bot.sendMessage(
			message.channel,
			'**Reloaded data.**'
		);
		console.log('>Reloaded data.');
	}
	else if(/^>addAdmin/.test(message.content)) {
		console.log('>Received addAdmin command.');
		if(/^>addAdmin(\s*<@\d+>\s*)+$/.test(message.content)){
			const users = _.map(message.mentions, (user) => _.pick(user, ['id', 'username']));
			const usersString = _.map(users, 'username').join(', ');
			Data.admin = _.unionBy(Data.admin, users, 'id');
			console.log('>Added admin.');
			console.log('================================================================');
			console.log('Users: ' + usersString);
			console.log('Time: ' + new Date());
			console.log('================================================================');
			Data.writeData();
			bot.sendMessage(
				message.channel,
				'**Added administrators:** ' + usersString
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
	else if(/^>removeAdmin/.test(message.content)) {
		console.log('>Received removeAdmin command.');
		if(/^>removeAdmin(\s*<@\d+>\s*)+$/.test(message.content)){
			const users = _.map(message.mentions, (user) => _.pick(user, ['id', 'username']));
			const usersString = _.map(users, 'username').join(', ');
			Data.admin = _.differenceBy(Data.admin, users, 'id');
			console.log('>Removed admin.');
			console.log('================================================================');
			console.log('Users: ' + usersString);
			console.log('Time: ' + new Date());
			console.log('================================================================');
			Data.writeData();
			bot.sendMessage(
				message.channel,
				'**Removed administrators:** ' + usersString
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
}

export default OwnerCommands;