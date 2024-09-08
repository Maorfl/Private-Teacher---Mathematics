const User = require("../../models/User");
require("dotenv").config();

async function getUserByPhone(phone) {
    try {
        const user = await User.findOne({ phone: { $regex: phone, $options: "i" } })
            .select("-_id")
            .select("-__v");
        if (!user) throw new Error("טלפון לא קיים במערכת!");

        return user;
    } catch (error) {
        throw Error("משתמש לא קיים");
    }
}

async function signUp(fullname, phone, isAdmin) {
    try {
        const existingUser = await User.findOne({ phone: { $regex: phone, $options: "i" } })
            .select("-_id")
            .select("-__v");

        if (existingUser) {
            throw new Error("משתמש כבר קיים");
        }

        const newUser = new User({
            phone,
            fullname,
            isAdmin,
        });

        return await newUser.save();
    } catch (error) {
        throw error;
    }
}

async function login(phone) {
    try {
        const user = await getUserByPhone(phone);

        return user;
    } catch (error) {
        throw error;
    }
}

async function updateUser(userId, chatId) {
    try {
        const user = await User.findById(userId).select("-_id").select("-__v");
        if (!user) return;

        user.chatId = chatId;

        return await user.save();
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getUserByPhone,
    signUp,
    login,
    updateUser,
};
