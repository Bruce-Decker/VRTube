var express = require('express');
var router = express.Router();

// keep track of current VR
var id = null;

// current VR information
router.get('/getVrInfo', function(req, res, next) {
  res.send(JSON.stringify({vrid:id}));
});

/* GET VR page. */
router.get('/', function(req, res, next) {
  id = req.query.vrid;

  if(id) {
    res.render('vr');
  } else {
    res.render('error');
  }
});

module.exports = router;
