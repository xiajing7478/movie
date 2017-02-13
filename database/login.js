/**
 * Created by Administrator on 2017/2/10.
 */


var dbConn = require('./dbConfig');
var crypto = require('crypto');



function getSha(val){
    var shasum = crypto.createHash('sha1');
    shasum.update(val);
    return shasum.digest('hex');
}

function login(obj,callback){
    var sql = 'select * from users where username=? and password = ?';
    dbConn.conn().query(sql,[obj.username,getSha(obj.password)], function (err, result) {
        if(err){
            console.log("login error at "+ err);
        }
        callback(result);
    })
};

function update(obj,callback){
    var sql = 'update users set password =? where username = ?';
    dbConn.conn().query(sql,[getSha(obj.newPassword),obj.username], function (err,result) {
        if(err){
            console.log("update is err at "+ err);
        }
        callback(result);
    })
}

function register(obj,callback){
    var sql = 'insert into users(username,password) VALUES (?,?)';
    dbConn.conn().query(sql,[obj.username,getSha(obj.password)], function (err, result) {
        if(err){
            console.log('register err at '+ err);
        }
        callback(result);
    })
};

function isExistUserName(obj,callback){
    var sql ='select count(*) as count from users where username=?';
    dbConn.conn().query(sql,[obj.username], function (err, result) {
        if(err){
            console.log('select is err at ' + err);
        }
        callback(result);
    })
}

module.exports={
    login:login,
    update:update,
    isExistUserName:isExistUserName,
    register:register
}