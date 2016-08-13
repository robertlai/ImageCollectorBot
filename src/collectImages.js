import _ from 'lodash';
import imgur from './imgur';

const regex = {
	image_url: /(https?:\/\/.*\.(?:png|jpg|gif))/gi,
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
		console.log('Server: ' + message.channel.server.name + '(' + message.channel.server.id + ')');
		console.log('Channel: ' + message.channel.name + '(' + message.channel.id + ')');
		console.log('Author: ' + message.author.username + '(' + message.author.id + ')');
		console.log('================================================================');
		_.forEach(Data.outChannels, (outChannel) => {
			bot.sendMessage(
				outChannel.id,
				'**Server:** ' + message.channel.server.name + '\n' +
				'**Channel:** ' + message.channel.name + '\n' +
				'**User:** ' + message.author.username + '(' + message.author.id + ')\n' +
				images.join('\n')
			);
		});
		console.log('>Posted images.');

		if(Data.upload) {
			imgur.upload(message, bot, Data, images);
		}
	}
}

export default CollectImages;