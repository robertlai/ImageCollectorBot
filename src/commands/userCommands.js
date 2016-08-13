import _ from 'lodash';
import imgur from '../imgur';

const regex = {
	getImg: /^>getImg$/,
	delete: /^>delete/,
	leaderboard: /^>leaderboard$/
};

function UserCommands(message, bot, Data) {
	if(regex.leaderboard.test(message.content)) {
		console.log('>Received leaderboard command.');
		const leaders = _(Data.scores)
			.map((score, id) => {
				return {
					id: id,
					score: score
				};
			})
			.sortBy((user) => {
				return user.score * -1;
			})
			.slice(0, 10)
			.value();
		bot.sendMessage(
			message.channel,
			'**Current standings for ' + Data.currentMonth + ':**\n' +
			_.map(leaders, (user, i) => {
				return `${i + 1} - ${bot.users.get('id', user.id).username} (${user.score})`;
			}).join('\n')
		);
		console.log('>Posted leaderboard.');
	}
	else if(regex.getImg.test(message.content)) {
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
	else if(regex.delete.test(message.content)) {
		console.log('>Received delete command.');
		const tokens = message.content.split(' ');
		imgur.delete(message, bot, Data, tokens[1], _.map(tokens.slice(2), (id) => {
			return id.replace(/[^a-z0-9]/gi, '');
		}));
	}

}

export default UserCommands;