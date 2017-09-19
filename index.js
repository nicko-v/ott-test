'use strict';

const app    = require('express')();
const router = require('./modules/router.js');


app.set('view engine', 'pug');
app.use(router);
app.listen(8080, console.info('\x1b[32mServer started on port 8080.\x1b[0m\x1b[0m'));