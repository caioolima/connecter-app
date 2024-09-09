// Importa os tipos de dados do Sequelize
const { DataTypes } = require('sequelize');
// Importa a instância configurada do Sequelize para conexão com o banco de dados
const sequelize = require('../config/database');
// Importa o módulo bcryptjs para hashing de senhas
const bcrypt = require('bcryptjs');

// Define o modelo User usando o Sequelize
const User = sequelize.define('User', {
  // Define o campo username
  username: {
    type: DataTypes.STRING, // Tipo de dado STRING
    allowNull: false, // Não permite valor nulo
    unique: true, // Garante que o nome de usuário seja único no banco de dados
  },
  // Define o campo fullName
  fullName: {
    type: DataTypes.STRING, // Tipo de dado STRING
    allowNull: false, // Não permite valor nulo
  },
  // Define o campo email
  email: {
    type: DataTypes.STRING, // Tipo de dado STRING
    allowNull: false, // Não permite valor nulo
    unique: true, // Garante que o e-mail seja único no banco de dados
  },
  // Define o campo password
  password: {
    type: DataTypes.STRING, // Tipo de dado STRING
    allowNull: false, // Não permite valor nulo
  }
}, {
  // Configurações adicionais para o modelo
  hooks: {
    // Hook para antes de salvar o usuário
    beforeSave: async (user) => {
      // Verifica se o campo password foi alterado
      if (user.changed('password')) {
        // Gera um salt para o hashing da senha
        const salt = await bcrypt.genSalt(10);
        // Hash a senha com o salt gerado
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  },
  timestamps: true, // Adiciona automaticamente os campos createdAt e updatedAt
});

// Adiciona um método de instância para comparar a senha fornecida com a senha armazenada
User.prototype.matchPassword = async function(password) {
  // Compara a senha fornecida com o hash da senha armazenada
  return bcrypt.compare(password, this.password);
};

// Exporta o modelo User para ser utilizado em outras partes da aplicação
module.exports = User;
