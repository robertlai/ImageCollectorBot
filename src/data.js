import fs from 'fs';
import Logger from './logger'

const DATA_FILE_NAME = './data.json';
const BACKUP_DIR = 'backup/';

var writeLock = 0;

const Data = {
	defaultCollection: 'Default',
	collections: {},
	permissions: {},
	blacklist: {},
	currentMonth: '',

	loadData(callback) {
		Logger.log('Loading data...')
		fs.readFile(DATA_FILE_NAME, (err, fileContent) => {
			if (err) {
				Logger.error(err)
				Logger.log('Failed to load data.')
			} else {
				try {
					const fileData = JSON.parse(fileContent)
					Object.assign(this, fileData)
					Logger.log('Successfully loaded data')
					this.writeBackup()
				} catch (err) {
					Logger.error(err)
					Logger.log('Failed to parse data file.')
				}
			}
			callback()
		})
	},

	writeData() {
		if (writeLock) {
			Logger.log('File is locked.')
			Logger.log('Retrying...')
			setTimeout(this.writeData, 1000)
		} else {
			Logger.log('Writing data...')
			try {
				const fileContent = JSON.stringify(this)
				writeLock++
				fs.writeFile(DATA_FILE_NAME, fileContent, (err) => {
					if (err) {
						Logger.error(err)
						Logger.log('Failed to write data.')
					} else {
						Logger.log('Successfully wrote data.')
					}
					writeLock--
				})
			} catch (err) {
				Logger.error(err)
				Logger.log('Failed to serialize data.')
			}
		}
	},

  writeBackup() {
  	fs.mkdir(BACKUP_DIR, (err) => {
  		let dir = BACKUP_DIR
      if (err && err.code !== 'EEXIST') {
        Logger.error(err)
        Logger.log('Failed to create backup directory.')
        dir = ''
      }
      const filePath = `${dir}backup-${Date.now()}.json`
      fs.writeFile(filePath, JSON.stringify(this), (err) => {
        if (err) {
          Logger.error(err)
          Logger.log('Failed to write backup file.')
        } else {
          Logger.log('Successfully wrote backup file.')
        }
      })
    })
  }
}

export default Data

/*
var Data = {
	inChannels: [],
	outChannels: [],
	users: [],
	admin: [],
	blacklist: [],
	currentMonth: '',
	upload: false,
	albums: {},
	interval: 1000,
	trackScores: false,
	scores: {},

	*/
