const express = require("express");
const router = express();
const adminHeaderCTRL = require("../../ controller/admin/header.controller");

router.post("/header", adminHeaderCTRL.addHeaderUser);
router.get("/header", adminHeaderCTRL.listHeader);
router.put("/header", adminHeaderCTRL.updateHeader);
router.get("/header/:id", adminHeaderCTRL.getByIdHeaderUser);
router.delete("/header", adminHeaderCTRL.deleteHeader);

module.exports = router;
