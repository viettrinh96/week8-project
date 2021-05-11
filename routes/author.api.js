const express = require("express");
const router = express.Router();
const authController = require("../controllers/authorController");
const { body } = require("express-validator");
const validators = require("../middleware/validators");

router.post(
  "/login",
  validators.validate([
    body("email", "invalid email").exists().isEmail(),
    body("password", "invalid password").exists().notEmpty(),
  ]),
  authController.loginWithEmail
);

module.exports = router;
