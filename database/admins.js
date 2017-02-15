/**
 * Created by Administrator on 2017/2/9.
 */


var dbConn = require('./dbConfig');
var moment = require('moment');
function add(obj,callback){
    obj.createTime= obj.updateTime = moment(Date.now()).format('YYYY-MM-DD kk:mm:ss');
    console.log(JSON.stringify(obj));
    var sql = 'INSERT INTO movies(title,country,language,year,flash,poster,createTime,updateTime,price,doctor,summary,categoryId) VALUE(?,?,?,?,?,?,?,?,?,?,?,?)';
    dbConn.conn().query(sql,[obj.title,obj.country,obj.language,obj.year,obj.flash,obj.poster,obj.createTime,obj.updateTime,obj.price,obj.doctor,obj.summary,obj.categoryId], function (err, results) {
        if(err){
            console.log("add is err at " + err);
        }
        callback(results);
    })
};


function findAll(callback){
    var sql = 'select m.*,c.name from movies as m LEFT JOIN categorys AS c on c.`id` = m.`categoryId`';
    dbConn.conn().query(sql, function (err, results) {
        if(err){
            console.log('findAll is err at ' + err);
        }
        callback(results);
    })
};

function findByCategoryId(categoryId,callback){
    var sql = 'select * from movies where categoryId =?';
    dbConn.conn().query(sql,[categoryId], function (err, results) {
        if(err){
            console.log('findByCategoryId is err at ' + err);
        }
        callback(results);
    })
};


function findById(id,callback){
    var sql = 'select * from movies where id =?';
    dbConn.conn().query(sql,[id], function (err,results) {
        if(err){
            console.log('findById is err at '+ err);
        }
        callback(results);
    })
};


function updateMovie(obj,callback){
    obj.updateTime = moment(Date.now()).format('YYYY-MM-DD kk:mm:ss');
    var sql = 'update movies set title =?,country=?,language=?,year=?,flash=?,' +
        'poster=?,createTime=?,updateTime=?,price=?,doctor=?,summary=? where id=?';
    dbConn.conn().query(sql,[obj.title,obj.country,obj.language,obj.year,obj.flash,obj.poster,obj.createTime,obj.updateTime, obj.price,obj.doctor,obj.summary,obj.id],
        function (err,results) {
            if(err){
                console.log("update is err at " + err);
            }
            callback(results);
        })
};


function deleteById(id,callback){
    var sql = 'delete from movies where id = ?';
    dbConn.conn().query(sql,[id], function (err, result) {
        if(err)
            console.log("delete err at " + err);
        callback(result);
    })
};

module.exports ={
    add:add,
    findAll:findAll,
    findById:findById,
    updateMovie:updateMovie,
    deleteById:deleteById,
    findByCategoryId:findByCategoryId
} ;