import { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';

// Hook personalizado para buscar e gerenciar tarefas
const useTasks = (username) => {
  // Estados para armazenar as tarefas e o status de carregamento
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Obtém o token e as informações do usuário do contexto de autenticação
  const { token, userInfo } = useAuth();

  useEffect(() => {
    // Função assíncrona para buscar as tarefas
    const fetchTasks = async () => {
      try {
        // Define a URL da API com base no username fornecido e no username do usuário logado
        const apiUrl = username === userInfo.username
          ? `https://connecter-app-production.up.railway.app/api/manager/tasks/${encodeURIComponent(userInfo.username)}`
          : `https://connecter-app-production.up.railway.app/api/manager/tasks/${encodeURIComponent(username)}`;

        // Faz a requisição para buscar as tarefas, incluindo o token de autorização se disponível
        const response = await fetch(apiUrl, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (response.ok) {
          const data = await response.json();
          // Ordena as tarefas pela data de criação em ordem decrescente
          const sortedTasks = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          // Seleciona as 9 tarefas mais recentes
          const recentTasks = sortedTasks.slice(0, 9);

          // Verifica se as tarefas recentes são diferentes das tarefas atuais
          if (JSON.stringify(recentTasks) !== JSON.stringify(tasks)) {
            setTasks(recentTasks);
          }
        } else {
          console.error('Erro ao carregar tarefas:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      } finally {
        setLoading(false); // Define o carregamento como falso após a tentativa de carregar as tarefas
      }
    };

    fetchTasks(); // Chama a função para buscar as tarefas
  }, [username, token, userInfo.username]); // Reexecuta o efeito se username, token ou userInfo.username mudarem

  return { tasks, loading }; // Retorna as tarefas e o status de carregamento
};

export default useTasks;
