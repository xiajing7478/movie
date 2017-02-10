/**
 * Created by Administrator on 2017/2/10.
 */


var dbConn = require('./dbConfig');

function login(obj,callback){
    var sql = 'select * from users where username=? and password = ?';
    dbConn.conn().query(sql,[obj.username,obj.password], function (err, result) {
        if(err){
            console.log("login error at "+ err);
        }
        callback(result);
    })
};


function register(obj,callback){
    var sql = 'insert into users(username,password) VALUES (?,?)';
    dbConn.conn().query(sql,[obj.username,obj.password], function (err, result) {
        if(err){
            console.log('register err at '+ err);
        }
        callback(result);
    })
}


module.exports={
    login:login,
    register:register
}