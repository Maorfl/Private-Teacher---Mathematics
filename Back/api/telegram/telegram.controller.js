const telegramService = require("../telegram/telegram.service");

async function sendMessage(req, res) {
    if (req.body.isToUpdate) await telegramService.sendMessageToMicha(req.body);
    else await telegramService.contactMessage(req.body);
    res.status(200).send("הודעה נשלחה בהצלחה");
}

async function messageHandler(req, method) {
    const { body } = req;
    if (body) {
        const messageObj = body.message;
        await telegramService.handleMessage(messageObj);
    }
    return;
}

module.exports = { sendMessage, messageHandler };
