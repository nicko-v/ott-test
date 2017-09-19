'use strict';

const model = require('../models/end.js');


function end(req, res) {
	const request_id = req.query.request_id;
	
	if (!request_id) {
		res.status(400).render('index', { error: 'Следует указать request_id.' });
		return;
	}
	
	model.loadRequest(request_id)
		.then(result => res.render('index', { request_id, result }))
		.catch(error => res.status(400).render('index', { error }));
}


module.exports = end;