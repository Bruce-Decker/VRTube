var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();


/* GET home page. */
var curr_dir = process.cwd()
app.use(express.static("../views"));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

app.get('/', function(req, res) {
     res.sendFile(curr_dir +'/landingpage.html');
});


app.post('/login', function(req, res) {
    console.log(req.body.username)
   
              res.redirect("/");
    
});



module.exports = router;
app.listen(4000);
console.log("Running app");


