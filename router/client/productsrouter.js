const express = require("express");
const router = express.Router();//ham cua express, tao ra cac router . 
const controller = require("../../controllers/client/products-control.js");
router.get('/',controller.index);
router.get('/:slug',controller.detail);
module.exports = router;//xuat ham router ra