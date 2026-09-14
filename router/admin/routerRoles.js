const express = require('express');
const router = express.Router();
const controller = require("../../controllers/admin/roles");
router.get("/",controller.index);
router.get("/create",controller.create);
router.post("/create",controller.createPost)
router.get("/edit/:id",controller.Fix)
router.patch("/edit/:id",controller.fixPatch)
router.get("/permissions",controller.permissionChoose)
router.patch("/permissions",controller.patchChossiePermission)
module.exports = router