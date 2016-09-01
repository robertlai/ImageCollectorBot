import _ from 'lodash';
import request from 'request';
import Config from '../config.conf';

const imgur = {
	createAlbum(Data, title) {
		console.log('>Creating a new album...');
		request({
			url: `${Config.imgurUrl}album`,
			method: 'POST',
			json: true,
			headers: {
				Authorization: `Client-ID ${Config.imgurId}`
			},
			body: {
				title: title,
				description: `Images from ${title}`
			}
		}, (err, res, body) => {
			if(err) {
				console.log('>Failed to create album.');
				console.log('================================================================');
				console.log('Error: ' + err.message);
				console.log('================================================================');
			}
			else {
				console.log('>Created new album.');
				console.log('================================================================');
				console.log('Title: ' + title);
				console.log('ID: ' + body.data.id);
				console.log('Delete hash: ' + body.data.deletehash);
				console.log('================================================================');
				Data.albums[title] = {
					id: body.data.id,
					deleteHash: body.data.deletehash,
					imgCount: 0
				};
				Data.currentMonth = title;
				Data.writeData();
			}
		});
	},
	upload(message, bot, Data, images) {
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
					album: Data.albums[Data.currentMonth].deleteHash,
					type: 'URL',
					description: 'Server: ' + message.channel.server.name + '\n' +
						'Channel: ' + message.channel.name + '\n' +
						'User: ' + message.author.username + '(' + message.author.id + ')'
				}
			}, (err) => {
				if(err) {
					console.log('>Failed to upload image.');
					console.log('================================================================');
					console.log('Error: ' + err.message);
					console.log('================================================================');
				}
				else {
					const imgCount = ++Data.albums[Data.currentMonth].imgCount;
					Data.writeData();
					console.log('>Uploaded image.');
					console.log('>Count: ' + imgCount);

					if(imgCount % Data.interval === 0) {
						_.forEach(Data.announceChannels, (announceChannel) => {
							bot.sendMessage(
								announceChannel.id,
								`**Album ${Data.currentMonth} now contains ${imgCount} images!**`
							);
						});
						console.log('>Posted announcements.');
					}
				}
			});
		});
	},
	delete(message, bot, Data, album, images) {
		console.log('>Deleting images...');
		request({
			url: `${Config.imgurUrl}album/${Data.albums[album].deleteHash}/remove_images?ids=${images}`,
			method: 'DELETE',
			json: true,
			headers: {
				Authorization: `Client-ID ${Config.imgurId}`
			}
		}, (err) => {
			if(err) {
				console.log('>Failed to delete images.');
				console.log('================================================================');
				console.log('Error: ' + err.message);
				console.log('================================================================');
			}
			else {
				console.log('>Deleted images.');
				console.log('================================================================');
				console.log('Album: ' + album);
				console.log('Images: ' + images);
				console.log('================================================================');
				bot.sendMessage(
					message.channel,
					`**Deleted images.**`
				);
			}
		});
	}
};

export default imgur;