/**
 * Created by Administrator on 2017/2/14.
 */

exports.isGrunt = function (req,res) {
    if(req.session.user.role>5)
        return true;
    else{
        res.send("你没有足够的权限来访问...");
    }
}
