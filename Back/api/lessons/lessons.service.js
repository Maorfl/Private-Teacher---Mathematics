const Lesson = require("../../models/Lesson");
const User = require("../../models/User");

async function getLessons(datetime = "") {
    try {
        let lessons;
        if (datetime) {
            const startDate = new Date(Date.parse(datetime));
            const startString = startDate.toISOString().split("T")[0];
            lessons = await Lesson.find({
                start: { $regex: new RegExp(startString, "i") },
            })
                .select("-__v")
                .select("-_id");
        } else {
            lessons = await Lesson.find({}).select("-__v").select("-_id");
        }
        return lessons;
    } catch (err) {
        throw err;
    }
}

async function addLesson(lesson) {
    try {
        const newLesson = new Lesson(lesson);

        return await newLesson.save();
    } catch (err) {
        throw err;
    }
}

async function updateLesson(lesson) {
    try {
        await Lesson.findOneAndUpdate({ id: lesson.id }, lesson, { new: true });
    } catch (err) {
        throw err;
    }
}

async function deleteLesson(id) {
    try {
        await Lesson.findOneAndDelete({ id: id });

        return "Lesson deleted";
    } catch (err) {
        throw err;
    }
}

async function getUserByFullname(fullname) {
    try {
        const user = await User.findOne({ fullname: { $regex: fullname, $options: "i" } });

        return user;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getLessons,
    addLesson,
    updateLesson,
    deleteLesson,
    getUserByFullname,
};
