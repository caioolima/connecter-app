// Importa o módulo jwt para manipulação de JSON Web Tokens
const jwt = require('jsonwebtoken');
// Importa o modelo User para acessar informações do usuário no banco de dados
const User = require('../models/User');

// Middleware de autenticação para proteger rotas
const authMiddleware = async (req, res, next) => {
  // Obtém o cabeçalho de autorização da requisição
  const authHeader = req.headers.authorization;

  // Verifica se o cabeçalho de autorização está presente
  if (!authHeader) {
    // Retorna um erro 401 se o token não for fornecido
    return res.status(401).json({ message: 'No token provided' });
  }

  // Extrai o token do cabeçalho, que deve estar no formato "Bearer <token>"
  const token = authHeader.split(' ')[1];

  try {
    // Verifica e decodifica o token usando a chave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verifica se o ID está presente no token decodificado
    if (!decoded.id) {
      // Retorna um erro 401 se o token não contiver um ID válido
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Encontra o usuário no banco de dados com base no ID decodificado
    const user = await User.findByPk(decoded.id);

    // Verifica se o usuário foi encontrado
    if (!user) {
      // Retorna um erro 401 se o usuário não for encontrado
      return res.status(401).json({ message: 'User not found' });
    }

    // Adiciona as informações do usuário à requisição para uso posterior
    req.user = {
      id: user.id,
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      createdAt: user.createdAt, // Inclui a data de criação da conta do banco de dados
    };

    // Passa o controle para o próximo middleware ou rota
    next();
  } catch (err) {
    // Retorna um erro 401 se o token for inválido ou ocorrer um erro na verificação
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Exporta o middleware para ser utilizado em outras partes da aplicação
module.exports = authMiddleware;
