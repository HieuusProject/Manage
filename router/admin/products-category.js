const express = require("express");
const multer  = require('multer')
const router = express.Router();//ham cua express, tao ra cac router const uploadCloudinary = require('../../middleware/admin/uploadcloudi.js')
const uploadCloudinary = require('../../middleware/admin/uploadcloudi.js')
const validate = require("../../validates/admin/products-category-vali.js");
const controller = require("../../controllers/admin/category.js");
const upload = multer()
router.get('/',controller.category);
router.get('/create',controller.createCategory);
router.post(
    '/create',
    upload.single('thumbnail'),
    uploadCloudinary.upload,
    // validate.createPost,
    controller.createCatePost
);
router.get('/edit/:id',controller.fixxing);
router.patch(
    '/edit/:id',
    upload.single('thumbnail'),
    uploadCloudinary.upload,
    // validate.createPost,
    controller.editPatch
)
module.exports = router;//xuat ham router ra