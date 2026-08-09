const Products = require("../../model/productsmodel.js");
const filterStatusHelp = require("../../helpers/filterStatus.js");
const searchHelp = require("../../helpers/search.js");
const panihelp = require("../../helpers/pani.js");
module.exports.index = async (req, res) => {
    const filterStatuss = filterStatusHelp(req.query);

    let find = {
        deleted: false,
    };
    //console.log(req.query.status);
    if(req.query.status){
        find.status = req.query.status;
    }

    //SEARCH
    const searchHelper = searchHelp(req.query);
    if(searchHelper.regex){
        find.title = searchHelper.regex;
    }

    //pages
    const countproducts = await Products.countDocuments(find);
    let objectpani = panihelp(
        {
            currentpages: 1,
            limititem: 9
        },  
        req.query,
        countproducts
    );
    //TOTAL
    const products = await Products.find(find).sort({position: "desc"}).limit(objectpani.limititem).skip(objectpani.skip);
    res.render("admin/pages/products/index",{
        pageTitle: "Products",
        products: products,
        filterStatuss: filterStatuss,
        keyword: searchHelper.keyword,
        objectpani: objectpani
    });
    //sort({position: "desc"})
}
//Get
module.exports.changeStatus = async (req, res) => {
    //console.log(req.params);
    //params laf bien chua router dong
    const status = req.params.status;
    const id = req.params.id;
    await Products.updateOne({ _id: id}, {status: status });
    req.flash("success","u'Re DONE")
    res.redirect(req.headers.referer || '/admin/products');
};
//delete
module.exports.deleteitem = async (req, res) => {
    const id = req.params.id;
    await Products.deleteOne({_id: id})
    // await Products.updateOne({ _id: id}, {
    //     deleted: true ,
    //     datedelete: new Date()
    // });
    res.redirect(req.headers.referer || '/admin/products');
};
// res.send(`${status} - ${id}`);
module.exports.changeMulti = async (req, res) => {
    // console.log(req.body);
    const type = req.body.type 
    const ids = req.body.ids.split(", ");
    //console.log(ids)
    switch(type){
        case "active":
            await Products.updateMany({ _id: {$in: ids} }, {status:"active"});
            break;
        case "inactive":
            await Products.updateMany({ _id: {$in: ids} }, {status:"inactive"});
            break;
        case "delete":
            await Products.updateMany({ _id: {$in: ids} }, {deleted: true}, {datedelete: new Date()});
            break;
        case "position":
            // console.log(ids);
            for(item of ids){
                let [id,position] = item.split("-");
                console.log(id);
                console.log(position);
                position = parseInt(position);
                await Products.updateOne({ _id: id}, {position: position })
            }
            break;
        default:
            break;  
    }
    res.redirect(req.headers.referer || '/admin/products');
};
// res.send(`${status} - ${id}`);
module.exports.create = (req,res) => {
    res.render("admin/pages/products/create",{
        pageTitle: "New"
    });
}
module.exports.createPost = async (req,res) => {
    //console.log(req.body)
    //console.log(req.file)
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    if(req.body.position == ""){
        const countproducts = await Products.countDocuments({})
        req.body.position = countproducts + 1;
    } else{
        req.body.position = parseInt(req.body.position);
    }
    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }
    const product = new Products(req.body);
    await product.save();

    res.redirect('/admin/products');
}

module.exports.editer = async (req,res) => {
    // console.log(req.params.id)
    try{
        const find = {
            deleted: false,
            _id: req.params.id
        };

        const productIO = await Products.findOne(find)
        //console.log(productIO)
        res.render("admin/pages/products/edit.pug",{
            pageTitle: "Fixeing",
            product: productIO
        }); 
    } catch{
        res.redirect('/admin/products');
    }
    // res.redirect('/admin/products');
}
module.exports.patchEdit = async (req,res) => {
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    req.body.position = parseInt(req.body.position);
    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }
    try{
        await Products.updateOne({
            _id: req.params.id
        }, req.body)
    } catch(err){
        res.redirect('/admin/products');
    }
    res.redirect('/admin/products');
}


module.exports.detail = async (req,res) => {
    // console.log(req.params.id)
    try{
        const find = {
            deleted: false,
            _id: req.params.id
        };

        const productDE = await Products.findOne(find)
        //console.log(productIO)
        res.render("admin/pages/products/detail.pug",{
            pageTitle: productDE.title,
            product: productDE
        }); 
    } catch{
        res.redirect('/admin/products');
    }
    // res.redirect('/admin/products');
}
