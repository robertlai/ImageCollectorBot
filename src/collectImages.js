import _ from 'lodash';
import imgur from './imgur';

const regex = {
	image_url: /(https?:\/\/.*\.(?:png|jpg|gif))(\s|$)/gi,
	image_attach: /(https?:\/\/.*\.(?:png|jpg|gif))/i
};

function CollectImages(message, bot, Data) {
	const urls = message.content.match(regex.image_url);
	const attachments = _.filter(_.map(message.attachments, 'url'), (attachment) => {
		return regex.image_attach.test(attachment);
	});
	const images = _.union(urls, attachments);
	if(!_.isEmpty(images)) {
		console.log('>Found images.');
		console.log('================================================================');
		console.log('Guild: ' + message.guild.name + '(' + message.guild.id + ')');
		console.log('Channel: ' + message.channel.name + '(' + message.channel.id + ')');
		console.log('Author: ' + message.author.username + '(' + message.author.id + ')');
		console.log('================================================================');
		_.forEach(Data.outChannels, (outChannel) => {
			bot.channels.get(outChannel.id).send(
				'**Guild:** `' + message.guild.name + '`\n' +
				'**Channel:** `' + message.channel.name + '`\n' +
				'**User:** `' + message.author.username + '(' + message.author.id + ')`\n' +
				images.join('\n')
			);
		});
		console.log('>Posted images.');

		const date = new Date();
		const monthString = `${date.getFullYear()}/${('0' + (date.getMonth() + 1)).slice(-2)}`;
		if(monthString !== Data.currentMonth) {
			if(Data.trackScores) {
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

				_.forEach(Data.announceChannels, (announceChannel) => {
					bot.channels.get(announceChannel.id).send(
						'**Final standings for ' + Data.currentMonth + ':**\n' +
						_.map(leaders, (user, i) => {
							return `${i + 1} - ${bot.users.get('id', user.id).username} (${user.score})`;
						}).join('\n')
					);
				});
				console.log('>Posted announcements.');

				Data.scores = {};
			}

			imgur.createAlbum(Data, monthString);
		}

		if(Data.upload) {
			imgur.upload(message, bot, Data, images);
		}

		if(Data.trackScores) {
			if(Data.scores[message.author.id]) {
				Data.scores[message.author.id] += images.length;
				Data.writeData();
			}
			else {
				Data.scores[message.author.id] = images.length;
				Data.writeData();
			}
		}
	}
}

export default CollectImages;
