const userService = require('./users.service');


async function getUserByEmail(req, res) {
    try {
        const email = req.body;

        const user = await userService.getUserByEmail(email);

        res.json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function signUp(req, res) {
    try {
        const { email, password, fullname, phone, isAdmin} = req.body;
        const user = await userService.signUp(email, password, fullname, phone, isAdmin);

        res.json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function login(req, res) {
    try {
        const { email } = req.body;
        const user = await userService.login(email);

        res.json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    getUserByEmail,
    signUp,
    login
}