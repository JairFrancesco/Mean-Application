'use strict';

var request = require('request');
var cheerio = require('cheerio');

exports.list = function(url, cb){
	request(url, function(err, resp, body){
		if (err) {
			cb({
				error: error
			});
		} else {
			var $ = cheerio.load(body);
			var pin = {};
			var $url = url;
			var $img = $('.heightContainer img').attr('src'); //get from pinterest
			var $desc = $('.heightContainer img').attr('alt'); // description from pinterest	

			console.log($img + 'pin url');

			var pin = {
				img: $img,
				url: $url,
				desc: $desc
			}

			//respond with the final JSON object

			cb(pin);

		}
	})
};