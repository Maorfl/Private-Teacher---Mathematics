const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    id: {type:Number, required:true, unique:true},
    start: {type:String, required:true},
    end: {type:String, required:true},
    title: {type:String, required:true},
    calendarId: {type:String, required:false},
    student: {type:[String], required:false},
    location: {type:String, required:false},
})

const Lesson = mongoose.model('Lesson',lessonSchema);

module.exports = Lesson;