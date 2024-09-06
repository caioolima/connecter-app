import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Manager/Navbar';
import TaskModal from '../components/Manager/TaskModal';
import DropdownMenu from '../components/Manager/DropdownMenu';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const { token, userInfo } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      if (!token || !userInfo?.username) return;
      try {
        const response = await fetch(`http://localhost:5000/api/manager/tasks/${userInfo.username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Erro ao buscar tarefas');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, [token, userInfo?.username]);

  const handleAddTaskClick = () => {
    setCurrentTask(null);
    setModalOpen(true);
  };

  const handleSaveTask = async (task) => {
    try {
      const method = currentTask ? 'PUT' : 'POST';
      const url = currentTask ? `http://localhost:5000/api/manager/tasks/${currentTask.id}` : 'http://localhost:5000/api/manager/tasks';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) throw new Error('Erro ao salvar tarefa');
      const savedTask = await response.json();
      if (currentTask) {
        setTasks(tasks.map(t => (t.id === savedTask.id ? savedTask : t)));
      } else {
        setTasks([...tasks, savedTask]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/manager/tasks/${taskId}/complete`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Erro ao marcar tarefa como concluída');
      const updatedTask = await response.json();
      setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/manager/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Erro ao excluir tarefa');
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.taskStatus;
    if (filter === 'pending') return !task.taskStatus;
    return true;
  });

  return (
    <div style={styles.container}>
      <Navbar onAddTaskClick={handleAddTaskClick} onFilterChange={setFilter} />
      <div style={styles.taskGrid}>
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <div key={task.id} style={styles.taskItem}>
              <DropdownMenu
                onEdit={() => {
                  setCurrentTask(task);
                  setModalOpen(true);
                }}
                onDelete={() => handleDeleteTask(task.id)}
                onComplete={() => handleCompleteTask(task.id)}
                isCompleted={task.taskStatus}
              />
              <div style={styles.taskContent}>
                <h3 style={styles.taskTitle}>{task.taskTitle}</h3>
                <p style={styles.taskDescription}>{task.taskDescription}</p>
              </div>
            </div>
          ))
        ) : (
          <div style={styles.noTasksMessage}>Não há tarefas para exibir.</div>
        )}
      </div>
      <TaskModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onSave={handleSaveTask} 
        task={currentTask} 
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#000',
    color: '#fff',
    overflow: 'hidden',
  },
  taskGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    padding: '20px',
    boxSizing: 'border-box',
  },
  taskItem: {
    backgroundColor: '#1a1a1a',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  taskItemHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
  },
  taskContent: {
    flex: '1',
  },
  taskTitle: {
    margin: '0 0 10px 0',
    fontSize: '20px',
    fontWeight: '600',
  },
  taskDescription: {
    margin: '0',
    fontSize: '16px',
    color: '#ccc',
  },
  noTasksMessage: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#ccc',
    padding: '20px',
    gridColumn: '1 / -1', // Faz com que a mensagem ocupe toda a largura do grid
  },
};


export default TaskManager;
