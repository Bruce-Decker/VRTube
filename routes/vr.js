var express = require('express');
var router = express.Router();
var mysql = require('./mysql');

// keep track of current VR
var id = null;

// current VR information
router.get('/getVrInfo', function(req, res, next) {
  var vrInfo = {};

  // get list of VRs from database
  var query = "select * from files where id = " + id;
  mysql.executeSQLQuery(query, function(err, result) {
    if(err) {
      console.log(err);
      vrInfo.vr = null;
      vrInfo.errorMessage = "sql error when attempting to obtain VR with id=" + id + " !!!";
      res.send(500).json(vrInfo);
    } else {
      if(result.length > 0) {
        var json = JSON.parse(JSON.stringify(result));
        console.log(json);
        res.json(json[0]);
      } else {
        vrInfo.vr = null;
        vrInfo.errorMessage = "no VR found for id=" + id + " !!!";
        res.send(400).json(vrInfo);
      }
    }
  });
});

// current VR information
router.get('/getOtherVrs', function(req, res, next) {
  var vrs = {arr:null};

  // get list of VRs from database
  var query = "select * from files where id<>" + id + " order by timestamp desc limit 10";
  mysql.executeSQLQuery(query, function(err, result) {
    if(err) {
      console.log(err);
      vrs.arr = null;
      vrs.errorMessage = "sql error when attempting to obtain VRs !!!";
      res.send(500).json(vrs);
    } else {
      if(result.length > 0) {
        var json = JSON.parse(JSON.stringify(result));
        vrs.arr = json;
        res.json(vrs);
      } else {
        vrs.arr = null;
        vrs.errorMessage = "no VR found !!!";
        res.send(400).json(vrInfo);
      }
    }
  });
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
