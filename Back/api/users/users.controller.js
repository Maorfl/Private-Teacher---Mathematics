const userService = require("./users.service");

async function getUserByPhone(req, res) {
    try {
        const phone = req.body;

        const user = await userService.getUserByPhone(phone);

        res.json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function signUp(req, res) {
    try {
        const { fullname, phone, isAdmin } = req.body;
        const user = await userService.signUp(fullname, phone, isAdmin);

        res.json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function login(req, res) {
    try {
        const { phone } = req.body;
        const user = await userService.login(phone);

        res.json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    getUserByPhone,
    signUp,
    login,
};
