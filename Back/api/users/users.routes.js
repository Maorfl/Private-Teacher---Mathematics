const express = require("express");
const { getUserByPhone, signUp, login } = require("./users.controller");

const router = express.Router();

router.get("/", getUserByPhone);
router.post("/signup", signUp);
router.post("/login", login);

module.exports = router;
