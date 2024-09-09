const jwt = require('jsonwebtoken');
const UserTask = require('../models/userTaskModel'); // Importa o modelo de tarefas do usuário

// Adicionar nova tarefa
exports.addTask = async (req, res) => {
  try {
    const { title, description } = req.body; // Desestrutura título e descrição da tarefa do corpo da requisição

    if (!req.user) {
      // Verifica se o usuário está autenticado
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    // Cria uma nova tarefa associada ao usuário autenticado
    const userTask = await UserTask.create({
      username: req.user.username, // Usa o nome de usuário do usuário autenticado
      taskTitle: title,
      taskDescription: description,
      taskStatus: false, // Define o status da tarefa como não concluído (padrão)
    });

    res.json({ userTask, message: 'Tarefa adicionada com sucesso' }); // Retorna a tarefa criada e uma mensagem de sucesso
  } catch (err) {
    res.status(500).json({ message: err.message }); // Retorna uma mensagem de erro se algo der errado
  }
};

// Obter tarefas do usuário
exports.getTasks = async (req, res) => {
  try {
    const { username } = req.params; // Obtém o nome de usuário dos parâmetros da rota

    // Busca todas as tarefas associadas ao nome de usuário fornecido
    const tasks = await UserTask.findAll({ where: { username } });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'Nenhuma tarefa encontrada para este usuário' }); // Retorna erro se nenhuma tarefa for encontrada
    }

    res.json(tasks); // Retorna a lista de tarefas
  } catch (err) {
    res.status(500).json({ message: err.message }); // Retorna uma mensagem de erro se algo der errado
  }
};

// Atualizar tarefa
exports.updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body; // Desestrutura os dados da tarefa do corpo da requisição
    const taskId = req.params.id; // Obtém o ID da tarefa dos parâmetros da rota

    if (!req.user) {
      // Verifica se o usuário está autenticado
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    // Busca a tarefa específica do usuário autenticado
    const userTask = await UserTask.findOne({ where: { id: taskId, username: req.user.username } });
    if (!userTask) return res.status(404).json({ message: 'Tarefa não encontrada' }); // Retorna erro se a tarefa não for encontrada

    // Atualiza os campos da tarefa se novos valores forem fornecidos
    userTask.taskTitle = title || userTask.taskTitle;
    userTask.taskDescription = description || userTask.taskDescription;
    userTask.taskStatus = status !== undefined ? status : userTask.taskStatus;
    await userTask.save(); // Salva as alterações na tarefa

    res.json({ userTask, message: 'Tarefa atualizada com sucesso' }); // Retorna a tarefa atualizada e uma mensagem de sucesso
  } catch (err) {
    res.status(500).json({ message: err.message }); // Retorna uma mensagem de erro se algo der errado
  }
};

// Excluir tarefa
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id; // Obtém o ID da tarefa dos parâmetros da rota

    if (!req.user) {
      // Verifica se o usuário está autenticado
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    // Remove a tarefa específica do usuário autenticado
    const result = await UserTask.destroy({ where: { id: taskId, username: req.user.username } });
    if (result === 0) return res.status(404).json({ message: 'Tarefa não encontrada' }); // Retorna erro se a tarefa não for encontrada

    res.json({ message: 'Tarefa removida com sucesso' }); // Retorna uma mensagem de sucesso
  } catch (err) {
    res.status(500).json({ message: err.message }); // Retorna uma mensagem de erro se algo der errado
  }
};

// Marcar tarefa como concluída
exports.completeTask = async (req, res) => {
  try {
    const taskId = req.params.id; // Obtém o ID da tarefa dos parâmetros da rota

    if (!req.user) {
      // Verifica se o usuário está autenticado
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    // Busca a tarefa específica do usuário autenticado
    const userTask = await UserTask.findOne({ where: { id: taskId, username: req.user.username } });
    if (!userTask) return res.status(404).json({ message: 'Tarefa não encontrada' }); // Retorna erro se a tarefa não for encontrada

    // Marca a tarefa como concluída
    userTask.taskStatus = true;
    await userTask.save(); // Salva as alterações na tarefa

    res.json({ userTask, message: 'Tarefa marcada como concluída com sucesso' }); // Retorna a tarefa atualizada e uma mensagem de sucesso
  } catch (err) {
    res.status(500).json({ message: err.message }); // Retorna uma mensagem de erro se algo der errado
  }
};

// Verificar tarefas concluídas
exports.getCompletedTasks = async (req, res) => {
  try {
    if (!req.user) {
      // Verifica se o usuário está autenticado
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    // Busca todas as tarefas concluídas associadas ao nome de usuário do usuário autenticado
    const completedTasks = await UserTask.findAll({ 
      where: { 
        username: req.user.username,
        taskStatus: true // Filtra tarefas concluídas
      } 
    });

    res.json(completedTasks); // Retorna a lista de tarefas concluídas
  } catch (err) {
    res.status(500).json({ message: err.message }); // Retorna uma mensagem de erro se algo der errado
  }
};

// Obter tarefas públicas de um usuário
exports.getTasksPublic = async (req, res) => {
  try {
    const { username } = req.params; // Obtém o nome de usuário dos parâmetros da rota

    if (!username) {
      // Verifica se o nome de usuário foi fornecido
      return res.status(400).json({ message: 'Nome de usuário é obrigatório' });
    }

    // Busca todas as tarefas associadas ao nome de usuário fornecido
    const tasks = await UserTask.findAll({ where: { username } });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'Nenhuma tarefa encontrada para este usuário' }); // Retorna erro se nenhuma tarefa for encontrada
    }

    res.json(tasks); // Retorna a lista de tarefas
  } catch (err) {
    res.status(500).json({ message: err.message }); // Retorna uma mensagem de erro se algo der errado
  }
};
