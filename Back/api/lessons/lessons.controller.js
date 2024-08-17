const lessonsService = require("./lessons.service");
const telegramService = require("../telegram/telegram.service");

async function getLessons(req, res) {
    try {
        let lessons;
        const { datetime } = req.query;
        if (req.query.datetime) lessons = await lessonsService.getLessons(datetime.substring(0, 10));
        else lessons = await lessonsService.getLessons();

        res.json(lessons);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function addLesson(req, res) {
    try {
        const addedLesson = await lessonsService.addLesson(req.body);

        res.json(addedLesson);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function updateLesson(req, res) {
    try {
        const lesson = req.body.lesson;
        const phone = req.body.phone;
        const fullname = req.body.lesson.student[0];
        const isToUpdate = req.body.isToUpdate;
        const title = req.body.lesson.title.replace(`${fullname} - `, "");
        const messageDetails = {
            lesson,
            phone,
            fullname,
            isToUpdate,
            title,
            message: `<b>נקבע שיעור חדש!</b>\n\n<b>שם התלמיד:</b> ${fullname} \n<b>נושא שיעור:</b> ${title} \n<b>תאריך ושעה:</b> ${lesson.start} \n<b>מקום:</b> ${lesson.location} \n<b>מספר טלפון:</b> ${phone}`,
        };

        await lessonsService.updateLesson(lesson);

        if (isToUpdate) {
            await telegramService.sendMessageToMicha(messageDetails.message);
            await telegramService.sendMessageToStudent(messageDetails);
        }

        res.json("שיעור נוסף בהצלחה");
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function deleteLesson(req, res) {
    try {
        const message = await lessonsService.deleteLesson(req.params.id);

        res.json(message);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    getLessons,
    addLesson,
    updateLesson,
    deleteLesson,
};
