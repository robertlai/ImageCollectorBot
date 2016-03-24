import _ from 'lodash';
import Discord from 'discord.js';

import Config from '../config.conf';

import Data from './data';
import CollectImages from './collectImages';

import CommonCommands from './commands/commonCommands';
import UserCommands from './commands/userCommands';
import AdminCommands from './commands/adminCommands';
import OwnerCommands from './commands/ownerCommands';

var bot = new Discord.Client();

bot.on('ready', () => {
	console.log('>Logged in.');
	console.log('================================================================');
	console.log('Username: ' + bot.internal.user.username);
	console.log('UserID: ' + bot.internal.user.id);
	console.log('Server count: ' + bot.internal.servers.length);
	console.log('Channel count: ' + bot.internal.channels.length);
	console.log('Time: ' + new Date());
	console.log('================================================================');
	console.log('>Listening...');
});

bot.on('message', (message) => {
	if(message.author.id === bot.internal.user.id) {
		return;
	}
	if(message.author.id === Config.owner) {
		OwnerCommands(message, bot, Data);
		AdminCommands(message, bot, Data);
		UserCommands(message, bot, Data);
		CommonCommands(message, bot, Data);
	}
	else if(_.map(Data.admin, 'id').indexOf(message.author.id) !== -1) {
		AdminCommands(message, bot, Data);
		UserCommands(message, bot, Data);
		CommonCommands(message, bot, Data);
	}
	else if(_.map(Data.users, 'id').indexOf(message.author.id) !== -1) {
		UserCommands(message, bot, Data);
		CommonCommands(message, bot, Data);
	}
	else {
		CommonCommands(message, bot, Data);
	}

	if(_.map(Data.inChannels, 'id').indexOf(message.channel.id) !== -1) {
		CollectImages(message, bot, Data);
	}
});

bot.login(Config.email, Config.password, () => {
	console.log('>Logging in...');
});