const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    phone: { type: String, required: true, unique: true },
    fullname: { type: String, required: false },
    isAdmin: { type: Boolean, default: false },
    chatId: { type: Number, required: false },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
