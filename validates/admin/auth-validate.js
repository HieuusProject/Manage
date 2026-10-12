module.exports.login= (req,res,next) => {
    if(!req.body.email){
        req.flash("error","Catch Again !");
        res.redirect("/admin/auth/login");
        return;
    }
    if(!req.body.password){
        req.flash("error","Catch Again !");
        res.redirect("/admin/auth/login");
        return;
    }
    next();
}
