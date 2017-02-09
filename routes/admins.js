/**
 * Created by Administrator on 2017/2/9.
 */
var express = require('express');
var router = express.Router();
var dal = require('../database/admins');
router.get('/', function (req, res) {
    res.render('admin',{title:'admin page'});
}).post('/', function (req, res) {
    dal.add(req.body, function (resluts) {
        if(resluts.insertId>0){
            res.redirect('/list');
        }
    })
});



module.exports = router;
