const Account = require('../../model/account');
const mdf = require('md5');
module.exports.login = async (req,res) => {
    res.render("admin/pages/auth/login",{
        pageTitle: "Account Created",
    })
}
module.exports.loginPost = async (req,res) => {
    const email = req.body.email;
    const pass = req.body.password;
    const userEx = await Account.findOne({
        email: email,
        deleted:false
    })
    if(!userEx){
        res.redirect("/admin/auth/login")
        console.log("undefined")
    } else{
        if((mdf(pass) != userEx.password) || (userEx.status == "inactive")){
            res.redirect("/admin/auth/login")
            console.log("Cannot come in");
        } else{
            res.cookie("token",userEx.token);
            res.redirect("/admin/dashboard");
        }
    }
}
module.exports.logout = async (req,res) => {
    res.clearCookie("token")
    res.redirect("/admin/auth/login")
}