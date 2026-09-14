module.exports.createCatePost = (req,res,next) => {
    // console.log("righjt")
    if(!req.body.title){
        req.flash("error","Catch Again !");
        res.redirect("/admin/products-category/create");
        return;
    }
    next();
}
