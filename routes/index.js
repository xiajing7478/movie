var express = require('express');
var app = express();
var router = express.Router();
var dal = require('../database/admins');



//预处理
router.use(function (req, res, next) {
  console.log("pre..................."+req.session.user);
  var user = req.session.user;
  if(user){
      if((user.username)){
        res.locals.username = user.username;
      }
  }
  next();
});

/* GET home page. */
router.get('/', function(req, res) {

  dal.findAll(function (results) {
    //console.log(JSON.stringify(results));
    res.render('index', { title: '首页',movies:results});
  })
});



module.exports = router;
