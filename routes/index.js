var express = require('express');
var router = express.Router();
var dal = require('../database/admins');
/* GET home page. */
router.get('/', function(req, res) {
  dal.findAll(function (results) {
    //console.log(JSON.stringify(results));
    res.render('index', { title: '首页',movies:results});
  })
});



module.exports = router;
