import Data from '../data'
import Logger from '../logger'

function ownerCommands(message) {
	const tokens = message.content.split(' ')
	if (message.content === '>reload') {
		Logger.log('Received reload command.')
		Data.loadData()
		message.channel.send('**Reloaded data.**')
		Logger.log('Reloaded data.')
	} else if (tokens[0] === '>setInterval') {
		Logger.log('Received setInterval command.')
		const interval = parseInt(tokens[1])
		const collectionKey = tokens[2] || 'Default'
		const collection = Data.collections[collectionKey]
		if (interval && collection) {
			collection.interval = interval
			Logger.log('Set announcement interval.')
			Logger.block([
				`Author: ${message.author.tag}(${message.author.id})`,
				`Collection: ${collectionKey}`,
				`Interval: ${interval}`,
				`Time: ${new Date()}`
			])
			Data.writeData()
			message.channel.send(`**Set announcement interval.**`)
		} else {
			Logger.log('Invalid parameters.')
			message.channel.send('**Invalid parameters.**')
		}
	} else if (tokens[0] === '>toggleFeature') {
		Logger.log('Received toggleFeature command.')
		const feature = tokens[1]
		const collectionKey = tokens[2] || 'Default'
		const collection = Data.collections[collectionKey]
		if (feature && collection) {
			collection.features[feature] = !collection.features[feature]
			Logger.log('Toggled feature.')
			Logger.block([
				`Author: ${message.author.tag}(${message.author.id})`,
				`Collection: ${collectionKey}`,
				`Feature: ${feature}`,
				`Enabled: ${collection.features[feature]}`,
				`Time: ${new Date()}`
			])
			Data.writeData()
			message.channel.send(`**Toggled feature ${collection.features[feature] ? 'on' : 'off'}**`)
		} else {
			Logger.log('Invalid parameters.')
			message.channel.send('**Invalid parameters.**')
		}
	}
}

export default ownerCommands
