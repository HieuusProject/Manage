module.exports.createPost = (req,res,next) => {
    // console.log("righjt")
    if(!req.body.title){
        req.flash("error","Catch Again !");
        res.redirect("/admin/products/create");
        return;
    }
    next();
    // console.log("the ress")
}
