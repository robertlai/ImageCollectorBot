import _ from 'lodash';

const regex = {
	getImg: /^>getImg$/
};

function UserCommands(message, bot, Data) {
	if(regex.getImg.test(message.content)) {
		console.log('>Received getImg command.');
		var channel = _.pick(message.channel, ['id', 'name', 'server']);
		channel.server = _.pick(channel.server, ['id', 'name']);
		const channelString = `${channel.name} in ${channel.server.name}`;
		Data.inChannels = _.xorBy(Data.inChannels, [channel], 'id');
		const addedChannel = _.map(Data.inChannels, 'id').indexOf(channel.id) !== -1;
		console.log('>' + (addedChannel ? 'Added' : 'Removed') + ' inChannel.');
		console.log('================================================================');
		console.log('Channel: ' + channelString);
		console.log('Time: ' + new Date());
		console.log('================================================================');
		Data.writeData();
		bot.sendMessage(
			message.channel,
			`**${addedChannel ? 'G' : 'No longer g'}etting images from:** ${channelString}.`
		);
	}
}

export default UserCommands;