'use strict';

var config = require('./../config'),
    mysql = require('mysql');

module.exports = mysql.createConnection({
	host     : config.db.details.host,
	port     : config.db.details.port,
	user     : config.db.user,
	password : config.db.password,
	database : config.db.name
});