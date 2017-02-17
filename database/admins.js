/**
 * Created by Administrator on 2017/2/9.
 */


var dbConn = require('./dbConfig');
var moment = require('moment');
function add(obj,callback){
    obj.createTime= obj.updateTime = moment(Date.now()).format('YYYY-MM-DD kk:mm:ss');
    //console.log(JSON.stringify(obj));
    var sql = 'INSERT INTO movies(title,country,language,year,flash,poster,createTime,updateTime,price,doctor,summary,categoryId) VALUE(?,?,?,?,?,?,?,?,?,?,?,?)';
    dbConn.conn().query(sql,[obj.title,obj.country,obj.language,obj.year,obj.flash,obj.poster,obj.createTime,obj.updateTime,obj.price,obj.doctor,obj.summary,obj.categoryId], function (err, results) {
        if(err){
            console.log("add is err at " + err);
        }
        callback(results);
    })
};



function findAllMovies(callback){
    var sql = 'select m.* from movies as m ';
    dbConn.conn().query(sql,function (err, results) {
        if(err){
            console.log('findAll is err at ' + err);
        }
        callback(results);
    })
};

function findAll(page,categoryId,callback){
    page = (page-1)*10;
    if(categoryId == 0)
        var sql = 'select m.*,c.name from movies as m LEFT JOIN categorys AS c on c.`id` = m.`categoryId` ORDER BY m.categoryId limit ?, 10 ';
    else
        var sql = 'select m.*,c.name from movies as m LEFT JOIN categorys AS c on c.`id` = m.`categoryId` where m.categoryId ="'+categoryId+'" ORDER BY m.categoryId limit ?, 10 ';
    dbConn.conn().query(sql,[page],function (err, results) {
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
        'poster=?,createTime=?,updateTime=?,price=?,doctor=?,summary=?,categoryId=? where id=?';
    dbConn.conn().query(sql,[obj.title,obj.country,obj.language,obj.year,obj.flash,obj.poster,obj.createTime,obj.updateTime, obj.price,obj.doctor,obj.summary,obj.categoryId,obj.id],
        function (err,results) {
            if(err){
                console.log("update is err at " + err);
            }
            callback(results);
        })
};


function increaseByPV(id,cb){
    var sql = "update movies set pv = pv+1 where id = ?";
    dbConn.conn().query(sql,[id], function (err,result) {
        if(err){
            console.log("increaseByPV has err at " + err);
        }

        cb(result);
    })
}


function deleteById(id,callback){
    var sql = 'delete from movies where id = ?';
    dbConn.conn().query(sql,[id], function (err, result) {
        if(err)
            console.log("delete err at " + err);
        callback(result);
    })
};

function totalCount(categoryId,cb){
    if(categoryId == 0)
        var sql = 'select count(*) as counts from movies';
    else
        var sql = 'select count(*) as counts from movies where categoryId="'+categoryId+'"';
    dbConn.conn().query(sql, function (err, counts) {
        if(err){
            console.log('totalCount has err at '+ err);
        }
        cb(counts[0].counts);
    })
};



module.exports ={
    add:add,
    findAll:findAll,
    findById:findById,
    updateMovie:updateMovie,
    deleteById:deleteById,
    findByCategoryId:findByCategoryId,
    increaseByPV:increaseByPV,
    totalCount:totalCount,
    findAllMovies:findAllMovies
} ;