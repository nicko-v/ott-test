'use strict';

const bodyParser = require('body-parser');
const router     = require('express').Router();
const index      = require('../controllers/index.js');
const end        = require('../controllers/end.js');
const start      = require('../controllers/start.js');


router.get('/', index);
router.get('/end', end);
router.post('/start', bodyParser.urlencoded({ extended: false }), start);


module.exports = router;