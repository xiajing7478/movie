var express = require('express');
var app = express();
var router = express.Router();
var dal = require('../database/admins');
/* GET home page. */
router.get('/', function(req, res) {
  console.log("req.session.user: "+ req.session.username);
  var _username = req.session.username;
  if(_username){
    res.locals.username = _username;
  }
  dal.findAll(function (results) {
    //console.log(JSON.stringify(results));
    res.render('index', { title: '首页',movies:results});
  })
});



module.exports = router;
