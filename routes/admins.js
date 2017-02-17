/**
 * Created by Administrator on 2017/2/9.
 */
var express = require('express');
var router = express.Router();
var multiparty = require('connect-multiparty');
var fs = require('fs');
var morgan = require('morgan');
var path = require('path');
var dal = require('../database/admins');
var mid = require('../database/middle');
var category = require('../database/category');


var hbs = require('hbs');

hbs.registerHelper('compare', function () {
    //console.log('arguments.length: '+arguments.length);
    for(var i=0; i<arguments.length; i++){
        //console.log('arguments: '+JSON.stringify(arguments[i]));
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


router.post('/upload',multiparty(), function (req,res) {
    var file  = req.files.files;
    var filename = file.originalFilename;

    var target = '/public/images'+filename;

    fs.createReadStream(file.path)
        .pipe(fs.createWriteStream(target));

    res.json({code:200,msg: {url: '/images/' + filename}});
})



module.exports = router;
