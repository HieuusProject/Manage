const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const productsCategorysShe = new mongoose.Schema(
    {
        title: String,
        parent_id: {
            type: String,
            default: ""
        },
        description: String,
        thumbnail: String,
        status: String,
        position: Number,
        slug: {
            type: String,
            slug: "title",
            unique: true
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
const ProductsCategory = mongoose.model("ProductsCategory",productsCategorysShe,"ProductsCategory");
module.exports = ProductsCategory;