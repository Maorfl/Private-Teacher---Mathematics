const mongoose = require("mongoose");
const axiosService = require("./axios/axios.service");
const userService = require("../users/users.service");

async function sendMessage(messageObj, messageText) {
    try {
        return await axiosService.getAxiosInstance().get("sendMessage", {
            chat_id: messageObj.chat.id,
            text: messageText,
            parse_mode: "html",
        });
    } catch (error) {
        throw error;
    }
}
async function sendMessageToMicha(text) {
    try {
        return await axiosService.getAxiosInstance().get("sendMessage", {
            chat_id: 375866726,
            text,
            parse_mode: "html",
        });
    } catch (error) {
        throw error;
    }
}

async function sendMessageToStudent(messageDetails) {
    try {
        const user = await userService.getUserByPhone(messageDetails.phone);
        if (user.chatId) {
            return await axiosService.getAxiosInstance().get("sendMessage", {
                chat_id: user.chatId,
                text: `<b>נקבע שיעור חדש!</b>\n<b>נושא:</b> ${messageDetails.title}\n<b>תאריך ושעה:</b> ${messageDetails.lesson.start}\n<b>מיקום:</b> ${messageDetails.lesson.location}\n\nליצירת קשר: 0504656736`,
                parse_mode: "html",
            });
        }

        return;
    } catch (error) {
        throw error;
    }
}

async function contactMessage(messageDetails) {
    try {
        return await axiosService.getAxiosInstance().get("sendMessage", {
            chat_id: 375866726,
            text: `<b>קיבלת הודעה חדשה - יצירת קשר</b>\n\n<b>שם מלא:</b> ${messageDetails.fullname}\n<b>טלפון:</b> ${messageDetails.phone}\n<b>אימייל:</b> ${messageDetails.email}\n<b>הודעה:</b> ${messageDetails.message}`,
            parse_mode: "html",
        });
    } catch (error) {
        throw error;
    }
}

async function handleMessage(messageObj) {
    const regex = /^(?:\+972|972|0)?5[023456789]\d{7}$/;
    const messageText = messageObj.text || "";
    if (messageText.charAt(0) === "/") {
        const command = messageText.substr(1);
        switch (command) {
            case "start":
                return await sendMessage(messageObj, "אנא רישמו את מספר הטלפון שלכם");
            case "biran":
                return await sendMessage(messageObj, "בירן!");
            default:
                return;
        }
    } else {
        if (regex.test(messageText)) {
            const user = await userService.getUserByPhone(messageText);

            if (!user) {
                return await sendMessage(messageObj, "מספר הטלפון <b><u>לא</u></b> קיים במערכת");
            } else if (user.chatId) {
                return await sendMessage(messageObj, "<b>מספר טלפון זה כבר רשום במערכת!</b>");
            } else {
                const userId = new mongoose.Types.ObjectId(user._id);
                await userService.updateUser(userId, messageObj.chat.id);
                return await sendMessage(
                    messageObj,
                    "<b>תודה רבה לך על הרשמתך!</b>\nמעכשיו תקבלו פה הודעות התרעה ותזכורת לגבי השיעור שקבעתם"
                );
            }
        } else return;
    }
}

module.exports = {
    handleMessage,
    contactMessage,
    sendMessage,
    sendMessageToMicha,
    sendMessageToStudent,
};
