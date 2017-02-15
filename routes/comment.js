/**
 * Created by Administrator on 2017/2/14.
 */
var express = require('express');
var router = express.Router();
var dal = require('../database/comment');


router.post('/add', function (req, res) {
console.log("content:" + JSON.stringify(req.body));
    dal.save(req.body, function (result) {
        if(result.insertId>0){
            res.redirect('/detail/'+req.body.m_id);
        }
    })
});



module.exports = router;