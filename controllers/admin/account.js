const Account = require('../../model/account');
const Role = require('../../model/roleModel');
const mdf = require('md5');
module.exports.index = async (req,res) => {
        // const role = await Role.find({
        //     deleted: false
        // });
        // console.log(role)
    let find = {
        deleted: false,
    };
    const records = await Account.find(find).select("-password -token");
    for(const record of records){
        const role = await Role.findOne({
            _id: record.role_id,
            deleted: false
        });
        record.role = role;
        // console.log(record)
    }
    res.render("admin/pages/account/index",{
        pageTitle: "Account Remaster",
        records: records,
    })
    
}

module.exports.create = async (req,res) => {
    let find = {
        deleted: false,
    };
    const roles = await Role.find(find);
    res.render("admin/pages/account/create",{
        pageTitle: "Account Created",
        roles: roles
    })
}


module.exports.createPost = async (req,res) => {
    const emailExist = await Account.findOne({
        email: req.body.email,
        deleted: false
    })
    if(emailExist){
        res.redirect("/admin/account")
    } else{
        req.body.password = mdf(req.body.password);
        const records = new Account(req.body);
        await records.save();
        res.redirect("/admin/account");        
    }
}