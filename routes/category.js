/**
 * Created by Administrator on 2017/2/15.
 */

var express = require('express');
var router = express.Router();
var dal = require('../database/category');
router.get("/", function (req, res) {
    res.render('categoryAdd',{title:'电影分类'})
}).post("/", function (req, res) {
    dal.add(req.body, function (result) {
        if(result.insertId>0){
            res.redirect('category/categoryList');
        }
    })
});

router.get("/categoryList", function (req, res) {
    dal.select(function (categorys) {
        res.render("categoryList",{title:'电影分类列表',categorys:categorys});
    })
})


module.exports=router;
