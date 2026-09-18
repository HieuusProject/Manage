module.exports.createAcPost = (req,res,next) => {
    // console.log("righjt")
    if(!req.body.fullname){
        req.flash("error","Catch Again !");
        res.redirect("/admin/account");
        return;
    }
    if(!req.body.email){
        req.flash("error","Catch Again !");
        res.redirect("/admin/account");
        return;
    }
    if(!req.body.password){
        req.flash("error","Catch Again !");
        res.redirect("/admin/account");
        return;
    }
    next();
}
