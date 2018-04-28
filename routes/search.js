var express = require('express');
var router = express.Router();
var mysql = require('./mysql');

/* GET search results page. */
router.get('/', function(req, res, next) {
  q = req.query.q;

  if(q) {
    console.log(q);
    res.render('search');
  } else {
    res.render('error');
  }
});

module.exports = router;