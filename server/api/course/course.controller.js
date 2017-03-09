'use strict';

var _ = require('lodash');
var Course = require('./course.model');
var path = require('path');
var utils = require('../../utils/utils.js');

exports.scrapeUpload = function(req, res) {
  var random = utils.randomizer(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

  utils.downloadURI(req.body.image, 'client/assets/images/uploads/' + random + '.png', function(filename) {
    console.log('done');

    var newCourse = new Course();
    newCourse.title = req.body.title;
    newCourse.email = req.body.email;
    newCourse.linkURL = req.body.linkURL;
    newCourse.description = req.body.description;
    newCourse.userName = req.body.name;
    newCourse._creator = req.body._creator;
    newCourse.createTime = Date.now();
    newCourse.upVotes = 0;
    newCourse.image = filename.slice(9);
    newCourse.save(function(err, item) {
      if (err) {
        console.log('error occured saving image');
      } else {
        console.log('Success post saved');
        console.log(item);
        res.status(200)
          .json(item);
      }
    });
  });
}