const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Certifique-se de que o caminho está correto
const {
  addTask,
  getTasks,
  updateTask,
  deleteTask,
  completeTask,
  getCompletedTasks,
  getTasksPublic
} = require('../controllers/taskController'); // Certifique-se de que o caminho está correto

// Obter tarefas públicas de um usuário
router.get('/tasks/:username', getTasksPublic); // Nova rota pública

// Aplicar o middleware de autenticação a todas as rotas abaixo
router.use(authMiddleware);

// Adicionar nova tarefa
router.post('/tasks', addTask);

// Obter tarefas do usuário
router.get('/tasks/:username', getTasks);

// Atualizar tarefa
router.put('/tasks/:id', updateTask);

// Excluir tarefa
router.delete('/tasks/:id', deleteTask);

// Marcar tarefa como concluída
router.patch('/tasks/:id/complete', completeTask);

// Verificar tarefas concluídas
router.get('/tasks/completed', getCompletedTasks);

module.exports = router;
