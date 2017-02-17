/**
 * Created by Administrator on 2017/2/9.
 */

var express = require('express');
var router = express.Router();
var dal = require('../database/admins');
var mid = require('../database/middle');
var category = require('../database/category');
var fs = require('fs');
var xlsx = require('node-xlsx');
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


router.post('/exportExcel', function (req, res) {
    console.log("hello");
    var data = [
        [1,2,3],
        [true, false, null, 'sheetjs'],
        ['foo','bar',new Date('2014-02-19T14:30Z'), '0.3'],
        ['baz', null, 'qux']
    ];
    var buffer = xlsx.build([{name: "mySheetName", data: data}]);
    console.log(__dirname);
    fs.writeFileSync('/images/b.xlsx', buffer, 'binary', function (err, results) {
        console.log(err);
        res.json({code:200});
    });
    //res.send('export successfully!');
})

function isLogin(req,res){
    if((req.session.user)){
        var username = req.session.user.username;
        return true;
    }else{
        return res.redirect("users");
    }
};

module.exports = router;
