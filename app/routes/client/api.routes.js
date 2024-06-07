const express = require("express");
const router = express();
const apiCTRL = require("../../ controller/client/api.controller");

router.get("/product", apiCTRL.ListProductClient);
router.get("/product/:id", apiCTRL.getByIdProduct);

module.exports = router;
