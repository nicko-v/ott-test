'use strict';

const request = require('request');
const client  = require('../modules/redis-client.js');


const model = {
	newRequest() {
		return new Promise((resolve, reject) => {
			const request_id = Date.now(); // Необходима проверка существования.
			client.setnx(request_id, '', (error, reply) => error ? reject(error) : (reply === 0 ? reject(new Error('Запрос с таким ID уже существует.')) : resolve(request_id)));
		});
	},
	
	getCommits(owner, repo, since, until, author) {
		return new Promise((resolve, reject) => {
			const options = {
				uri: `https://api.github.com/repos/${owner}/${repo}/commits?since=${since}&until=${until}` + (author ? `&author=${author}` : ''),
				json: true,
				headers: { 'User-Agent': 'ott-test' }
			};
			
			request(options, (error, res, body) => {
				if (error) {
					reject(error);
					return;
				}
				if (Array.isArray(body) && body.length) {
					resolve(body);
				} else {
					reject(new Error(body.message || 'Коммиты не найдены.'));
				}
			});
		});
	},
	
	saveResult(request_id, result) {
		return new Promise((resolve, reject) => {
			client.set(request_id, result, error => error ? reject(error) : resolve());
		});
	},
};


module.exports = model;