/**
 * Created by Administrator on 2017/2/9.
 */

var express = require('express');
var router = express.Router();
var dal = require('../database/admins');
router.get('/', function (req, res) {
    dal.findAll(function (results) {
        res.render('list',{title:'列表页面',movies:results});
    });
});

module.exports = router;
