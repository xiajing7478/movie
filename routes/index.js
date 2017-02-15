var express = require('express');
var app = express();
var router = express.Router();
var dal = require('../database/admins');
var category = require('../database/category');

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
  category.select(function(categorys){
    //http://www.imooc.com/learn/197
    //var arr=[],obj={};
    //for(var i=0; i<categorys.length; i++){
    //  obj.name = categorys[i].id;
    //  //dal.findByCategoryId(categorys[i].id, function (results) {
    //  //  obj.results=results;
    //  //
    //  //});
    //  arr.push(obj);
    //}
    //
    //console.log(JSON.stringify(arr));
    //$.each(categorys, function (index, item) {
    //  console.log(JSON.stringify(item));
    //})
    res.render('index', { title: '首页',categorys:categorys});
  })

  //dal.findAll(function (results) {
  //  //console.log(JSON.stringify(results));
  //  res.render('index', { title: '首页',movies:results});
  //})
});



module.exports = router;
