const express = require('express');
const { login } = require('../controllers/movies');

const router = express.Router();

router.post('/login', login);

module.exports = router;
