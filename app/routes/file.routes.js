const express = require("express");
const router = express();
const fileController = require("../ controller/file.controller");

router.post("/image-upload", fileController.imageUpload);
router.post("/file-upload", fileController.fileUpload);

module.exports = router;
