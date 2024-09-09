// Importa o modelo User para interagir com a tabela de usuários no banco de dados
const User = require('../models/User');
// Importa o módulo jwt para manipulação de JSON Web Tokens
const jwt = require('jsonwebtoken');
// Importa operadores do Sequelize para consultas complexas, se necessário
const { Op } = require('sequelize'); 

// Função para registrar um novo usuário
exports.register = async (req, res) => {
  try {
    // Desestrutura os dados do usuário do corpo da requisição
    const { username, fullName, email, password } = req.body;

    // Verifica se todos os campos obrigatórios estão presentes
    if (!username || !fullName || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    // Verifica se já existe um usuário com o mesmo nome de usuário ou e-mail
    const existingUsername = await User.findOne({ where: { username } });
    const existingEmail = await User.findOne({ where: { email } });

    // Retorna erros específicos se o nome de usuário ou e-mail já estiverem em uso
    if (existingUsername && existingEmail) {
      return res.status(400).json({ message: 'Nome de usuário e e-mail já estão em uso.' });
    }

    if (existingUsername) {
      return res.status(400).json({ message: 'Nome de usuário já está em uso.' });
    }

    if (existingEmail) {
      return res.status(400).json({ message: 'E-mail já está em uso.' });
    }

    // Cria um novo usuário no banco de dados
    const user = await User.create({ username, fullName, email, password });

    // Verifica se a chave secreta para JWT está definida no ambiente
    if (!process.env.JWT_SECRET) {
      throw new Error('Chave secreta não definida');
    }

    // Gera um token JWT para o usuário
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Retorna o token como resposta
    res.json({ token });
  } catch (err) {
    // Registra o erro no console e retorna um erro 500 (erro interno do servidor)
    console.error('Erro durante o registro:', err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Função para realizar o login do usuário
exports.login = async (req, res) => {
  try {
    // Desestrutura o e-mail e a senha do corpo da requisição
    const { email, password } = req.body;

    // Verifica se o e-mail e a senha foram fornecidos
    if (!email || !password) {
      return res.status(400).json({ message: 'E-mail e senha são obrigatórios' });
    }

    // Valida o formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'E-mail inválido' });
    }

    // Encontra o usuário no banco de dados com base no e-mail fornecido
    const user = await User.findOne({ where: { email } });

    // Verifica se o usuário existe e se a senha fornecida corresponde à senha armazenada
    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: 'E-mail ou senha incorretos. Verifique e tente novamente.' });
    }

    // Verifica se a chave secreta para JWT está definida no ambiente
    if (!process.env.JWT_SECRET) {
      throw new Error('Chave secreta não definida');
    }

    // Gera um token JWT para o usuário com informações adicionais
    const token = jwt.sign(
      { id: user.id, username: user.username, fullName: user.fullName, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Retorna o token como resposta
    res.json({ token });
  } catch (err) {
    // Registra o erro no console e retorna um erro 500 (erro interno do servidor)
    console.error('Erro durante o login:', err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

// Função para obter informações do usuário com base no nome de usuário
exports.getUserInfo = async (req, res) => {
  try {
    // Obtém o nome de usuário dos parâmetros da requisição
    const { username } = req.params;

    // Busca o usuário no banco de dados com base no nome de usuário fornecido
    const user = await User.findOne({ where: { username } });
    
    // Verifica se o usuário foi encontrado
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Retorna informações do usuário, incluindo a data de criação da conta
    res.json({
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      createdAt: user.createdAt // Inclui a data de criação aqui
    });
  } catch (err) {
    // Registra o erro no console e retorna um erro 500 (erro interno do servidor)
    console.error('Erro ao buscar informações do usuário:', err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
