const express = require("express");
const router = express();
const authController = require("../ controller/auth.controller");

router.post("/signup-email", authController.signUpEmail);
router.post("/confirm-email", authController.confirmEmail);
router.post("/signin-email", authController.signInEmail);

router.post("/forgot-password-email", authController.forgotPasswordEmail);
router.post("/change-password-email", authController.changePasswordEmail);

module.exports = router;
