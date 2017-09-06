import _ from 'lodash'
import Logger from './logger'
import Data from './data'

var prevDate = new Date()

const Tasks = {
  start() {
    setInterval(this.run, 60000)
  }

  run() {
    const date = new Date()
    if (date.getMonth() !== prevDate.getMonth()) {
      const monthString = `${date.getFullYear()}/${`0${date.getMonth() + 1}`.slice(-2)}`;
      if (monthString === Data.currentMonth) {
        return
      }

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
      })
    }
  }
}

export default Tasks
