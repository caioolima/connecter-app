import { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';

// Hook personalizado para gerenciar tarefas com a API
const useTasksApi = () => {
  // Estados para armazenar as tarefas, o filtro, o status de carregamento, a tarefa atual e o estado do modal
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [currentTask, setCurrentTask] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Obtém o token e as informações do usuário do contexto de autenticação
  const { token, userInfo } = useAuth();

  // Função para buscar tarefas da API
  const fetchTasks = async () => {
    if (!token || !userInfo?.username) return; // Verifica se o token e o username estão disponíveis
    
    setLoading(true); // Define o status de carregamento como verdadeiro
    try {
      const response = await fetch(`https://connecter-app-production.up.railway.app/api/manager/tasks/${userInfo.username}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Inclui o token de autorização no cabeçalho
        },
      });
      
      if (!response.ok) throw new Error('Erro ao buscar tarefas'); // Lança erro se a resposta não for ok
      const data = await response.json(); // Converte a resposta em JSON
      setTasks(data); // Atualiza o estado com as tarefas recebidas
    } catch (error) {
      console.error(error); // Registra qualquer erro no console
    } finally {
      setLoading(false); // Define o status de carregamento como falso, independentemente do sucesso ou falha
    }
  };

  // Efeito para buscar tarefas sempre que o token ou o username mudar
  useEffect(() => {
    fetchTasks();
  }, [token, userInfo?.username]);

  // Função para abrir o modal de adição/edição de tarefas
  const handleAddTaskClick = () => {
    setCurrentTask(null); // Reseta a tarefa atual
    setModalOpen(true); // Abre o modal
  };

  // Função para salvar uma tarefa (adicionar ou editar)
  const handleSaveTask = async (task) => {
    try {
      const method = currentTask ? 'PUT' : 'POST'; // Define o método HTTP com base na existência de uma tarefa atual
      const url = currentTask
        ? `https://connecter-app-production.up.railway.app/api/manager/tasks/${currentTask.id}`
        : 'https://connecter-app-production.up.railway.app/api/manager/tasks';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Inclui o token de autorização no cabeçalho
        },
        body: JSON.stringify(task), // Envia a tarefa no corpo da requisição
      });

      if (!response.ok) throw new Error('Erro ao salvar tarefa'); // Lança erro se a resposta não for ok
      await response.json(); // Converte a resposta em JSON

      fetchTasks(); // Recarrega as tarefas
      setModalOpen(false); // Fecha o modal
      setCurrentTask(null); // Reseta a tarefa atual
    } catch (error) {
      console.error(error); // Registra qualquer erro no console
    }
  };

  // Função para marcar uma tarefa como concluída
  const handleCompleteTask = async (taskId) => {
    try {
      const response = await fetch(`https://connecter-app-production.up.railway.app/api/manager/tasks/${taskId}/complete`, {
        method: 'PATCH', // Usa o método PATCH para atualizar a tarefa
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Inclui o token de autorização no cabeçalho
        },
      });

      if (!response.ok) throw new Error('Erro ao marcar tarefa como concluída'); // Lança erro se a resposta não for ok
      await response.json(); // Converte a resposta em JSON

      fetchTasks(); // Recarrega as tarefas
    } catch (error) {
      console.error(error); // Registra qualquer erro no console
    }
  };

  // Função para excluir uma tarefa
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`https://connecter-app-production.up.railway.app/api/manager/tasks/${taskId}`, {
        method: 'DELETE', // Usa o método DELETE para excluir a tarefa
        headers: {
          Authorization: `Bearer ${token}`, // Inclui o token de autorização no cabeçalho
        },
      });

      if (!response.ok) throw new Error('Erro ao excluir tarefa'); // Lança erro se a resposta não for ok
      fetchTasks(); // Recarrega as tarefas
    } catch (error) {
      console.error(error); // Registra qualquer erro no console
    }
  };

  // Filtra as tarefas com base no filtro selecionado
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.taskStatus; // Retorna apenas tarefas concluídas
    if (filter === 'pending') return !task.taskStatus; // Retorna apenas tarefas pendentes
    return true; // Retorna todas as tarefas se o filtro for 'all'
  });

  // Retorna os estados e funções necessários para o gerenciamento de tarefas
  return {
    tasks: filteredTasks,
    loading,
    modalOpen,
    currentTask,
    filter,
    setFilter,
    setModalOpen,
    setCurrentTask,
    handleAddTaskClick,
    handleSaveTask,
    handleCompleteTask,
    handleDeleteTask,
  };
};

export default useTasksApi;
