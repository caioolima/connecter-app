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
  const [hoveredTask, setHoveredTask] = useState(null); // Estado para hover
  const { token, userInfo } = useAuth();

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

  useEffect(() => {
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
      await response.json();
      
      fetchTasks(); // Atualize a lista de tarefas
      setModalOpen(false); // Feche o modal e limpe a tarefa atual
      setCurrentTask(null);
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
      await response.json();
      
      fetchTasks(); // Atualize a lista de tarefas
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
      fetchTasks(); // Atualize a lista de tarefas
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
      <div style={styles.taskWrapper}>
        <div style={styles.taskGrid}>
          {filteredTasks.length > 0 ? (
            filteredTasks.map(task => (
              <div 
                key={task.id} 
                style={{
                  ...styles.taskItem, 
                  ...(hoveredTask === task.id ? styles.taskItemHover : {}),
                }}
                onMouseEnter={() => setHoveredTask(task.id)}
                onMouseLeave={() => setHoveredTask(null)}
              >
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
                  <h3 style={styles.taskTitle}>Título: {task.taskTitle}</h3>
                  <p style={styles.taskDescription}>Descrição: {task.taskDescription}</p>
                  <p style={styles.taskCreatedAt}>Criado em: {new Date(task.createdAt).toLocaleString()}</p>
                  <p style={styles.taskStatus}>
                    Status: {task.taskStatus ? 'Concluída' : 'Pendente'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div style={styles.noTasksMessage}>Não há tarefas para exibir.</div>
          )}
        </div>
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
  taskWrapper: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
  },
  taskGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  taskItem: {
    backgroundColor: '#1a1a1a',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 6px 15px rgba(255, 255, 255, 0.1)', // Sombra branca suave
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    border: '1px solid #333',
  },
  taskItemHover: {
    transform: 'translateY(-8px)', // Efeito de levitação
    boxShadow: '0 12px 25px rgba(255, 255, 255, 0.2)', // Aumenta a intensidade da sombra no hover
  },
  taskContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  taskTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '8px',
    color: '#f5f5f5',
  },
  taskDescription: {
    fontSize: '15px',
    lineHeight: '1.5',
    color: '#d1d1d1',
    marginBottom: '10px',
  },
  taskCreatedAt: {
    fontSize: '13px',
    color: '#999',
    marginBottom: '8px',
  },
  taskStatus: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#4caf50',
  },
  noTasksMessage: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    fontSize: '18px',
    color: '#888',
  },
};

export default TaskManager;
