/**
 * Created by Administrator on 2017/2/16.
 */

var express = require('express');
var router = express.Router();
var mid = require('../database/middle');

router.get('/', function (req, res) {
    if(mid.isLogin(req,res)){
        res.render('usersList',{title:'用户列表',msg:'这里是用户列表页'});
    }
})


module.exports = router;
