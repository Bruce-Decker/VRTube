var express = require('express');
var router = express.Router();

var axios = require('axios');
var bodyParser = require('body-parser');



const Blockchain = require('../Blockchain/blockchain');
const P2pServer = require('../Blockchain/p2p-server')
const bc = new Blockchain();
const p2pServer = new P2pServer(bc);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landingpage', { title: 'Home' });
});

router.get('/blocks', function(req, res) {
   res.json(bc.chain)
})

router.post('/mine', function(req, res) {
   var name = req.body.name;
   var email = req.body.contact_email;
   var comments = req.body.comments;
   var data = "name: " + name + " email: " + email + " comments: " + comments
   const block = bc.addBlock(data)
   console.log(`New block added: ${block.toString()}`);
   p2pServer.syncChains();
  
   res.redirect(req.get('referer'));

})


module.exports = router;
