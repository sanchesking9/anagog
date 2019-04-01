var express = require('express');
var router = express.Router();
var { view } = require('../src/actions/client');

/* GET client listing. */
router.get('/', function(req, res, next) {
  view(req, res, next);
});

module.exports = router;
