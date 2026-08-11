const express = require("express");
const multer  = require('multer')
const uploadCloudinary = require('../../middleware/admin/uploadcloudi.js')
// const storageMulter = require("../../helpers/multer.js");
const router = express.Router();//ham cua express, tao ra cac router 
//cloudinary:
const upload = multer()
const controller = require("../../controllers/admin/productcontrol.js");
const validate = require("../../validates/admin/validate-products.js");
router.get('/',controller.index);
router.patch('/change-status/:status/:id',controller.changeStatus);
router.post('/change-multi',controller.changeMulti);
router.delete("/delete/:id",controller.deleteitem);
router.get('/create',controller.create);
router.post('/create',
    upload.single('thumbnail'),
    uploadCloudinary.upload,
    validate.createPost,
    controller.createPost
);
router.get('/edit/:id',controller.editer);
router.patch('/edit/:id',
    upload.single('thumbnail'),
    validate.createPost,
    controller.patchEdit
);
router.get('/detail/:id',controller.detail);
module.exports = router;