import _ from 'lodash';
import discord from './main'

export function getUserIds(message) {
	const mentions = message.mentions.map((user) => user.id)
	const tokens = message.content.split(' ');
	const ids = tokens.filter((token) => /^[0-9]+$/.test(token))
	return mentions.concat(ids)
}
