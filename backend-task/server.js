require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const winston = require('winston');
const sequelize = require('./config/database'); // Ajuste o caminho se necessário

// Inicializa o aplicativo Express
const app = express();

// Configuração do Winston para logs no console
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ]
});

// Middlewares
app.use(cors());
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
app.use(express.json());

// Teste de Conexão com o MySQL
sequelize.authenticate()
  .then(() => console.log('MySQL Connected'))
  .catch(err => console.log('Erro ao conectar no MySQL:', err));

// Importação de Rotas
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Uso das Rotas
app.use('/api/users', userRoutes);
app.use('/api/manager', taskRoutes);

// Inicialização do Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Sincronizar modelos
const User = require('./models/User');
const UserTask = require('./models/userTaskModel');

sequelize.sync({ alter: true })
  .then(() => console.log('Database synchronized'))
  .catch(err => console.log('Error syncing database:', err));
