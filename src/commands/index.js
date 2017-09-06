import Config from '../../config.conf'
import Data from '../data'
import commonCommands from './commonCommands'
import userCommands from './userCommands'
import adminCommands from './adminCommands'
import ownerCommands from './ownerCommands'

const Commands = {
  process(message) {
    const permission = Data.permissions[message.author.id]
    if (message.author.id === Config.ownerId) {
      ownerCommands(message)
    }
    if (permission > 1) {
      adminCommands(message)
    }
    if (permission > 0) {
      userCommands(message)
    }
    commonCommands(message)
  }
}

export default Commands
