/**
 * Created by Administrator on 2017/2/9.
 */
var express = require('express');
var router = express.Router();
var dal = require('../database/admins');
router.get('/', function (req, res) {

    var id= req.query.id;
    if(typeof id == "undefined"){
        res.render('admin',{title:'增加影片'});
    }else{
        dal.findById(id, function (results) {
            res.render('admin',{title:'修改影片',movie:results[0]});
        })
    }
}).post('/', function (req, res) {
    console.log("id: "+req.body.id);
    var id = req.body.id;
    if(id>0){
        dal.updateMovie(req.body, function (results) {
            if(results.affectedRows==1){
                res.redirect("/list");
            }
        })
    }else{
        dal.add(req.body, function (resluts) {
            if(resluts.insertId>0){
                res.redirect('/list');
            }
        })
    }

});



module.exports = router;
