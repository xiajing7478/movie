/**
 * Created by Administrator on 2017/2/9.
 */


var dbConn = require('./dbConfig');
var moment = require('moment');
function add(obj,callback){
    obj.createTime= obj.updateTime = moment(Date.now()).format('YYYY-MM-DD kk:mm:ss');
    console.log(JSON.stringify(obj));
    var sql = 'INSERT INTO movies(title,country,language,year,flash,poster,createTime,updateTime,price,doctor,summary) VALUE(?,?,?,?,?,?,?,?,?,?,?)';
    dbConn.conn().query(sql,[obj.title,obj.country,obj.language,obj.year,obj.flash,obj.poster,obj.createTime,obj.updateTime,obj.price,obj.doctor,obj.summary], function (err, results) {
        if(err){
            console.log("add is err at " + err);
        }
        callback(results);
    })
};

module.exports ={
    add:add
} ;