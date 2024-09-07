const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize'); // Adicionado para usar operadores do Sequelize

exports.register = async (req, res) => {
  try {
    const { username, fullName, email, password } = req.body;

    if (!username || !fullName || !email || !password) {
      return res.status(400).json({ message: 'Nome de usuário, nome completo, e-mail e senha são obrigatórios.' });
    }

    // Verificar se o nome de usuário ou e-mail já existem
    const existingUsername = await User.findOne({ where: { username } });
    const existingEmail = await User.findOne({ where: { email } });

    if (existingUsername && existingEmail) {
      return res.status(400).json({ message: 'Nome de usuário e e-mail já estão em uso.' });
    }

    if (existingUsername) {
      return res.status(400).json({ message: 'Nome de usuário já está em uso.' });
    }

    if (existingEmail) {
      return res.status(400).json({ message: 'E-mail já está em uso.' });
    }

    // Criar o novo usuário
    const user = await User.create({ username, fullName, email, password });

    // Gerar o token JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Erro durante o registro:', err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'E-mail e senha são obrigatórios' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, fullName: user.fullName, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (err) {
    console.error('Erro durante o login:', err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const { username } = req.params;

    // Buscar o usuário pelo nome de usuário
    const user = await User.findOne({ where: { username } });
    
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Retornar informações do usuário, incluindo a data de criação
    res.json({
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      createdAt: user.createdAt // Inclua a data de criação aqui
    });
  } catch (err) {
    console.error('Erro ao buscar informações do usuário:', err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
