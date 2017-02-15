/**
 * Created by Administrator on 2017/2/14.
 */
var dbConn = require('./dbConfig');
var moment = require('moment');
//function add(obj,callback){
//    obj.createTime= obj.updateTime = moment(Date.now()).format('YYYY-MM-DD kk:mm:ss');
//    console.log(JSON.stringify(obj));
//    var sql = 'INSERT INTO movies(title,country,language,year,flash,poster,createTime,updateTime,price,doctor,summary) VALUE(?,?,?,?,?,?,?,?,?,?,?)';
//    dbConn.conn().query(sql,[obj.title,obj.country,obj.language,obj.year,obj.flash,obj.poster,obj.createTime,obj.updateTime,obj.price,obj.doctor,obj.summary], function (err, results) {
//        if(err){
//            console.log("add is err at " + err);
//        }
//        callback(results);
//    })
//};
//
//
function findByMovieId(id,callback){
    var sql = 'select * from comment where m_id=? order by commentTime desc';
    dbConn.conn().query(sql,[id],function (err, results) {
        if(err){
            console.log('comment findAll is err at ' + err);
        }
        callback(results);
    })
};
//
//
//function findById(id,callback){
//    var sql = 'select * from movies where id =?';
//    dbConn.conn().query(sql,[id], function (err,results) {
//        if(err){
//            console.log('findById is err at '+ err);
//        }
//        callback(results);
//    })
//};
//
//
//function updateMovie(obj,callback){
//    obj.updateTime = moment(Date.now()).format('YYYY-MM-DD kk:mm:ss');
//    var sql = 'update movies set title =?,country=?,language=?,year=?,flash=?,' +
//        'poster=?,createTime=?,updateTime=?,price=?,doctor=?,summary=? where id=?';
//    dbConn.conn().query(sql,[obj.title,obj.country,obj.language,obj.year,obj.flash,obj.poster,obj.createTime,obj.updateTime, obj.price,obj.doctor,obj.summary,obj.id],
//        function (err,results) {
//            if(err){
//                console.log("update is err at " + err);
//            }
//            callback(results);
//        })
//};
//
//
//function deleteById(id,callback){
//    var sql = 'delete from movies where id = ?';
//    dbConn.conn().query(sql,[id], function (err, result) {
//        if(err)
//            console.log("delete err at " + err);
//        callback(result);
//    })
//};

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
    //findById:findById,
    //updateMovie:updateMovie,
    //deleteById:deleteById
} ;