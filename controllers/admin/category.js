const ProductsCategory = require("../../model/categoryModel.js");
const createHelperTree = require("../../helpers/createTree.js");
// logic chung
module.exports.category = async (req,res) => {
    let find = {
        deleted: false,
    };
    const recording =  await ProductsCategory.find(find);
    const newRecording = createHelperTree.tree(recording)
    const records = await ProductsCategory.find(find);
    res.render("admin/pages/products-category/index", {
        pageTitle: "CATEGORY",
        records: newRecording
    });
}

//logic trang create
module.exports.createCategory = async (req,res) => {
    let find = {
        deleted: false
    };
    //tree function
    function createTree(arr, parentId = ""){
        const tree = [];
        arr.forEach((item) => {
            if (item.parent_id === parentId) {
                const newItem = item;
                const children = createTree(arr, item.id)
                if (children.length > 0) {
                    newItem.children = children;
                }
                tree.push(newItem);
            }
        });
        return tree;
    }
    const recording =  await ProductsCategory.find(find);
    const newRecording = createTree(recording)
    // console.log(newRecording)
    // console.log(recording)
    res.render("admin/pages/products-category/create", {
        pageTitle: "CATEGORY",
        records: newRecording
    });
}

//logic nhan tu trang create
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