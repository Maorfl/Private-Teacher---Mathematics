const express = require('express');
const {getLessons,addLesson,updateLesson,deleteLesson} = require('./lessons.controller');

const router = express.Router();

router.get('/', getLessons);
router.post('/', addLesson);
router.put('/:id', updateLesson);
router.delete('/:id', deleteLesson);


module.exports = router;