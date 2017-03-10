'use strict'

var controller = require('./course.controller')
var express = require('express');
var router = express.Router();
var auth = require('../../auth/auth.service');

router.post('/scrapeUpload', auth.isAuthenticated(), controller.scrapeUpload);

router.get('/getAllCourses', controller.allCourses);

module.exports = router;