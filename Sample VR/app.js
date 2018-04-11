var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var curr_dir = process.cwd();
app.get('/', function(req, res) {
     res.sendFile(curr_dir +'/project.html');
});
app.listen(4000);
console.log("Running app");