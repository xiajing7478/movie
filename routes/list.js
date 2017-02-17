/**
 * Created by Administrator on 2017/2/9.
 */

var express = require('express');
var router = express.Router();
var dal = require('../database/admins');
var mid = require('../database/middle');
var category = require('../database/category');
var fs = require('fs');
var nodeExcel = require('excel-export');
var hbs = require('hbs');

hbs.registerHelper('totalNums', function () {
    return Math.ceil(arguments[0]/arguments[1]);
});
//hbs.registerHelper('equal', function (req,res) {
//
//    console.log('arguments[0]:' + arguments[0]);
//    console.log('arguments[1]:' + arguments[1]);
//    console.log('arguments[1]:' + arguments[2].movies);
//    //console.log('arguments[1]:' + JSON.stringify(arguments[2]));
//    if(arguments[0] == arguments[1])
//        return true;
//    else
//        return false;
//});



router.get('/', function (req, res) {
    //console.log('page:' + req.query.page);
    //console.log('categoryId:' + req.query.categoryId);
    var page = req.query.page,categoryId = req.query.categoryId;
    if(!page)
        page = 1;
    if(!categoryId){
        categoryId = 0;
    }
    res.locals.categoryId = categoryId;
    //,categoryId:categoryId
    if(isLogin(req,res)){
        if(mid.isGrunt(req,res)) {
            dal.totalCount(categoryId,function (counts) {
                dal.findAll(page,categoryId,function (results) {
                    category.select(function(categorys){
                        res.render('list', {title: '列表页面', movies: results,counts:counts,page:page,categorys:categorys});
                    })
                });
            })
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


router.get('/exportExcel', function (req, res) {
    console.log('exportExcel ready.....');
    var conf ={};
    conf.stylesXmlFile = "styles.xml";
    conf.cols = [{
        caption:'string',
        type:'string',
        beforeCellWrite:function(row, cellData){
            return cellData.toUpperCase();
        },
        width:28.7109375
    },{
        caption:'date',
        type:'date',
        beforeCellWrite:function(){
            var originDate = new Date(Date.UTC(1899,11,30));
            return function(row, cellData, eOpt){
                if (eOpt.rowNum%2){
                    eOpt.styleIndex = 1;
                }
                else{
                    eOpt.styleIndex = 2;
                }
                if (cellData === null){
                    eOpt.cellType = 'string';
                    return 'N/A';
                } else
                    return (cellData - originDate) / (24 * 60 * 60 * 1000);
            }
        }()
    },{
        caption:'bool',
        type:'bool'
    },{
        caption:'number',
        type:'number'
    }];
    conf.rows = [
        ['谢谢', new Date(Date.UTC(2013, 4, 1)), true, 3.14],
        ["e", new Date(2012, 4, 1), false, 2.7182],
        ["M&M<>'", new Date(Date.UTC(2013, 6, 9)), false, 1.61803],
        ["null date", null, true, 1.414]
    ];


    var random = Math.random().toString().split('.')[1];
    var result = nodeExcel.execute(conf);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats;charset=utf-8');
    res.setHeader("Content-Disposition", "attachment; filename="+random+".xlsx");
    res.end(result, 'binary');
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
