/**
 * 数据库文件配置.
 */

var mysql = require('mysql');

function conn(){
    return mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'xiajing',
        database:'movie'
    });
};

exports.conn = conn;
