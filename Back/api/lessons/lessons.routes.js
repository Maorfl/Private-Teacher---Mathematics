const express = require("express");
const {
    getLessons,
    addLesson,
    updateLesson,
    deleteLesson,
    getUserByFullname,
    getUpcomingLessons,
} = require("./lessons.controller");

const router = express.Router();

router.get("/", getLessons);
router.get("/today-on", getUpcomingLessons);
router.post("/", addLesson);
router.put("/:id", updateLesson);
router.delete("/:id", deleteLesson);
router.get("/:fullname", getUserByFullname);

module.exports = router;
