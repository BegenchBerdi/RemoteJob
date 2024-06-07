const express = require("express");
const router = express();
const adminProductCTRL = require("../../ controller/admin/product.controller");

router.post("/product", adminProductCTRL.addProduct);
router.get("/product", adminProductCTRL.lisProduct);
router.put("/product", adminProductCTRL.updateProduct);
router.get("/product/:id", adminProductCTRL.getByIdProduct);
router.delete("/product", adminProductCTRL.deleteProduct);

module.exports = router;
