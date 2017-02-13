var express = require('express');
var router = express.Router();
var dal = require('../database/login.js');

/* GET login listing. */
router.get('/', function(req, res, next) {
  res.render('login',{title:'登录页'});
  //res.send('respond with a resource');
}).post('/', function (req, res) {
     dal.login(req.body, function (result) {
       console.log(JSON.stringify(result.length));
       if(result.length == 1){
         res.redirect("../");
       }else{
         res.send("用户名或密码错误...");
       }
     })
});

/* GET register listing. */
router.get("/register", function (req,res) {
  res.render("reg",{title:'注册'});
}).post('/register', function (req, res) {
  dal.isExistUserName(req.body, function (result) {
    //console.log(JSON.stringify(result));
    //console.log(result[0].count);
    if(result[0].count>0){
      res.send("改用户名已存在,请重新输入...");
    }else{
      dal.register(req.body,function(result){
        //console.log(JSON.stringify(result));
        if(result.insertId>0)
          res.redirect('../');
      })
    }
  })
});


/* GET uodate listing. */
router.get('/update', function (req, res) {
  res.render('./updatePwd',{title:'修改密码'});
}).post('/update', function (req, res) {
  dal.login(req.body, function (result) {
    if(result.length == 1){
      dal.update(req.body, function (result) {
        console.log(JSON.stringify(result));
        if(result.affectedRows == 1){
          res.send("修改成功...");
        }
      })
    }else{
      res.send("你输入的用户名或密码有误...");
    }
  })
});

module.exports = router;
