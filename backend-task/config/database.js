require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env
const { Sequelize } = require('sequelize');

// Obtém a URL de conexão com o banco de dados a partir das variáveis de ambiente
const DATABASE_URL = process.env.DATABASE_URL;

// Cria uma instância do Sequelize para se conectar ao banco de dados
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'mysql', // Define o dialeto do banco de dados como MySQL
  logging: false, // Desativa o logging das queries SQL; defina como true se quiser ver as queries no console
});

// Função para testar a conexão com o banco de dados
async function testConnection() {
  try {
    await sequelize.authenticate(); // Tenta autenticar a conexão com o banco de dados
    console.log('Conexão com o banco de dados foi bem-sucedida.'); // Mensagem de sucesso
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error); // Mensagem de erro se a conexão falhar
  }
}

// Chama a função para testar a conexão com o banco de dados
testConnection();

// Exporta a instância do Sequelize para ser usada em outros módulos
module.exports = sequelize;
