var express = require('express');
var router = express.Router();
var mysql = require('./mysql');
var bcrypt = require('bcrypt');
var path = require('path');
var mkdir = require('mkdirp');
var utils = require('./../util/utils');
const saltRnd = 3;

// keep track of whether a user is logged in
var currentUser = {
  loggedIn: false,
  id: '',
  username: '',
  firstName: '',
  lastName: '',
  email: ''
};

// render user page
router.get('/', function(req, res, next) {
  var id = req.query.userid;
  // TODO: show error on nonexistent user
  id ? res.render('user') : res.render('error');
});

// get user info & vr list
router.get('/getUserInfo', function(req, res, next) {
  var username = req.query.username;
  var userInfo = { loginInfo: currentUser };

  // get list of VRs from database
  var query = "select * from files where owner ='" + username + "'";
  mysql.executeSQLQuery(query, function(err, result) {
    if(err) {
      console.log(err);
      userInfo.vrs = [];
      userInfo.errorMessage = "sql error when attempting to obtain VRs for user '" + username + "' !!!";
    } else {
      if(result.length > 0) {
        userInfo.vrs = result;
      } else {
        userInfo.vrs = [];
      }
    }
  });

  res.send(JSON.stringify(userInfo));
});

// register a new account
// register a new account
router.post('/signup', function(req, res, next) {
  var firstName = req.body.firstname;
  var lastName = req.body.lastname;
  var userName = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  let res_result =  {
                      message:''
                    };

  var checkQuery = "select * from user where username ='" + username +"'";
  mysql.executeSQLQuery(checkQuery , function(err , results){
    if(results.length <= 0) {
      bcrypt.hash(password, saltRnd, function(err, hashpassword) {
        if(!err) {
          var userHome = userName;
          var userQuery = "insert into user (firstname, lastname, username, password, homedir, email) values ('"+
          firstName + "','" + lastName + "','" + userName + "','" + hashpassword + "','" + userHome +"','"+email+"')";
          console.log(userQuery);

          mysql.executeSQLQuery(userQuery, function(err, result){
            if(err){
              res_result.message = "Registration failed !!!";
              res.status(400).json(res_result);
            }else{
              var success_msg = "User '"+ firstName+"'' added successfully !!!";
              utils.createDirectory(path.join(__dirname , './../uploads' , userHome) , function(status) {
                if(status) {
                  res_result.message = "Registration succeeded !!!";
                  //res.status(200).json(res_result);
                  console.log("User '"+ firstName+"'' registered!");

                  let userQuery2 = "select * from user where username ='" + userName +"'";
                  let status2 = 400;
                  let res_result2 = {
                                    id:'',
                                    message:'',
                                    username:''
                                   };
                  mysql.executeSQLQuery(userQuery2, function(err, result2) {
                    if(err) {
                      console.log(err);
                      res_result2.message = "sql error when attempting login!!!";
                    }else {
                      res_result2.id = result2[0].id;
                      res_result2.username = result2[0].username;
                      res_result2.message = "Login successful!";
                      status2 = 200;
                      console.log("User '" + userName + "' logged in");

                      // set session variables for this user
                      currentUser.loggedIn = true;
                      currentUser.id = result2[0].id;
                      currentUser.username = result2[0].username;
                      currentUser.firstName = result2[0].firstname;
                      currentUser.lastName = result2[0].lastname;
                      currentUser.email = result2[0].email;
                      //console.log(currentUser);
                    }
                    if(status2 === 200) {
                      res.redirect('/users?userid=' + res_result2.username);
                    } else {
                      res.status(status2).json(res_result2);
                    }
                  });

                }else {
                  console.log("[Unable to create directory] for user: " + userName);
                }
              });
            }
          });
        } else {
          res_result.message = "Error hashing password";
          res.status(500).json(res_result);
        }
      });
    }else{
      res_result.message = "username or email already exists!"
      res.status(200).json(res_result);
    }
  });
});

// login to an existing account
router.post('/login' , function(req, res, next) {
  var username = req.body.username2;
  var password = req.body.password2;
  var userQuery = "select * from user where username ='" + username +"'";
  let status = 400;
  let res_result = {
                    id:'',
                    message:'',
                    username:''
                   };
  mysql.executeSQLQuery(userQuery, function(err, result) {
    if(err) {
      console.log(err);
      res_result.message = "sql error when attempting login!!!";
    }else {
      if(result.length > 0) {
        if(bcrypt.compareSync(password, result[0].password)){
          res_result.id = result[0].id;
          res_result.username = result[0].username;
          res_result.message = "Login successful!";
          status = 200;
          console.log("User '"+ username+"' logged in");

          // set session variables for this user
          currentUser.loggedIn = true;
          currentUser.id = result[0].id;
          currentUser.username = result[0].username;
          currentUser.firstName = result[0].firstname;
          currentUser.lastName = result[0].lastname;
          currentUser.email = result[0].email;
          //console.log(currentUser);
        }else{
          res_result.message = "Wrong username or password !!!";
        }
      }else{
        res_result.message = "Username does not exist!!!";
        console.log("Username Does not exist !!!");
      }
    }
    if(status === 200) {
      res.redirect('/users?userid=' + res_result.username);
    } else {
      res.status(status).json(res_result);
    }
  });
});

// logout
router.get('/logout' , function(req, res, next) {
  currentUser.loggedIn = false;
  res.sendStatus(200);
});

module.exports = router;
