// models/UserTask.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // ou o caminho para seu arquivo de configuração do Sequelize

const UserTask = sequelize.define('UserTask', {
  username: {  // Altere para username se isso estiver no JWT
    type: DataTypes.STRING,
    allowNull: false
  },
  taskTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  taskDescription: {
    type: DataTypes.STRING,
    allowNull: true
  },
  taskStatus: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true
});


module.exports = UserTask;
