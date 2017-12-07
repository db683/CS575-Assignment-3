var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../public/html/index.html'));
});

router.get('/block.html', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/../public/html/block.html'));
});

module.exports = router;
