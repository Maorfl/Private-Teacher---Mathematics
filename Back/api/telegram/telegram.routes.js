const express = require("express");
const { sendMessage, sendReminder } = require("./telegram.controller");

const router = express.Router();

router.post("/send-message", sendMessage);
router.post("/send-reminder", sendReminder);

module.exports = router;
