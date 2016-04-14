import _ from 'lodash';
import request from 'request';
import Config from '../config.conf';

function CollectImages(message, bot, Data) {
	const urls = message.content.match(/(https?:\/\/.*\.(?:png|jpg|gif))/gi);
	const attachments = _.filter(_.map(message.attachments, 'url'), (attachment) => {
		return /(https?:\/\/.*\.(?:png|jpg|gif))/i.test(attachment);
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
			const date = new Date();
			const monthString = `${date.getFullYear()}/${('0' + (date.getMonth() + 1)).slice(-2)}`;

			const uploadImages = () => {
				console.log('>Uploading images...');
				_.forEach(images, (image) => {
					request({
						url: `${Config.imgurUrl}image`,
						method: 'POST',
						json: true,
						headers: {
							Authorization: `Client-ID ${Config.imgurId}`
						},
						body: {
							image: image,
							album: Data.albums[monthString].deleteHash,
							type: 'URL',
							description: 'Server: ' + message.channel.server.name + '\n' +
								'Channel: ' + message.channel.name + '\n' +
								'User: ' + message.author.username + '(' + message.author.id + ')'
						}
					}, (err, res, body) => {
						if(err || !body.success) {
							console.log('>Failed to upload image.');
							console.log('================================================================');
							console.log('Error: ' + err.message);
							console.log('================================================================');
							bot.sendMessage(
								message.channel,
								'**Failed to upload image.**'
							);
						}
						else {
							console.log('>Uploaded image.');
						}
					});
				});
			};


			if(monthString !== Data.currentMonth) {
				console.log('>Creating a new album...');
				request({
					url: `${Config.imgurUrl}album`,
					method: 'POST',
					json: true,
					headers: {
						Authorization: `Client-ID ${Config.imgurId}`
					},
					body: {
						title: monthString,
						description: `Images from ${monthString}`
					}
				}, (err, res, body) => {
					if(err || !body.success) {
						console.log('>Failed to create album.');
						console.log('================================================================');
						console.log('Error: ' + err.message);
						console.log('================================================================');
						bot.sendMessage(
							message.channel,
							'**Failed to create album:** ' + monthString
						);
					}
					else {
						console.log('>Created new album.');
						console.log('================================================================');
						console.log('Title: ' + monthString);
						console.log('ID: ' + body.data.id);
						console.log('Delete hash: ' + body.data.deletehash);
						console.log('================================================================');
						Data.albums[monthString] = {
							id: body.data.id,
							deleteHash: body.data.deletehash
						};
						Data.currentMonth = monthString;
						Data.writeData();
						uploadImages();
					}
				});
			}
			else {
				uploadImages();
			}
		}
	}
}

export default CollectImages;