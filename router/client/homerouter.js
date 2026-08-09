const express = require("express");
const router = express.Router();//ham cua express, tao ra cac router 
const controller = require("../../controllers/client/homecontrol.js");
router.get('/',controller.index);
module.exports = router;//xuat ham router ra