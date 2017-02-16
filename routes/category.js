/**
 * Created by Administrator on 2017/2/15.
 */

var express = require('express');
var router = express.Router();
var dal = require('../database/category');
var mid = require('../database/middle');
router.get("/", function (req, res) {
    var id= req.query.id;
    //console.log("id: "+ id);
    if(id){
        dal.findByCategoryId(id, function (category) {
            //console.log(JSON.stringify(category[0]));
            res.render('categoryAdd',{title:'修改电影分类',category:category[0]});
        })
    }else
        res.render('categoryAdd',{title:'增加电影分类'})
}).post("/", function (req, res) {
    if(!req.body.id){   //add
        dal.add(req.body, function (result) {
            if(result.insertId>0){
                res.redirect('category/categoryList');
            }
        })
    }else{ //update
        dal.updateCategory(req.body, function (result) {
            if(result.affectedRows == 1){
                res.redirect('category/categoryList');
            }
        })
    }

});

router.get("/categoryList", function (req, res) {
    dal.select(function (categorys) {
        res.render("categoryList",{title:'电影分类列表',categorys:categorys});
    })
});

router.post('/delete', function (req, res) {
    if(mid.isLogin(req,res)){
        if(mid.isGrunt(req,res)) {
            var id = req.body.id;
            //console.log(req.body.id);
            dal.deleteCategoryById(id, function (result) {
                if (result.affectedRows > 0) {
                    res.json({code: 200, result: true});
                } else {
                    res.send("删除失败...");
                }
            })
        }
    }
});


module.exports=router;
