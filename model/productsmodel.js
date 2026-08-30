const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productssche = new mongoose.Schema(
    {
        title: String,
        Pcate_id: {
            type: String,
            default: ""
        },
        description: String,
        price: Number,
        discountPercentage: Number,
        stock: Number,
        thumbnail: String,
        status: String,
        position: Number,
        slug: {
            type: String,
            slug: "title",
        },
        deleted: {
            type: Boolean,
            default: false
        },
        datedelete: Date
    },
    {
        timestamp: true
    }
)
const Products = mongoose.model("products",productssche,"ProductsManagement");
module.exports = Products;