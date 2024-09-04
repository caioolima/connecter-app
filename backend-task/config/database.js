const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  database: 'task_manager',
  username: 'root',
  password: 'task2024',
  logging: false,
});

module.exports = sequelize;
