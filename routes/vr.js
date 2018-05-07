var express = require('express');
var router = express.Router();
var mysql = require('./mysql');
var localStorage = require('localStorage')
var timestamp = require('time-stamp');


var mongoose = require('mongoose')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
mongoose.connect('mongodb://localhost/VR_Comments');
var db = mongoose.connection;
var comments_schema = mongoose.Schema({
   username: String,
   filename: String,
   comment: String,
   time: String
})

var comments_data = mongoose.model("commentsData", comments_schema);

router.post('/submitComment', function(req, res, next){
  
    var username = localStorage.getItem('username');
    var comment = req.body.comment;
    var filename = localStorage.getItem('filename');
    var time = timestamp('YYYY/MM/DD:mm:ss');
    var user_comment = {username:username, filename: filename, comment: comment, time: time};
   
    comments_data.create(user_comment, function(err, newlyCreated) {
        if (err) {
                console.log("Error");
         } else {
               res.redirect(req.get('referer'));
         }
    })
   
 
    
})

router.get('/getComments', function(req, res, next) {
   comments_data.find({}, function(err, docs) {
      res.send(docs)
   })
})
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
      res.status(500).json(vrInfo);
    } else {
      if(result.length > 0) {
        var json = JSON.parse(JSON.stringify(result));
        console.log(json);
        localStorage.setItem('filename', json[0].filename);
        res.json(json[0]);
      } else {
        vrInfo.vr = null;
        vrInfo.errorMessage = "no VR found for id=" + id + " !!!";
        res.status(400).json(vrInfo);
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
      res.status(500).json(vrs);
    } else {
      if(result.length > 0) {
        var json = JSON.parse(JSON.stringify(result));
        vrs.arr = json;
        res.json(vrs);
      } else {
        vrs.arr = null;
        vrs.errorMessage = "no VR found !!!";
        res.status(400).json(vrs);
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
