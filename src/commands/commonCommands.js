import _ from 'lodash'
import discord from '../main'
import Data from '../data'
import Logger from '../logger'
import Docs from './docs'

const defaultHelp = '**Common commands:**\n' +
	`>help - ${Docs.help.description}\n` +
	`>users - ${Docs.users.description}\n` +
	`>admin - ${Docs.admin.description}\n` +
	`>blacklist - ${Docs.blacklist.description}\n` +
	`>channels - ${Docs.channels.description}\n` +
	`>albums - ${Docs.albums.description}\n` +
	`>count - ${Docs.count.description}\n` +
	`>leaderboard - ${Docs.leaderboard.description}\n` +
	'**User commands:**\n' +
	`>getImg - ${Docs.getImg.description}\n` +
	`>delete - ${Docs.delete.description}\n` +
	'**Admin commands:**\n' +
	`>postImg - ${Docs.postImg.description}\n` +
	`>announce - ${Docs.announce.description}\n` +
	`>setPermission - ${Docs.setPermission.description}\n` +
	`>ignore - ${Docs.ignore.description}\n` +
	`>unignore - ${Docs.unignore.description}\n` +
	`>join - ${Docs.join.description}\n` +
	`>setInterval - ${Docs.setInterval.description}\n` +
	'\nI am free and open-source.' +
	'Visit me on github: https://github.com/robertlai/ImageCollectorBot'

function commonCommands(message) {
	const tokens = message.content.split(' ')
	if (tokens[0] === '>help') {
		Logger.log('Received help command.')
		const command = tokens[1]
		const commandDocs = Docs[command]
		if (commandDocs) {
			message.channel.send(
				`**>${command}**\n` +
				`${commandDocs.description}\n` +
				'Usage:\n' +
				commandDocs.usage.reduce((acc, curr) => (
					acc + `\`\`\`${curr}\`\`\``
				), '')
			)
		} else {
			message.channel.send(defaultHelp)
		}
		Logger.log('Posted documentation.')
	} else if (tokens[0] === '>leaderboard') {
		Logger.log('Received leaderboard command.')
		const collectionKey = tokens[1] || 'Default'
		const collection = Data.collections[collectionKey]
		if (collection && collection.features.leaderboard) {
			const leaders = _(collection.scores)
        .map((score, id) => ({ id, score }))
        .sortBy((user) => user.score)
        .slice(0, 10)
        .value()

      const leaderboardMessage = `**Current standings for ${collectionKey}: ${Data.currentMonth}` +
        _.reduceRight(leaders, (acc, user, index) => {
          acc += `${index + 1} - ${discord.users.get(user.id).username} (${user.score})`
        }, '')

      message.channel.send(leaderboardMessage)
			Logger.log('Posted leaderboard.')
		} else {
			Logger.log('Invalid parameters.')
			message.channel.send('**Invalid parameters.**')
		}
	} else if (tokens[0] === '>albums') {
		Logger.log('Received albums command.')
		const collectionKey = tokens[1] || 'Default'
		const collection = Data.collections[collectionKey]
		if (collection) {
			const albums = _.reduce(collection.albums, (acc, album, title) => (
				`${acc}\n- ${title}: https://imgur.com/a/${album.id} (${album.imgCount} images)`
			), '');
			message.channel.send(`**Albums:**\n${albums}`)
			Logger.log('Posted album list.')
		} else {
			Logger.log('Invalid parameters.')
			message.channel.send('**Invalid parameters.**')
		}
	} else if (tokens[0] === '>count') {
		Logger.log('Received count command.')
		const collectionKey = tokens[1] || 'Default'
		const collection = Data.collections[collectionKey]
		if (collection) {
			const count = collection.albums[Data.currentMonth].imgCount
			message.channel.send(`**Album ${collectionKey}: ${Data.currentMonth} contains ${count} images.**`)
		} else {
			Logger.log('Invalid parameters.')
			message.channel.send('**Invalid parameters.**')
		}
	} else if (tokens[0] === '>channels') {
		Logger.log('Received channels command.')
		const collectionKey = tokens[1] || 'Default'
		const collection = Data.collections[collectionKey]
		if (collection) {
			const inChannels = _.reduce(collection.inChannels, (acc, enabled, channelId) => {
				if (!enabled) {
					return acc
				}
				const channel = discord.channels.get(channelId)
				return `${acc}\n- ${channel.name} in ${channel.guild.name}`
			}, '')
			const outChannels = _.reduce(collection.outChannels, (acc, enabled, channelId) => {
				if (!enabled) {
					return acc
				}
				const channel = discord.channels.get(channelId)
				return `${acc}\n- ${channel.name} in ${channel.guild.name}`
			}, '')
			const announceChannels = _.reduce(collection.announceChannels, (acc, enabled, channelId) => {
				if (!enabled) {
					return acc
				}
				const channel = discord.channels.get(channelId)
				return `${acc}\n- ${channel.name} in ${channel.guild.name}`
			}, '')
			message.channel.send(
				`**Getting images from:**\n${inChannels}\n` +
				`**Posting images to:**\n${outChannels}\n` +
				`**Posting announcements to:**\n${announceChannels}\n`
			)
			Logger.log('Posted channel configuration.');
		} else {
			Logger.log('Invalid parameters.')
			message.channel.send('**Invalid parameters.**')
		}
	} else if (message.content === '>blacklist') {
		Logger.log('Received blacklist command.')
		const blacklist = _.reduce(Data.blacklist, (enabled, userId) => {
			if (!enabled) {
				return acc
			}
			const user = discord.users.get(userId)
			return `${acc}\n- ${user.tag}(${user.id})`
		}, '')
		message.channel.send(`**Blacklist:**\n${blacklist}`)
		Logger.log('Posted blacklist.');
	} else if (message.content === '>users') {
		Logger.log('Received users command.')
		const users = _.reduce(Data.permissions, (permission, userId) => {
			if (permission < 1) {
				return acc
			}
			const user = discord.users.get(userId)
			return `${acc}\n- ${user.tag}(${user.id})`
		}, '')
		message.channel.send(`**Users:**\n${users}`)
		Logger.log('Posted user list.');
	} else if (message.content === '>admin') {
		Logger.log('Received admin command.')
		const admin = _.reduce(Data.permissions, (permission, userId) => {
			if (permission < 2) {
				return acc
			}
			const user = discord.admin.get(userId)
			return `${acc}\n- ${user.tag}(${user.id})`
		}, '')
		message.channel.send(`**Admin:**\n${admin}`)
		Logger.log('Posted admin list.');
	}
}

export default commonCommands
