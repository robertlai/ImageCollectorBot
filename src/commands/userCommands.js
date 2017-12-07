import _ from 'lodash';
import imgur from '../imgur';

const regex = {
	getImg: /^>getImg$/,
	delete: /^>delete/
};

function UserCommands(message, bot, Data) {
	if(regex.getImg.test(message.content)) {
		console.log('>Received getImg command.');
		var channel = _.pick(message.channel, ['id', 'name', 'guild']);
		channel.server = _.pick(channel.guild, ['id', 'name']);
		channel.guild = undefined;
		const channelString = `${channel.name} in ${channel.server.name}`;
		Data.inChannels = _.xorBy(Data.inChannels, [channel], 'id');
		const addedChannel = _.map(Data.inChannels, 'id').indexOf(channel.id) !== -1;
		console.log('>' + (addedChannel ? 'Added' : 'Removed') + ' inChannel.');
		console.log('================================================================');
		console.log('Channel: ' + channelString);
		console.log('Time: ' + new Date());
		console.log('================================================================');
		Data.writeData();
		message.channel.send(
			`**${addedChannel ? 'G' : 'No longer g'}etting images from:** ${channelString}.`
		);
	}
	else if(regex.delete.test(message.content)) {
		console.log('>Received delete command.');
		const tokens = message.content.split(' ');
		imgur.delete(message, bot, Data, tokens[1], _.map(tokens.slice(2), (id) => {
			return id.replace(/[^a-z0-9]/gi, '');
		}));
	}

}

export default UserCommands;