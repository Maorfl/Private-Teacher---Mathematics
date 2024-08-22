const User = require("../../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT;

async function getUserByEmail(email) {
    try {
        const user = await User.findOne({ email: { $regex: email, $options: "i" } });
        if (!user) throw new Error("אימייל שגוי");

        return user;
    } catch (error) {
        throw Error("משתמש לא קיים");
    }
}

async function getUserByPhone(phone) {
    try {
        const user = await User.findOne({ phone: { $regex: phone, $options: "i" } });

        return user;
    } catch (error) {
        throw Error("משתמש לא קיים");
    }
}

async function signUp(email, password, fullname, phone, isAdmin) {
    try {
        const existingUser = await User.findOne({ email: { $regex: email, $options: "i" } }).select("-password");

        if (existingUser) {
            throw new Error("משתמש כבר קיים");
        }

        const passwordJSON = {
            password: password,
        };

        const passwordToken = jwt.sign(passwordJSON, JWT_SECRET);

        const newUser = new User({
            email,
            password: passwordToken,
            fullname,
            phone,
            isAdmin,
        });

        return await newUser.save();
    } catch (error) {
        throw error;
    }
}

async function login(email) {
    try {
        const user = await getUserByEmail(email);

        jwt.verify(user.password, JWT_SECRET);

        return user;
    } catch (error) {
        throw error;
    }
}

async function updateUser(userId, chatId) {
    try {
        const user = await User.findById(userId);
        if (!user) return;

        user.chatId = chatId;

        return await user.save();
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getUserByEmail,
    getUserByPhone,
    signUp,
    login,
    updateUser,
};
