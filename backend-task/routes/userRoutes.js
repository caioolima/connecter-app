const express = require('express');
const { register, login, getUserInfo } = require('../controllers/userController');
const router = express.Router();

// Rota para registrar um novo usuário
router.post('/register', register);

// Rota para login do usuário
router.post('/login', login);

// Rota para obter informações do usuário pelo nome de usuário
router.get('/user/:username', getUserInfo);

module.exports = router;
