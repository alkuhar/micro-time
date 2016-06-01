'use strict';

var path = process.cwd();
var moment = require('moment');

module.exports = function (app) {

	const util = require('util');
	
	var dateObj = {
		"unix": null,
		"natural": null
	};
	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
	app.route('/:VALUE')
		.get(function (req, res) {
			var value = req.params.VALUE;
			var obj = Object.create(dateObj);
			var date = new Date(value);
			var num = parseInt(value) * 1000;
			var nDate = new Date(num);
			if (date.toString() === 'Invalid Date' && nDate.toString() === 'Invalid Date') {
				obj.unix = null;
				obj.natural = null;
				res.send(obj).end();
			} else if(!isNaN(value)) {
				obj.unix = parseInt(value);
				obj.natural = moment(nDate).format('MMMM D, YYYY');
				res.send(obj).end();
			} else {
				obj.unix = Date.parse(value) / 1000;
				obj.natural = moment(date).format('MMMM D, YYYY');
				res.send(obj).end();
			}
			
		});
};