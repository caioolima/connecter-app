// models/UserTask.js
// Importa os tipos de dados do Sequelize
const { DataTypes } = require('sequelize');
// Importa a instância configurada do Sequelize
const sequelize = require('../config/database'); // ou o caminho para seu arquivo de configuração do Sequelize

// Define o modelo UserTask usando o Sequelize
const UserTask = sequelize.define('UserTask', {
  // Define o campo username
  username: {  
    type: DataTypes.STRING, // Tipo de dado STRING
    allowNull: false // Não permite valor nulo
  },
  // Define o campo taskTitle
  taskTitle: {
    type: DataTypes.STRING, // Tipo de dado STRING
    allowNull: false // Não permite valor nulo
  },
  // Define o campo taskDescription
  taskDescription: {
    type: DataTypes.STRING, // Tipo de dado STRING
    allowNull: true // Permite valor nulo
  },
  // Define o campo taskStatus
  taskStatus: {
    type: DataTypes.BOOLEAN, // Tipo de dado BOOLEAN
    defaultValue: false // Valor padrão é false
  }
}, {
  // Configurações adicionais para o modelo
  timestamps: true // Adiciona automaticamente campos createdAt e updatedAt
});

// Exporta o modelo UserTask para ser utilizado em outras partes da aplicação
module.exports = UserTask;
