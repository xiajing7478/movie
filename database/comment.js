/**
 * Created by Administrator on 2017/2/14.
 * dal comment
 */
var dbConn = require('./dbConfig');
var moment = require('moment');

function findByMovieId(id,callback){
    var sql = 'select * from comment where m_id=? order by commentTime desc';
    dbConn.conn().query(sql,[id],function (err, results) {
        if(err){
            console.log('comment findAll is err at ' + err);
        }
        callback(results);
    })
};

function save(obj,cb){
    obj.commentTime = moment(Date.now()).format('YYYY-MM-DD kk:mm:ss');
    var sql = 'INSERT INTO comment(m_id,m_from,m_to,content,username,commentTime) VALUE(?,?,?,?,?,?)';
    dbConn.conn().query(sql,[obj.m_id,obj.m_from,obj.m_to,obj.content,obj.username,obj.commentTime], function (err, results) {
        if(err){
            console.log("comment add is err at " + err);
        }
        cb(results);
    })
}


module.exports ={
    save:save,
    findByMovieId:findByMovieId
} ;