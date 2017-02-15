/**
 * Created by Administrator on 2017/2/15.
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

module.exports={
    add:add,
    select:select
}



