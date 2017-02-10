/**
 * Created by Administrator on 2017/2/9.
 */
var express = require('express');
var router = express.Router();
var dal = require('../database/admins');

router.get('/:id', function (req, res) {

    var id = req.params.id;
    console.log("id: " + id);
    if(!id) return;

    dal.findById(id, function (results) {
        console.log("result: "+ JSON.stringify(results[0]));
        if(results){
            res.render('detail',{'title':'影片详情页',movie:results[0]});
        }
    })
});

module.exports = router;