const express = require('express');
const { login, logout, register } = require('../controllers/user');
const { testDrive } = require('../controllers/drive');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/testdrive', testDrive);
router.get('/logout', logout);

module.exports = router;
