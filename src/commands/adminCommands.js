import discord from '../main'
import Data from '../data'
import Logger from '../logger'
import { getUserIds } from '../utils'

function adminCommands(message) {
	const tokens = message.content.split(' ')
	if (tokens[0] === '>setPermission') {
		Logger.log('Received setPermission command.')
		const permission = parseInt(tokens[1])
		const userIds = getUserIds(message)
		if (permission != null && userIds) {
			userIds.forEach((userId) => {
				Data.permissions[userId] = permission
				Logger.log('Set permission.')
				Logger.block([
					`Author: ${message.author.tag}(${message.author.id})`,
					`User ID: ${userId}`,
					`Permission: ${permission}`,
					`Time: ${new Date()}`
				])
			})
			Data.writeData()
			message.channel.send('**Set permissions.**')
		} else {
			Logger.log('Invalid parameters.')
			message.channel.send('**Invalid parameters.**')
		}
	} else if (tokens[0] === '>ignore') {
		Logger.log('Received ignore command.')
		const userIds = getUserIds(message)
		if (userIds) {
			userIds.forEach((userId) => {
				Data.blacklist[userId] = true
				Logger.log('>Ignored user.')
				Logger.block([
					`Author: ${message.author.tag}(${message.author.id})`,
					`User ID: ${userId}`,
					`Time: ${new Date()}`
				])
			})
			Data.writeData()
			message.channel.send('**Ignored Users.**')
		} else {
			Logger.log('Invalid parameters.')
			message.channel.send('**Invalid parameters.**')
		}
	} else if (tokens[0] === '>unignore') {
		Logger.log('Received unignore command.')
		const userIds = getUserIds(message)
		if (userIds) {
			userIds.forEach((userId) => {
				Data.blacklist[userId] = false
				Logger.log('>Unignored user.')
				Logger.block([
					`Author: ${message.author.tag}(${message.author.id})`,
					`User ID: ${userId}`,
					`Time: ${new Date()}`
				])
			})
			Data.writeData()
			message.channel.send('**Unignored Users.**')
		} else {
			Logger.log('Invalid parameters.')
			message.channel.send('**Invalid parameters.**')
		}
	} else if (tokens[0] === '>join') {
		Logger.log('Received join command.')
		const inviteRegex = /^>join(\s*https?:\/\/discord\.gg\/[A-Za-z0-9]+\s*)+$/
		if (inviteRegex.test(message.content)) {
			const invites = message.content.match(inviteRegex)
			invites.forEach((invite) => {
				discord.acceptInvite(invite)
			})
			Logger.log('Joined guilds')
			message.channel.send('**Joined guilds.**')
		} else {
			Logger.log('Invalid parameters.')
			message.channel.send('**Invalid parameters.**')
		}
	}
}

export default adminCommands

/*
else if(regex.postImg.test(message.content)) {
		console.log('>Received postImg command.');
		if(message.author.id === message.channel.server.ownerID) {
			let channel = _.pick(message.channel, ['id', 'name', 'server']);
			channel.server = _.pick(channel.server, ['id', 'name']);
			const channelString = `${channel.name} in ${channel.server.name}`;
			Data.outChannels = _.xorBy(Data.outChannels, [channel], 'id');
			const addedChannel = _.map(Data.outChannels, 'id').indexOf(channel.id) !== -1;
			console.log('>' + (addedChannel ? 'Added' : 'Removed') + ' outChannel.');
			console.log('================================================================');
			console.log('Channel: ' + channelString);
			console.log('Time: ' + new Date());
			console.log('================================================================');
			Data.writeData();
			bot.sendMessage(
				message.channel,
				`**${addedChannel ? 'P' : 'No longer p'}osting images to:** ${channelString}.`
			);
		}
		else {
			bot.sendMessage(
				message.channel,
				'**This command can only be used by the server owner.**'
			);
			console.log('>Unauthorized.');
		}
	}
	else if(regex.announce.test(message.content)) {
		console.log('>Received announce command.');
		if(message.author.id === message.channel.server.ownerID) {
			let channel = _.pick(message.channel, ['id', 'name', 'server']);
			channel.server = _.pick(channel.server, ['id', 'name']);
			const channelString = `${channel.name} in ${channel.server.name}`;
			Data.announceChannels = _.xorBy(Data.announceChannels, [channel], 'id');
			const addedChannel = _.map(Data.announceChannels, 'id').indexOf(channel.id) !== -1;
			console.log('>' + (addedChannel ? 'Added' : 'Removed') + ' announceChannel.');
			console.log('================================================================');
			console.log('Channel: ' + channelString);
			console.log('Time: ' + new Date());
			console.log('================================================================');
			Data.writeData();
			bot.sendMessage(
				message.channel,
				`**${addedChannel ? 'P' : 'No longer p'}osting announcements in:** ${channelString}.`
			);
		}
		else {
			bot.sendMessage(
				message.channel,
				'**This command can only be used by the server owner.**'
			);
			console.log('>Unauthorized.');
		}
	}
	*/