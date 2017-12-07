import _ from 'lodash';
import { getUsers } from '../utils';

const regex = {
	reload: /^>reload$/,
	addAdmin: /^>addAdmin/,
	removeAdmin: /^>removeAdmin/,
	upload: /^>upload$/,
	interval: /^>interval/,
	trackScores: /^>trackScores$/
};

function OwnerCommands(message, bot, Data) {
	if(regex.reload.test(message.content)) {
		console.log('>Received reload command.');
		Data.loadData();
		message.channel.send(
			'**Reloaded data.**'
		);
		console.log('>Reloaded data.');
	}
	else if(regex.addAdmin.test(message.content)) {
		console.log('>Received addAdmin command.');
		const users = getUsers(message);
		if(users) {
			const usersString = _.map(users, 'username').join(', ');
			Data.admin = _.unionBy(Data.admin, users, 'id');
			console.log('>Added admin.');
			console.log('================================================================');
			console.log('Users: ' + usersString);
			console.log('Time: ' + new Date());
			console.log('================================================================');
			Data.writeData();
			message.channel.send(
				'**Added administrators:** ' + usersString
			);
		}
		else {
			message.channel.send(
				'**Invalid parameters.**'
			);
			console.log('>Invalid parameters.');
		}
	}
	else if(regex.removeAdmin.test(message.content)) {
		console.log('>Received removeAdmin command.');
		const users = getUsers(message);
		if(users) {
			const usersString = _.map(users, 'username').join(', ');
			Data.admin = _.differenceBy(Data.admin, users, 'id');
			console.log('>Removed admin.');
			console.log('================================================================');
			console.log('Users: ' + usersString);
			console.log('Time: ' + new Date());
			console.log('================================================================');
			Data.writeData();
			message.channel.send(
				'**Removed administrators:** ' + usersString
			);
		}
		else {
			message.channel.send(
				'**Invalid parameters.**'
			);
			console.log('>Invalid parameters.');
		}
	}
	else if(regex.interval.test(message.content)) {
		console.log('>Received interval command.');
		const interval = message.content.split(' ')[1];
		if(interval && _.isNumber(parseInt(interval))) {
			Data.interval = parseInt(interval);
			console.log('>Set announcement interval.');
			console.log('================================================================');
			console.log('Interval: ' + Data.interval);
			console.log('Time: ' + new Date());
			console.log('================================================================');
			Data.writeData();
			message.channel.send(
				`**Set announcement interval to: ${interval}**`
			);
		}
		else {
			message.channel.send(
				'**Invalid parameters.**'
			);
			console.log('>Invalid parameters.');
		}
	}
	else if(regex.upload.test(message.content)) {
		console.log('>Received upload command.');
		Data.upload = !Data.upload;
		console.log('>Toggled upload.');
		console.log('================================================================');
		console.log('Upload: ' + Data.upload);
		console.log('Time: ' + new Date());
		console.log('================================================================');
		Data.writeData();
		message.channel.send(
			`**${Data.upload ? 'U' : 'No longer u'}ploading images to imgur.**`
		);
	}
	else if(regex.trackScores.test(message.content)) {
		console.log('>Received trackScores command.');
		Data.trackScores = !Data.trackScores;
		console.log('>Toggled score tracking.');
		console.log('================================================================');
		console.log('Tracking: ' + Data.trackScores);
		console.log('Time: ' + new Date());
		console.log('================================================================');
		Data.writeData();
		message.channel.send(
			`**${Data.trackScores ? 'T' : 'No longer t'}racking scores.**`
		);
	}
}

export default OwnerCommands;