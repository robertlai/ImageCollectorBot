import _ from 'lodash';

const regex = {
	number: /^[0-9]+$/
};

export function getUsers(message) {
	const mentions = _.map(message.mentions, (user) => _.pick(user, ['id', 'username']));
	if(!_.isEmpty(mentions)) {
		return mentions;
	}
	else {
		const tokens = message.content.split(' ');
		if(tokens[2] && regex.number.test(tokens[2])) {
			return [{
				id: tokens[2],
				username: tokens[1]
			}];
		}
		else if(tokens[1] && regex.number.test(tokens[1])) {
			return [{
				id: tokens[1],
				username: tokens[1]
			}];
		}
		else {
			return [];
		}
	}
}