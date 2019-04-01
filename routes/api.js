var express = require('express');
var router = express.Router();
var { visit, activity } = require('../src/actions/api');

router.post('/visit/v1', function(req, res, next) {
  visit(req, res, next);
});

router.post('/activity/v1', function(req, res, next) {
  activity(req, res, next);
});

module.exports = router;
