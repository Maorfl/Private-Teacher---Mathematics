const telegramService = require("../telegram/telegram.service");

async function sendMessage(req, res) {
    if (req.body.isToUpdate) await telegramService.sendMessageToMicha(req.body);
    else await telegramService.contactMessage(req.body);
    res.status(200).send("הודעה נשלחה בהצלחה");
}

async function sendReminder(req, res) {
    try {
        await telegramService.sendReminder(req.body.student, req.body.title, req.body.time);

        res.status(200).send("תזכורת נשלחה בהצלחה");
    } catch (error) {
        res.status(401).send(error);
    }
}

async function messageHandler(req, method) {
    const { body } = req;
    if (body) {
        const messageObj = body.message;
        await telegramService.handleMessage(messageObj);
    }
    return;
}

module.exports = { sendMessage, messageHandler, sendReminder };
