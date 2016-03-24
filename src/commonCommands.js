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
	else if(/^>help$/.test(message.content)) {
		console.log('>Received help command.');
		bot.sendMessage(
			message.channel,
			'**Common commands:**\n' +
			'>help - List commands\n' +
			'>users - List users in user list\n' +
			'>admin - List users in admin list\n' +
			'>channels - List channels\n' +
			'**User commands:**\n' +
			'>getImg - Toggle getting images from a channel\n' +
			'**Admin commands:**\n' +
			'>listen - Add a user to the user list\n' +
			'>unlisten - Remove a user from the user list\n' +
			'>postImg - Toggle posting images to a channel'
		);
	}
}

export default CommonCommands;