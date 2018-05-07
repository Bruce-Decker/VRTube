var assert = require('chai').assert;
var expect = require("chai").expect;
var baseurl = "http://localhost:3000";
var util = require("util");
var app = require('../app.js')
var chai = require("chai");
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

//search api
describe("Search VR API ", function() {
     it("Should return 200 response", function(done) {
         // Send some Form Data
          chai.request(baseurl)
         .post('/files/search')
         .send({
          "search" : "vr"
         })


         .end(function (err, res) {
           console.log(res.status);
             expect(res).to.have.status(200);
             done();
         });

     });

 });


//like api
describe("Like VR API ", function() {
     it("Should return 200 response", function(done) {
         // Send some Form Data
          chai.request(baseurl)
         .post('/files/like')
         .send({
          "filename" : "samplevr",
          "owner" : "akashgupta29"
         })


         .end(function (err, res) {
           console.log(res.status);
             expect(res).to.have.status(200);
             done();
         });

     });

 });


//uservrs api
describe("List VRs owned by a user", function() {
     it("Should return 200 response", function(done) {
         // Send some Form Data
          chai.request(baseurl)
         .get('/files/uservrs?username=akashgupta29')
         .end(function (err, res) {
           console.log(res.status);
             expect(res).to.have.status(200);
             done();
         });

     });

 });


//signup api
describe("Signup API ", function() {
     it("Should return 200 response", function(done) {
         // Send some Form Data
          chai.request(baseurl)
         .post('/users/signup')
         .send({
            "firstname" : "mocha",
            "lastname" : "test",
            "username" : "mocha_test01",
            "password" : "mocha",
            "email" : "mocha_test01@gmail.com"
         }).end(function (err, res) {
            console.log(res.status);
            expect(res).to.have.status(200);
            done();
         });

     });

 });


//login API
describe("Login API ", function() {
     it("Should return 200 response", function(done) {
         // Send some Form Data
          chai.request(baseurl)
         .post('/users/login')
         .send({
            "username" : "mocha_test29",
            "password" : "mocha"
         }).end(function (err, res) {
            console.log(res.status);
            expect(res).to.have.status(200);
            done();
         });

     });

 });

//Render user page API
describe("Render user page API ", function() {
     it("Should return 200 response", function(done) {
         // Send some Form Data
          chai.request(baseurl)
         .get('?userid=mocha_test29')
         .end(function (err, res) {
            console.log(res.status);
            expect(res).to.have.status(200);
            done();
         });

     });

 });

