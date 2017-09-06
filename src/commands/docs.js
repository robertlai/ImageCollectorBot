const Docs = {
  help: {
    description: 'Retrieve documentation about commands.',
    usage: [
      '>help',
      '>help <COMMAND_NAME>'
    ]
  },
  users: {
    description: 'Retrieve a list of privileged users.',
    usage: [
      '>users'
    ]
  },
  admin: {
    description: 'Retrieve a list of administrators.',
    usage: [
      '>admin'
    ]
  },
  blacklist: {
    description: 'Retrieve a list of ignored users.',
    usage: [
      '>blacklist'
    ]
  },
  postImg: {
    description: 'Toggle posting images to a channel.',
    usage: [
      '>postImg',
      '>postImg <COLLECTION_NAME>'
    ]
  },
  announce: {
    description: 'Toggle posting announcements to a channel.',
    usage: [
      '>announce',
      '>announce <COLLECTION_NAME>'
    ]
  },
  channels: {
    description: 'Retrieve the channel configuration for a collection.',
    usage: [
      '>channels',
      '>channels <COLLECTION_NAME>'
    ]
  },
  albums: {
    description: 'Retrieve a list of albums for a collection.',
    usage: [
      '>albums',
      '>albums <COLLECTION_NAME>'
    ]
  },
  count: {
    description: 'Retrieve the image count of the current album for a collection.',
    usage: [
      '>count',
      '>count <COLLECTION_NAME>'
    ]
  },
  leaderboard: {
    description: 'Retrieve the current monthly leaderboard for a collection.',
    usage: [
      '>leaderboard',
      '>leaderboard <COLLECTION_NAME>'
    ]
  },
  getImg: {
    description: 'Toggle getting images from a channel.',
    usage: [
      '>getImg',
      '>getImg <COLLECTION_NAME>'
    ]
  },
  delete: {
    description: 'Delete images from an album.',
    usage: [
      '>delete <COLLECTION_NAME> <ALBUM_NAME> <IMAGE_ID_1> <IMAGE_ID_2> <...>'
    ]
  },
  setPermission: {
    description: 'Set the permission level for a user.',
    usage: [
      '>setPermission <PERMISSION_LEVEL> <@USER_ID_1> <@USER_ID_2> <...>',
      '>setPermission <PERMISSION_LEVEL> <USER_ID_1> <USER_ID_2> <...>'
    ]
  },
  ignore: {
    description: 'Add users to the blacklist.',
    usage: [
      '>ignore <@USER_ID_1> <@USER_ID_2> <...>',
      '>ignore <USER_ID_1> <USER_ID_2> <...>'
    ]
  },
  unignore: {
    description: 'Remove users from the blacklist.',
    usage: [
      '>unignore <@USER_ID_1> <@USER_ID_2> <...>',
      '>unignore <USER_ID_1> <USER_ID_2> <...>'
    ]
  },
  join: {
    description: 'Join a guild.',
    usage: [
      '>join <GUILD_INVITE_LINK_1> <GUILD_INVITE_LINK_1> <...>'
    ]
  },
  reload: {
    description: 'Reload the data file.',
    usage: [
      '>reload'
    ]
  },
  setInterval: {
    description: 'Set the announcement interval for a collection.',
    usage: [
      '>setInterval <INTERVAL>',
      '>setInterval <INTERVAL> <COLLECTION_NAME>'
    ]
  },
  toggleFeature: {
    description: 'Toggle a feature for a collection.',
    usage: [
      '>toggleFeature <FEATURE_NAME>',
      '>toggleFeature <FEATURE_NAME> <COLLECTION_NAME>'
    ]
  }
}

export default Docs