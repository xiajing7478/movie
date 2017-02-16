/**
 * Created by Administrator on 2017/2/14.
 */



exports.isLogin = function isLogin(req,res){
    console.log(req.session.user);
    if((req.session.user)){
        var username = req.session.user.username;
        return true;
    }else{
        return res.redirect("/users");
    }
};

exports.isGrunt = function (req,res) {
    if(req.session.user.role>5)
        return true;
    else{
        res.send("你没有足够的权限来访问...");
    }
}
