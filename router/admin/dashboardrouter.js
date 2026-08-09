const express = require("express");
const router = express.Router();//ham cua express, tao ra cac router 
const controller = require("../../controllers/admin/dashboardcontrol.js");
router.get('/',controller.dashboard);
module.exports = router;//xuat ham router ra