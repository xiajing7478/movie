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


router.get("/register", function (req,res) {
  res.render("reg",{title:'注册'});
}).post('/register', function (req, res) {
  dal.register(req.body,function(result){

  })
})


//bcrypt.genSalt
//sha1加密，不可逆的


module.exports = router;
