import Discord from 'discord.js'
import Config from '../config.conf'
import Data from './data'
import Logger from './logger'
import ImageCollector from './ImageCollector'
import Commands from './commands'
import Tasks from './tasks'

const discord = new Discord.Client()

discord.on('ready', () => {
  Logger.log('Logged in.')
  Logger.block([
    `User: ${discord.user.tag}(${discord.user.id})`,
    `Guild count: ${discord.guilds.size}`,
    `Channel count: ${discord.channels.size}`,
    `Time: ${new Date()}`
  ])
  Tasks.start()
  Logger.log('Listening...')
})

discord.on('message', (message) => {
  if (message.author.bot) {
    return
  }

  Commands.process(message)
  ImageCollector.process(message)
})

Logger.log('Initializing...')
Data.loadData(() => {
  discord.login(Config.token)
})

export default discord
