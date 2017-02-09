/**
 * Created by Administrator on 2017/2/9.
 */
var express = require('express');
var router = express.Router();
var dal = require('./database/admins')

router.get('/', function (req, res) {
    var id = req.query.id;
    if(id) return;

    dal.findById(id, function (results) {
        console.log("result: "+ results);
        if(results){
            res.render('detail',{'title':'影片详情页',movie:results});
        }
    })
})