'use strict';

const client = require("redis").createClient();


client.on("error", error => console.error(error));


module.exports = client;