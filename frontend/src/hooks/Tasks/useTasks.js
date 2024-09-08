import { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';

const useTasks = (username) => {
  const [tasks, setTasks] = useState([]);
  const { token, userInfo } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const apiUrl = token
          ? `http://localhost:5000/api/manager/tasks/${encodeURIComponent(userInfo.username)}`
          : `http://localhost:5000/api/manager/tasks/${encodeURIComponent(username)}`;

        const response = await fetch(apiUrl, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        if (response.ok) {
          const data = await response.json();
          const sortedTasks = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          const recentTasks = sortedTasks.slice(0, 9);
          setTasks(recentTasks);
        } else {
          console.error('Erro ao carregar tarefas:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      }
    };

    fetchTasks();
  }, [username, token, userInfo.username]);

  return tasks;
};

export default useTasks;
