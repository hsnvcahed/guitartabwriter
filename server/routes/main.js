const express = require('express');
const { login, testDrive, logout, register } = require('../controllers/user');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/testdrive', testDrive);
router.get('/logout', logout);

module.exports = router;
