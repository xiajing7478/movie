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


router.post('/delete', function (req, res) {
    var id = req.body.id;
    dal.deleteById(id,function(result){
        if(result.affectedRows>0){
            res.json({code: 200, result: true});
        }else{
            res.writelen("删除失败...");
        }
    })
})



module.exports = router;
