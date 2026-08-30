const ProductsCategory = require("../../model/modelcategory.js");

module.exports.category = async (req,res) => {
    let find = {
        deleted: false,
    };
    const records = await ProductsCategory.find(find);
    res.render("admin/pages/product-category/index", {
        pageTitle: "CATEGORY",
        records: records
    });
}
module.exports.createCategory = async (req,res) => {
    res.render("admin/pages/product-category/create", {
        pageTitle: "CATEGORY"
    });
}
module.exports.createCatePost = async (req,res) => {
    if(req.body.position == ""){
        const countproducts = await ProductsCategory.countDocuments({})
        req.body.position = countproducts + 1;
    } else{
        req.body.position = parseInt(req.body.position);
    }
    const record = new ProductsCategory(req.body);
    await record.save();
    res.redirect('/admin/products-category');
}
module.exports.fixxing = async (req,res) => {
    try{
        const id = req.params.id;
        const findOne = await ProductsCategory.findOne(
            {_id: id}
        );
        const records = await ProductsCategory.find({
            deleted: false
        });
        // const recording = createTreehelper.tree(records);

        res.render("admin/pages/product-category/editing",{
            pageTitle: "Fixxing",
            product: findOne
            // recording: records
        })
    } catch{
        res.redirect('/admin/products-category')
        console.log("failed")
    }

}
//mixins
// mixin select-tree(items, level = 1, parent_id = "")
//     each item in items
//     - const prefix = Array(level + 1).join(" -- ")
//     option(
//         value=item.id
//         selected=(item.id == parent_id ? true : false)
//     ) #{/admin}#{item.title}
//         if item.children && item.children.length > @
//             +select-tree(item.children, level + 1, parent_id)
module.exports.editPatch = async (req,res) => {
    const id = req.params.id;
    req.body.position = parseInt(req.body.position);
    try{
        await ProductsCategory.updateOne({ _id:id} , req.body)
        console.log("successFull Updating")
    } catch{
        console.log("Failel Updating")
    }
    res.redirect('/admin/products-category');
};  
