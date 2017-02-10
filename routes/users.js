var express = require('express');
var router = express.Router();
var dal = require('../database/login.js');
//var bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login',{title:'登录页'});
  //res.send('respond with a resource');
}).post('/', function (req, res) {
  dal.login(req.body, function (result) {

  })
});

//bcrypt.genSalt


module.exports = router;
