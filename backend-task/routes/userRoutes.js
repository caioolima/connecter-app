const express = require('express');
const { register, login, getUserInfo } = require('../controllers/userController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user/:username', getUserInfo);

module.exports = router;
