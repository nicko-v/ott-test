'use strict';

const model = require('../models/start.js');

async function createRequest(res, owner, repo, since, until, author) {
	try {
		var request_id = await model.newRequest();
		res.render('index', { request_id });
	} catch (error) {
		res.status(400).render('index', { error: error.message });
		return;
	}
	
	try {
		const commits = await model.getCommits(owner, repo, since, until, author);
		return await model.saveResult(request_id, JSON.stringify(commits, undefined, 2));
	} catch (error) {
		return await model.saveResult(request_id, JSON.stringify(error.message));
	}
}
function start(req, res) {
	const { owner, repo, date, author } = req.body;
	
	if (!owner || !repo || !date) {
		res.status(400).render('index', { error: 'Следует указать название репозитория, его владельца и дату коммитов.' });
		return;
	}
	
	const dateObj = new Date(date);
	const since = new Date(dateObj.setHours(0, 0, 0, 0)).toISOString();
	const until = new Date(dateObj.setHours(23, 59, 59, 999)).toISOString();
	
	createRequest(res, owner, repo, since, until, author);
}


module.exports = start;