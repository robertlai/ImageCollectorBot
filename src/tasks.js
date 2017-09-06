import _ from 'lodash'
import Logger from './logger'
import Data from './data'

const TASKS_INTERVAL = 60000

const Tasks = {
  prevDate: new Date(),

  start() {
    Logger.log('Starting tasks...')
    setInterval(() => this.run(), TASKS_INTERVAL)
  },

  run() {
    const date = new Date()
    monthlyStandings(date, this.prevDate)
    monthlyAlbum(date, this.prevDate)
  }
}

function monthlyAlbum(date, prevDate) {
  if (date.getMonth() === prevDate.getMonth()) {
    return
  }

  // TODO: Implement imgur
}

function monthlyStandings(date, prevDate) {
  if (date.getMonth() === prevDate.getMonth()) {
    return
  }

  const monthString = `${date.getFullYear()}/${`0${date.getMonth() + 1}`.slice(-2)}`;
  if (monthString === Data.currentMonth) {
    return
  }

  Logger.log('Posting monthly standings...')

  _.forEach(Data.collections, (collection, key) => {
    if (collection.features.leaderboard) {
      const leaders = _(collection.scores)
        .map((score, id) => ({ id, score }))
        .sortBy((user) => user.score)
        .slice(0, 10)
        .value()

      const announceMessage = `**Final standings for ${key}: ${Data.currentMonth}` +
        _.reduceRight(leaders, (acc, user, index) => {
          acc += `${index + 1} - ${discord.users.get(user.id).username} (${user.score})`
        }, '')

      _.forEach(collection.announceChannels, (enabled, channelId) => {
        if (enabled) {
          const channel = discord.channels.get(channelId)
          if (channel) {
            channel.send(announceMessage)
          }
        }
      })
    }

    collection.scores = {}
  })

  Data.currentMonth = monthString
  Data.writeData()

  Logger.log('Successfully posted monthly standings.')
}

export default Tasks
