import { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';

const useTasks = (username) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const { token, userInfo } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Verifica se o username na URL é o mesmo do usuário logado
        const apiUrl = username === userInfo.username
          ? `http://localhost:5000/api/manager/tasks/${encodeURIComponent(userInfo.username)}`
          : `http://localhost:5000/api/manager/tasks/${encodeURIComponent(username)}`;

        const response = await fetch(apiUrl, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (response.ok) {
          const data = await response.json();
          const sortedTasks = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          const recentTasks = sortedTasks.slice(0, 9);

          // Verifica se há diferença nas tarefas
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

    fetchTasks();
  }, [username, token, userInfo.username]);

  return { tasks, loading };
};

export default useTasks;
