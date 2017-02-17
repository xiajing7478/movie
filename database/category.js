/**
 * dal category
 */

var dbConn = require('./dbConfig');
var moment = require('moment');
function add(obj,cb){
    obj.createTime= obj.updateTime = moment(Date.now()).format('YYYY-MM-DD kk:mm:ss');
    var sql = 'insert into categorys(name,createTime,updateTime) values(?,?,?)';
    dbConn.conn().query(sql,[obj.name,obj.createTime,obj.updateTime], function (err, result) {
        if(err){
            console.log('category add has err at ' + err);
        }
        cb(result);
    })
};

function select(cb){
    var sql = "select * from categorys";
    dbConn.conn().query(sql, function (err, categorys) {
        if(err){
            console.log('category select has err at '+ err);
        }
        cb(categorys);
    })
};

function findByCategoryId(id,cb){
    var sql = "select * from categorys where id = ?";
    dbConn.conn().query(sql,[id], function (err,category) {
        if(err){
            console.log("findByCategoryId has err at "+ err);
        }
        cb(category);
    })
};


function updateCategory(obj,cb){
    obj.updateTime = moment(Date.now()).format('YYYY-MM-DD kk:mm:ss');
    var sql = 'update categorys set name = ?,updateTime =? where id = ?';

    dbConn.conn().query(sql,[obj.name,obj.updateTime,obj.id], function (err, result) {
        if(err){
            console.log('updateCategory has err at ' + err);
        }
        cb(result);
    })
};

function deleteCategoryById(id,cb){
    var sql = 'delete from categorys where id=?';
    dbConn.conn().query(sql,[id], function (err,result) {
        if(err){
            console.log('deleteCategoryById has err at ' + err);
        }
        cb(result);
    })
};

module.exports={
    add:add,
    select:select,
    findByCategoryId:findByCategoryId,
    updateCategory:updateCategory,
    deleteCategoryById:deleteCategoryById
}



