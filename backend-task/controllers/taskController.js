const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserTask = require('../models/userTaskModel');

// Adicionar nova tarefa
exports.addTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Criar a nova tarefa e a relação com o usuário
    const userTask = await UserTask.create({
      user: req.user.name,  // Armazenando o nome de usuário
      taskTitle: title,
      taskDescription: description,
      taskStatus: false  // Status padrão
    });

    res.json({ userTask, message: 'Task added successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obter tarefas do usuário
exports.getTasks = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Buscar todas as tarefas associadas ao nome de usuário
    const userTasks = await UserTask.findAll({ where: { user: req.user.name } });

    res.json(userTasks);
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
    const userTask = await UserTask.findOne({ where: { id: taskId, user: req.user.name } });
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
    const userTask = await UserTask.destroy({ where: { id: taskId, user: req.user.name } });
    if (!userTask) return res.status(404).json({ message: 'Task not found' });

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

    // Buscar a tarefa do usuário e marcar como concluída
    const userTask = await UserTask.findOne({ where: { id: taskId, user: req.user.name } });
    if (!userTask) return res.status(404).json({ message: 'Task not found' });

    userTask.taskStatus = true;  // Marcar como concluída
    await userTask.save();

    res.json({ userTask, message: 'Task marked as completed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
