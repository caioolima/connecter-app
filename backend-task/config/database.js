const { Sequelize } = require('sequelize');

// Substitua pela URL pública fornecida
const DATABASE_URL = 'mysql://root:rPCKMCtAiSGQvGPUZWyDFTZFAdTahsXA@autorack.proxy.rlwy.net:23338/railway';

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'mysql',
  logging: false, // Pode definir como true se quiser ver logs de SQL
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados foi bem-sucedida.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
}

// Teste a conexão
testConnection();

// Exporta o sequelize para uso em outros módulos
module.exports = sequelize;
