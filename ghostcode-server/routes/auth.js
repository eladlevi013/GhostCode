const {
  userSignupValidator,
  userSigninValidator,
} = require("../validators/auth");
const { runValidation } = require("../validators");
const express = require("express");
const router = express.Router();

// import controllers
const { login, register } = require("../controllers/auth");

router.post("/register", userSignupValidator, runValidation, register);
router.post("/login", userSigninValidator, runValidation, login);
module.exports = router;
