const express = require("express");
const router = express.Router();

// import controller
const { isAuth } = require("../controllers/auth");
const { read } = require("../controllers/user");

router.get("/user", isAuth, read);

module.exports = router;
