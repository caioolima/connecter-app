const jwt = require('jsonwebtoken');
const UserTask = require('../models/userTaskModel'); // Certifique-se de que o caminho do modelo está correto

// Adicionar nova tarefa
exports.addTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Criar a nova tarefa e a relação com o usuário
    const userTask = await UserTask.create({
      username: req.user.username, // Certifique-se de que `username` está sendo passado corretamente
      taskTitle: title,
      taskDescription: description,
      taskStatus: false, // Status padrão
    });

    res.json({ userTask, message: 'Task added successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obter tarefas do usuário
exports.getTasks = async (req, res) => {
  try {
    const { username } = req.params; // Obtém o username da rota

    // Busca todas as tarefas associadas ao username
    const tasks = await UserTask.findAll({ where: { username } });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this user' });
    }

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Atualizar tarefa
exports.updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const taskId = req.params.id;

    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Buscar a tarefa do usuário e atualizar
    const userTask = await UserTask.findOne({ where: { id: taskId, username: req.user.username } });
    if (!userTask) return res.status(404).json({ message: 'Task not found' });

    userTask.taskTitle = title || userTask.taskTitle;
    userTask.taskDescription = description || userTask.taskDescription;
    userTask.taskStatus = status !== undefined ? status : userTask.taskStatus;
    await userTask.save();

    res.json({ userTask, message: 'Task updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Excluir tarefa
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Buscar e remover a tarefa
    const result = await UserTask.destroy({ where: { id: taskId, username: req.user.username } });
    if (result === 0) return res.status(404).json({ message: 'Task not found' });

    res.json({ message: 'Task removed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Marcar tarefa como concluída
exports.completeTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const userTask = await UserTask.findOne({ where: { id: taskId, username: req.user.username } });
    if (!userTask) return res.status(404).json({ message: 'Task not found' });

    userTask.taskStatus = true;
    await userTask.save();

    res.json({ userTask, message: 'Task marked as completed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Verificar tarefas concluídas
exports.getCompletedTasks = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Buscar todas as tarefas associadas ao nome de usuário e com status concluído
    const completedTasks = await UserTask.findAll({ 
      where: { 
        username: req.user.username,
        taskStatus: true
      } 
    });

    res.json(completedTasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obter tarefas públicas de um usuário
exports.getTasksPublic = async (req, res) => {
  try {
    const { username } = req.params; // Obtém o username da rota

    // Verifica se o username foi fornecido
    if (!username) {
      return res.status(400).json({ message: 'Username is required' });
    }

    // Busca todas as tarefas associadas ao username fornecido
    const tasks = await UserTask.findAll({ where: { username } });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this user' });
    }

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};