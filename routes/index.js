var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'RestMyCode_2.0' });
});

router.get('/add', function(req, res, next) {
    res.render('add', { title: 'RestMyCode_2.0' });
});

router.get('/listaus', function(req, res, next) {
    res.render('listaus', { title: 'RestMyCode_2.0' });
});

router.get('/update', function(req, res, next) {
    res.render('update', { title: 'RestMyCode_2.0' });
});

router.get('/read', function(req, res, next) {
    res.render('read', { title: 'RestMyCode_2.0' });
});


module.exports = router;