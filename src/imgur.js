import _ from 'lodash';
import request from 'request';
import Config from '../config.conf';

function imgur(message, bot, Data, images) {
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
			}, (err) => {
				if(err) {
					console.log('>Failed to upload image.');
					console.log('================================================================');
					console.log('Error: ' + err.message);
					console.log('================================================================');
				}
				else {
					const imgCount = ++Data.albums[monthString].imgCount;
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
			if(err) {
				console.log('>Failed to create album.');
				console.log('================================================================');
				console.log('Error: ' + err.message);
				console.log('================================================================');
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
					deleteHash: body.data.deletehash,
					imgCount: 0
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

export default imgur;