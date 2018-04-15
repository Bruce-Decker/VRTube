var express = require('express');
var router = express.Router();
var mkdir = require('mkdirp');
var path = require('path');
var mysql = require('./mysql');
var utils = require('./../util/utils');
const all_userhome = path.join(__dirname,'./../uploads');


router.post('/upload' , function(req,res){
  if(req.files.userfile){
    let data = req.files.userfile,
    filename = data.name,
    username = req.body.username;
    let des_path = path.join(__dirname ,'./../uploads' , username);
    let res_result =  {
                        message:''
                      };
    data.mv(des_path,function(err){
      if(err){
        res.status(400).json("Upload Failed !!!");
      }else {
        var insertRecord = "insert into files (filename, filepath, owner, likes) values ('"+ filename + "','" + des_path + "','" + username + "'," + 0 + ")";
        console.log(insertRecord);
        mysql.executeSQLQuery(insertRecord, function(err, result){
          if(err){
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
    res.status(400).json("File not found or file not choosen by user !!!");
  }
});


router.post('/download',function(req, res, next) {
  let download_path = path.join(all_userhome, req.body.username , req.body.filename);
  console.log(download_path);
  res.download(download_path);
});


module.exports = router;
