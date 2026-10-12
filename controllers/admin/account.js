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

module.exports.changePatch = async (req,res) => {
    const change = req.params.status;
    const id = req.params.id;
    await Account.updateOne({ _id: id },{status: change})
    res.redirect("/admin/account")
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

module.exports.edit = async (req,res) => {
    let find = {
        _id: req.params.id,
        deleted: false
    }

    try {
        const data = await Account.findOne(find);
        const roles = await Role.find({
            deleted: false
        })
        res.render("admin/pages/account/editted",{
            pageTitle: "Account Editting",
            data: data,
            roles: roles
        })
    } catch(error){
        res.redirect("/admin/account")
    }
}

module.exports.editPatch = async (req,res) => {
    // console.log(req.body)
    const id = req.params.id;
    const emailExist = await Account.findOne({
        _id:{ $ne: id},
        email: req.body.email,
        deleted: false
    })
    if(emailExist){
        res.redirect("/admin/account")
        console.log("esixSs")
    } else{
        if(req.body.password){
            req.body.password = mdf(req.body.password);
        } else{
            delete req.body.password;
        }
        await Account.updateOne({ _id: id },req.body)
        res.redirect("/admin/account");
    }
}
