const express = require("express");
const multer  = require('multer')
const router = express.Router();
const uploadCloudinary = require('../../middleware/admin/uploadcloudi.js')
const validate = require("../../validates/admin/auth-validate.js");
const controller = require("../../controllers/admin/auth.js");
const upload = multer()
router.get('/login',controller.login);
router.post(
    '/login',
    validate.login,
    controller.loginPost
);
router.get('/logout',controller.logout);
module.exports = router;//xuat ham router ra