var express = require('express');
var router = express.Router();
//var bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login',{title:'登录页'});
  //res.send('respond with a resource');
}).post('/', function (req, res) {

});

//bcrypt.genSalt


module.exports = router;
