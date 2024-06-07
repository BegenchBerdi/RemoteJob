const express = require("express");
const router = express();
const adminCategoryCTRL = require("../../ controller/admin/category.controller");

router.post("/category", adminCategoryCTRL.addCategory);
router.get("/categories", adminCategoryCTRL.listCategory);
router.put("/category", adminCategoryCTRL.updateCategory);
router.get("/category/:id", adminCategoryCTRL.getByIdCategoryUser);
router.delete("/category", adminCategoryCTRL.deleteCategory);

module.exports = router;
