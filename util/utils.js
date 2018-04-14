var mkdir = require('mkdirp');
var filesystem = require('fs');
var mysql = require('./../routes/mysql');


function createDirectory(path, callback){
  mkdir(path,function(err){
    if(err){
      console.log("Failed to create directory: ",path);
      callback(false);
    }else{
      console.log("Directory created",path);
      callback(true);
    }
  });
}

exports.createDirectory = createDirectory;
