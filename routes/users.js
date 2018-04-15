var express = require('express');
var router = express.Router();
var mysql = require('./mysql');
var bcrypt = require('bcrypt');
var path = require('path');
var mkdir = require('mkdirp');
var utils = require('./../util/utils');
const saltRnd = 3;

/*
router.get('/login', function(req, res, next) {
  console.log("inside login");
});
*/

router.post('/signup', function(req, res, next) {
  var firstName = req.body.firstname;
  var lastName = req.body.lastname;
  var userName = req.body.username;
  var password = req.body.password;
  var contact = req.body.contactinfo;
  let res_result =  {
                      message:''
                    };

  bcrypt.hash(password, saltRnd, function(err, hashpassword) {
    if(!err) {
      var userHome = userName;
      var userQuery = "insert into user (firstname, lastname, email, password, homedir,contact) values ('"+
      firstName + "','" + lastName + "','" + userName + "','" + hashpassword + "','" + userHome +"','"+contact+"')";
      console.log(userQuery);

      mysql.executeSQLQuery(userQuery, function(err, result){
        if(err){
          res_result.message = "Registration failed !!!"
          res.status(400).json(res_result);
        }else{
          var success_msg = "User "+ firstName+" added successfully !!!"
          utils.createDirectory(path.join(__dirname , './../uploads' , userHome) , function(status) {
            if(status) {
              res_result.message = "Registration successfully !!!"
              res.status(200).json(res_result);
            }else {
              console.log("[Unable to create directory] for user:" + userName);
            }
          });
        }
      });
    }
  });
});

router.post('/login' , function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var userQuery = "select * from user where email ='" + username +"'";
  let status = 400;
  let res_result = {
                    message:'',
                    username:''
                   };
  mysql.executeSQLQuery(userQuery, function(err, result) {
    if(err) {
      console.log(err);
      res_result.message = "sql error !!!";
    }else {
      if(result.length > 0) {
        if(bcrypt.compareSync(password, result[0].password)){
          res_result.username = result[0].email;
          res_result.message = "Login Successful!";
          status = 200;
        }else{
          res_result.message = "Wrong username or password !!!";

        }
      }else{
        res_result.message = "Username does not exist!!!";
        console.log("Username Does not exist !!!");
      }
    }
    res.status(status).json(res_result);
  });
});

module.exports = router;
