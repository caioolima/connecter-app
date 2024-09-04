const express = require('express');
const {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  completeTask,
  getTasksByUser,
  getCompletedTasks // Importar o controlador
} = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Nova rota para obter tarefas por usuário sem autenticação
router.get('/task/user/:username', getTasksByUser);

// Aplicar middleware de autenticação para todas as rotas abaixo
router.use(authMiddleware);

// Rotas de tarefas
router.post('/', addTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/complete', completeTask);
// Roteamento para obter tarefas concluídas
router.get('/tasks/completed', getCompletedTasks);


module.exports = router;
