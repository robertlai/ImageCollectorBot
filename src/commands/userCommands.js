import Data from '../data'
import Logger from '../logger'

function userCommands(message) {
	const tokens = message.content.split(' ')
	if (tokens[0] === '>getImg') {
		Logger.log('Received getImg command.')
		const channelId = message.channel.id
		const collectionKey = tokens[1] || 'Default'
		const collection = Data.collections[collectionKey]
		if (collection) {
			collection.inChannels[channelId] = !collection.inChannels[channelId]
			const addedChannel = collection.inChannels[channelId]
			Logger.log(`${addedChannel ? 'Added' : 'Removed'} inChannel.`)
			Logger.block([
				`Author: ${message.author.tag}(${message.author.id})`,
				`Collection: ${collectionKey}`,
				`Channel ID: ${channelId}`,
				`Time: ${new Date()}`
			])
			Data.writeData()
			message.channel.send(`**${addedChannel ? 'G' : 'No longer g'}etting images for collection: ${collectionKey}.**`)
		}
	} else if (tokens[0] === '>delete') {
		console.log('>Received delete command.')
		const collection = Data.collections[tokens[1]]
		if (collection) {
			const album = collection.albums[tokens[2]]
			if (album) {
				const imageIds = tokens.slice[3]
				imgur.delete(message, album, imageIds)
			}
		}
	}
}

export default userCommands
