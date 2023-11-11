const express = require("express");
const router = express.Router();

// import controller
const { isAuth } = require("../controllers/auth");
const { read, readLevels, writeLevel } = require("../controllers/user");

router.get("/user", isAuth, read);
router.get("/user/levels", isAuth, readLevels);
router.post("/user/levels/submit", isAuth, writeLevel);

module.exports = router;
