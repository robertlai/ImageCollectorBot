import fs from 'fs';

const DATA_FILE_NAME = './data.json';
const BACKUP_FILE_NAME = './data.bak';

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
	loadData() {
		console.log('>Loading data...');
		try {
			const data = JSON.parse(fs.readFileSync(DATA_FILE_NAME));
			for(var i in data) {
				this[i] = data[i];
			}
			console.log('>Successfully loaded data.');
			fs.writeFile(BACKUP_FILE_NAME, JSON.stringify(this));
			console.log('>Wrote backup file.');
		}
		catch(err) {
			console.log('>An error occurred.');
			console.log('================================================================');
			console.log('Message: ' + err.message);
			console.log('================================================================');
		}
	},
	writeData() {
		console.log('>Writing data...');
		try {
			const data = JSON.stringify(this);
			if(!data) {
				throw new Error('No data found.');
			}
			fs.writeFile(DATA_FILE_NAME, data);
			console.log('>Successfully wrote data.');
		}
		catch(err) {
			console.log('>An error occurred.');
			console.log('================================================================');
			console.log('Message: ' + err.message);
			console.log('================================================================');
		}
	}
};

Data.loadData();

export default Data;