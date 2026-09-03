const Role = require('../../model/roleModel.js')
module.exports.index =async (req,res) => {
    let perm = {
        deleted: false
    };
    const records = await Role.find(perm)
    res.render("admin/pages/roles/index",{
        pageTitle: "Permission",
        records: records
    });
}
module.exports.create =async (req,res) => {
    res.render("admin/pages/roles/create",{
        pageTitle: "Permission Creating",
    });
}
module.exports.createPost = async (req,res) => {
    const records = new Role(req.body);
    await records.save();
    res.redirect("/admin/roles");
}
module.exports.Fix = async (req,res) => {
    const id = req.params.id;
    try{
        let find = {
            _id: id,
            deleted: false
        };
        const record = await Role.findOne(find)
        res.render("admin/pages/roles/edit",{
            pageTitle: "Mending",
            record: record
        });    
    }
    catch{
        res.redirect("/admin/roles")
    }
}
module.exports.fixPatch = async (req,res) => {
    const id = req.params.id;
    await Role.updateOne({ _id:id},req.body);
    res.redirect("/admin/roles")
}
module.exports.permissionChoose = async (req,res) => {
    let find = {
        deleted: false
    }
    const records = await Role.find(find);
    res.render("admin/pages/roles/permis",{
        pageTitle: "Permission Choosing",
        records: records
    });
}