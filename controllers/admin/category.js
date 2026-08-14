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