var express = require('express');
var router = express.Router();
var mkdir = require('mkdirp');
var path = require('path');
var mysql = require('./mysql');
var utils = require('./../util/utils');
const all_userhome = path.join(__dirname,'./../uploads');


router.post('/upload' , function(req,res){
  if(req.files.fileInput){
    let data = req.files.fileInput;
    let filename = data.name;
    let username = req.body.usernameInput;
    let description = req.body.descriptionInput;
    let des_path = path.join(__dirname, './../uploads', username, filename);
    let access_path = path.join(username, filename);
    let res_result =  {message:''};

    data.mv(des_path,function(err){
      if(err){
        console.log(err);
        res.status(400).json("Upload Failed !!!");
      }else {
        var insertRecord = "insert into files (filename, filepath, owner, likes, description) values ('"+ 
        filename + "','" + access_path + "','" + username + "'," + 0 + ",'" + description + "')";
        console.log(insertRecord);
        mysql.executeSQLQuery(insertRecord, function(err, result){
          if(err){
            console.log(err);
            res_result.message = "Upload failed !!!"
            res.status(400).json(res_result);
          }else {
            res_result.message = "File Uploaded successfully!!!"
            res.status(200).json(res_result);
          }
        });
      }
    });
  }else{
    res.status(400).json("File not found or file not chosen by user !!!");
  }
});


router.post('/download',function(req, res, next) {
  let download_path = path.join(all_userhome, req.body.username , req.body.filename);
  console.log(download_path);
  res.download(download_path);
});


router.get('/uservrs', function(req, res, next) {
  let username = req.query.username;
  let res_result =  { message : '', result:'' };
  if(!username) {
    res_result.message = "Client-side error: illegitimate username provided"
    res.status(400).json(res_result);
  } else {
    var vr_query = "select * from files where owner='" + username + "'";
    console.log(vr_query);
    mysql.executeSQLQuery(vr_query, function(err , rows){
      if(err) {
        res_result.message = "VR query failed for " + username;
        res.status(500).json(res_result);
      } else {
        if(rows.length <= 0) {
          res_result.message = "No VRs found for " + username;
          res.status(200).json(res_result);
        }else {
          res_result.message = "VR retrieval successful";
          res_result.result = rows;
          res.send(JSON.stringify(res_result));
        }
      }
    });
  }
});


router.post('/search' , function(req , res , next) {
  console.log("inside search");
  var txt = req.body.search;
  let res_result =  {
                      message : '',
                      result:[]
                    };
  var search_query = "select * from files where filename like '%" + txt + "%' or filename like '%" + txt +
    "' or filename like '" + txt + "%' or description like '%" + txt + "%' or description like '%" + txt +
    "' or description like '" + txt + "%'";
  console.log(search_query);
  mysql.executeSQLQuery(search_query, function(err , rows){
    if(err) {
      res_result.message = "Search Failed";
      res.status(400).json(res_result);
    } else {
      if(rows.length <= 0) {
        res_result.message = "No search results found";
        res.status(200).json(res_result);
      }else {
        res_result.message = "Search Successful";
        res_result.result = rows;
        res.status(200).json(res_result);
      }
    }
  });
});

router.post('/like' , function(req, res , next){
  console.log("inside like");
  var filename = req.body.filename;
  var owner = req.body.owner;
  var res_result =  {
                      message : '',
                      result:''
                    };
  var serach_file = "select * from files where filename ='" + filename + "' and owner = '" + owner +"'";
  console.log(serach_file);
  mysql.executeSQLQuery(serach_file, function(err , rows){
      if(err) {
        res_result.message = "DB Connection Failed";
        res.status(400).json(res_result);
      }else {
        console.log(rows[0]);
         var updatedLikes= rows[0].likes + 1;
         console.log(updatedLikes);
         var update_query = "UPDATE files SET LIKES =" +  updatedLikes + " WHERE filename ='" + filename + "' and owner = '" + owner +"'";
         console.log(update_query);
         mysql.executeSQLQuery(update_query, function(err , rows){
           if(!err) {
             var serach_updated_record = "select * from files where filename ='" + filename + "' and owner = '" + owner +"'";
             mysql.executeSQLQuery(serach_updated_record, function(err , rows){
               res_result.message = "Successfully liked the VR";
               res_result.result = rows;
               res.status(200).json(res_result);
             });
           }
         });
      }
  });
});


module.exports = router;
