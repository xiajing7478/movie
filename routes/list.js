/**
 * Created by Administrator on 2017/2/9.
 */

var express = require('express');
var router = express.Router();
var dal = require('../database/admins');
var mid = require('../database/middle');
router.get('/', function (req, res) {
    if(isLogin(req,res)){
        if(mid.isGrunt(req,res)) {
            dal.findAll(function (results) {
                //console.log("results:" + JSON.stringify(results));
                res.render('list', {title: '列表页面', movies: results});
            });
        }
    }
});


router.post('/delete', function (req, res) {
    if(isEnter(req,res)){
        if(mid.isGrunt(req,res)) {
            var id = req.body.id;
            dal.deleteById(id, function (result) {
                if (result.affectedRows > 0) {
                    res.json({code: 200, result: true});
                } else {
                    res.send("删除失败...");
                }
            })
        }
    }
});

function isLogin(req,res){
    if((req.session.user)){
        var username = req.session.user.username;
        return true;
    }else{
        return res.redirect("users");
    }
};

module.exports = router;
