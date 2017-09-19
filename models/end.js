'use strict';

const client = require('../modules/redis-client.js');


const model = {
	loadRequest(request_id) {
		return new Promise((resolve, reject) => {
			client.get(request_id, (error, reply) => {
				error ? reject(error) : (reply === null ? reject(`Запрос с id "${request_id}" не существует.`) : resolve(reply));
			});
		});
	},
};


module.exports = model;