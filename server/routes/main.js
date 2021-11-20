const express = require('express');
const { login, logout, register } = require('../controllers/user');
const { testDrive, createTab, getTabs, deleteTab } = require('../controllers/drive');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/testdrive', testDrive);
router.get('/logout', logout);
router.post('/tab', createTab);
router.get('/tabs/:email', getTabs);
router.delete('/tab', deleteTab);

module.exports = router;
