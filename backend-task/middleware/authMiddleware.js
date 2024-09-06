const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Extrair o token do cabeçalho

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verificar se o ID está presente no token decodificado
    if (!decoded.id) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Encontrar o usuário com base no ID decodificado
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Adicionar informações do usuário ao req, incluindo a data de criação da conta
    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      createdAt: user.createdAt, // Usar a data de criação da conta do banco de dados
    };

    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
