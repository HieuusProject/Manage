const Products = require("../../model/productsmodel.js");
module.exports.index = async (req, res) => {
    const find = {
        status: "active"
    }
    const products = await Products.find(find).sort({position: "desc"})
    products.forEach(item => {
        item.priceNew = (item.price*(100 - item.discountPercentage)/100).toFixed(0);
        return item;
    })
    res.render("client/pages/products/index", {
        pageTitle: "Products",
        products: products
    });
} 
module.exports.detail = async (req, res) => {
    try{
        const find = {
            deleted: false,
            slug: req.params.slug,
            status: "active"
        };

        const productIO = await Products.findOne(find)
        //console.log(productIO)
        res.render("client/pages/products/detail",{
            pageTitle: productIO.title,
            product: productIO
        }); 
    } catch{
        res.redirect('/products');
    }
    // res.render("client/pages/products/detail",{
    //     pageTitle: "hi"
    // }); 
}