const express = require("express");
const multer  = require('multer')
const router = express.Router();
const uploadCloudinary = require('../../middleware/admin/uploadcloudi.js')
const validate = require("../../validates/admin/account-validate.js");
const controller = require("../../controllers/admin/account.js");
const upload = multer()
router.get('/',controller.index);
router.get('/create',controller.create);
router.post('/create',
    upload.single("avatar"),
    uploadCloudinary.upload,
    validate.createAcPost,
    controller.createPost
);
// router.post('/create',controller.createPost);
router.get('/edit/:id',controller.edit);
router.patch('/edit/:id',
    upload.single("avatar"),
    uploadCloudinary.upload,
    validate.editPatch,
    controller.editPatch
);
router.patch('/change-status/:status/:id',controller.changePatch);
module.exports = router;//xuat ham router ra