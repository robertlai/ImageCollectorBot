import _ from 'lodash';
import { getUsers } from '../utils';

const regex = {
	listen: /^>listen/,
	unlisten: /^>unlisten/,
	ignore: /^>ignore/,
	unignore: /^>unignore/,
	join: /^>join/,
	join2: /^>join(\s*https?:\/\/discord\.gg\/[A-Za-z0-9]+\s*)+$/,
	invite: /https?:\/\/discord\.gg\/[A-Za-z0-9]+/gi
};

function AdminCommands(message, bot, Data) {
	if(regex.ignore.test(message.content)) {
		console.log('>Received ignore command.');
		const users = getUsers(message);
		if(users) {
			const usersString = _.map(users, 'username').join(', ');
			Data.blacklist = _.unionBy(Data.blacklist, users, 'id');
			console.log('>Ignored users.');
			console.log('================================================================');
			console.log('Users: ' + usersString);
			console.log('Time: ' + new Date());
			console.log('================================================================');
			Data.writeData();
			message.channel.send(
				'**Ignored users:** ' + usersString
			);
		}
		else {
			message.channel.send(
				'**Invalid parameters.**'
			);
			console.log('>Invalid parameters.');
		}
	}
	else if(regex.unignore.test(message.content)) {
		console.log('>Received unignore command.');
		const users = getUsers(message);
		if(users) {
			const usersString = _.map(users, 'username').join(', ');
			Data.blacklist = _.differenceBy(Data.blacklist, users, 'id');
			console.log('>Unignored users.');
			console.log('================================================================');
			console.log('Users: ' + usersString);
			console.log('Time: ' + new Date());
			console.log('================================================================');
			Data.writeData();
			message.channel.send(
				'**Unignored users:** ' + usersString
			);
		}
		else {
			message.channel.send(
				'**Invalid parameters.**'
			);
			console.log('>Invalid parameters.');
		}
	}
	else if(regex.join.test(message.content)) {
		console.log('>Received join command.');
		if(regex.join2.test(message.content)) {
			const invites = message.content.match(regex.invite);
			_.forEach(invites, (invite) => {
				bot.joinServer(invite);
			});
			message.channel.send(
				'**Joined Guilds.**'
			);
			console.log('>Joined guilds.');
		}
		else {
			message.channel.send(
				'**Invalid parameters.**'
			);
			console.log('>Invalid parameters.');
		}
	}
	else if(regex.listen.test(message.content)) {
		console.log('>Received listen command.');
		const users = getUsers(message);
		if(users) {
			const usersString = _.map(users, 'username').join(', ');
			Data.users = _.unionBy(Data.users, users, 'id');
			console.log('>Added users.');
			console.log('================================================================');
			console.log('Users: ' + usersString);
			console.log('Time: ' + new Date());
			console.log('================================================================');
			Data.writeData();
			message.channel.send(
				'**Added users:** ' + usersString
			);
		}
		else {
			message.channel.send(
				'**Invalid parameters.**'
			);
			console.log('>Invalid parameters.');
		}
	}
	else if(regex.unlisten.test(message.content)) {
		console.log('>Received unlisten command.');
		const users = getUsers(message);
		if(users) {
			const usersString = _.map(users, 'username').join(', ');
			Data.users = _.differenceBy(Data.users, users, 'id');
			console.log('>Removed users.');
			console.log('================================================================');
			console.log('Users: ' + usersString);
			console.log('Time: ' + new Date());
			console.log('================================================================');
			Data.writeData();
			message.channel.send(
				'**Removed users:** ' + usersString
			);
		}
		else {
			message.channel.send(
				'**Invalid parameters.**'
			);
			console.log('>Invalid parameters.');
		}
	}
}

export default AdminCommands;