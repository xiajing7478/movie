/**
 * Created by Administrator on 2017/2/9.
 */
var express = require('express');
var router = express.Router();
var dal = require('../database/admins');
var mid = require('../database/middle');
var category = require('../database/category');


var hbs = require('hbs');

hbs.registerHelper('compare', function () {
    console.log('arguments.length: '+arguments.length);
    for(var i=0; i<arguments.length; i++){
        console.log('arguments: '+JSON.stringify(arguments[i]));
    }
})

router.get('/', function (req, res) {
    category.select(function (categorys) {
        var id= req.query.id;
        if(typeof id == "undefined"){
            res.render('admin',{title:'增加影片',categorys:categorys});
        }else{
            dal.findById(id, function (results) {
                res.render('admin',{title:'修改影片',movie:results[0],categorys:categorys});
            })
        }
    })
}).post('/', function (req, res) {
    console.log("id: "+JSON.stringify(req.body));
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
