const express = require('express');
const {getUserByEmail,signUp,login} = require('./users.controller');

const router = express.Router();

router.get('/', getUserByEmail);
router.post('/signup', signUp);
router.post('/login', login);


module.exports = router;