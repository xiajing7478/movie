/**
 * Created by Administrator on 2017/2/9.
 */
var express = require('express');
var router = express.Router();
var dal = require('../database/admins');
var comment = require('../database/comment');
var mid = require('../database/middle');

router.get('/:id', function (req, res) {
    var id = req.params.id;
    //console.log("id: " + id);
    if(!id) return;
    //if(mid.isLogin(req,res)){
        dal.findById(id, function (results) {
            //console.log("result: "+ JSON.stringify(results[0]));
            if(results){
                comment.findByMovieId(id, function (comments) {
                    //console.log("comments: "+ JSON.stringify(comments));
                    res.render('detail',{'title':'影片详情页',movie:results[0],comments:comments});
                });
            }
        })
    //}
});

module.exports = router;