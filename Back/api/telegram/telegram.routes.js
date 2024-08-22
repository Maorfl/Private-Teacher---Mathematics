const express = require("express");
const { sendMessage } = require("./telegram.controller");

const router = express.Router();

router.post("/send-message", sendMessage);

module.exports = router;
