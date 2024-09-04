import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { jwtDecode } from 'jwt-decode';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TasksPage = () => {
  const { username } = useParams();
  const [tasks, setTasks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ firstName: '', email: '' });
  const [selectedTask, setSelectedTask] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsAuthenticated(true);

      try {
        const decodedToken = jwtDecode(token);
        const fullName = decodedToken.name || 'Nome não disponível';
        const firstName = capitalizeFirstLetter(fullName.split(' ')[0]);

        setUser({
          firstName,
          email: decodedToken.email || 'Email não disponível',
        });

        if (username !== firstName) {
          navigate(`/tasks/${encodeURIComponent(firstName)}`);
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    } else {
      const fetchUserInfo = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/users/user/${encodeURIComponent(username)}`);
          if (response.ok) {
            const data = await response.json();
            setUser({
              firstName: capitalizeFirstLetter(data.name),
              email: data.email,
            });
          } else {
            console.error('Erro ao carregar informações do usuário:', response.statusText);
          }
        } catch (error) {
          console.error('Erro ao carregar informações do usuário:', error);
        }
      };

      fetchUserInfo();
    }

    const fetchTasks = async () => {
      try {
        const apiUrl = isAuthenticated 
          ? `http://localhost:5000/api/tasks/` 
          : `http://localhost:5000/api/tasks/task/user/${encodeURIComponent(username)}`;

        const response = await fetch(apiUrl, {
          headers: isAuthenticated ? { Authorization: `Bearer ${token}` } : {},
        });

        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        } else {
          console.error('Erro ao carregar tarefas:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      }
    };

    fetchTasks();
  }, [navigate, username, isAuthenticated]);

  const handleViewTask = (task) => {
    if (isAuthenticated) {
      setSelectedTask(task);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <Container>
      <WidgetsContainer>
        <UserWidget>
          <h2>Informações de {user.firstName}</h2>
          <UserInfo>
            <InfoItem>
              <strong>Nome:</strong> {user.firstName}
            </InfoItem>
            <InfoItem>
              <strong>Email:</strong> {user.email}
            </InfoItem>
          </UserInfo>
        </UserWidget>
        <TasksWidget>
          <h2>Tarefas de {user.firstName}</h2>
          <TaskGrid>
            {tasks.slice(0, 6).map((task) => (
              <TaskItem key={task.id}>
                <TaskName>{task.taskTitle}</TaskName>
                <TaskDate>{formatDate(task.createdAt)}</TaskDate>
                <ActionButton
                  onClick={() => handleViewTask(task)}
                >
                  Ver Tarefa
                </ActionButton>
              </TaskItem>
            ))}
          </TaskGrid>
        </TasksWidget>
      </WidgetsContainer>

      {selectedTask && (
        <TaskModal>
          <ModalContent>
            <CloseButton onClick={handleCloseModal}>×</CloseButton>
            <ModalHeader>
              <h3>{selectedTask.taskTitle}</h3>
              <ModalDate>{formatDate(selectedTask.createdAt)}</ModalDate>
            </ModalHeader>
            <ModalBody>
              <p><strong>Descrição:</strong> {selectedTask.taskDescription}</p>
              <p><strong>Status:</strong> {selectedTask.taskStatus ? 'Concluído' : 'Pendente'}</p>
            </ModalBody>
          </ModalContent>
        </TaskModal>
      )}

      {showLoginModal && (
        <LoginModal>
          <LoginModalContent>
            <CloseButton onClick={handleCloseLoginModal}>×</CloseButton>
            <h2>Você precisa estar logado para ver esta tarefa</h2>
            <LoginButton onClick={() => navigate('/login')}>Login</LoginButton>
          </LoginModalContent>
        </LoginModal>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  background: url('https://firebasestorage.googleapis.com/v0/b/connectrip-10205.appspot.com/o/task%2Fconnecter-background.jpg?alt=media&token=ed77c00e-74c3-4580-b494-ce581651ce09') no-repeat center center fixed;
  background-size: cover;
  padding: 2rem;
  min-height: 85vh;
  align-items: flex-start;
  color: #dcdcdc; /* Cor de texto mais clara para contraste */
`;

const WidgetsContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  margin-top: 10rem;
  max-width: 1200px;
  justify-content: center;
`;

const Widget = styled.div`
  background: rgba(0, 0, 0, 0.8); /* Fundo preto semitransparente */
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(255, 255, 255, 0.2), inset 0 -3px 6px rgba(255, 255, 255, 0.1);
  padding: 2rem;
  width: 100%;
  box-sizing: border-box;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${fadeIn} 0.6s ease-in-out;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(255, 255, 255, 0.3), inset 0 -4px 8px rgba(255, 255, 255, 0.2);
  }
`;

const TasksWidget = styled(Widget)`
  flex: 2;
  max-width: 750px;
  background: rgba(0, 0, 0, 0.7);
  
  h2 {
    color: #f70073; /* Cor rosa para o título */
    font-weight: bold;
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
`;

const UserWidget = styled(Widget)`
  flex: 1;
  max-width: 350px;
  background: rgba(0, 0, 0, 0.7);
  
  h2 {
    color: #f70073; /* Cor rosa para o título */
    font-weight: bold;
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
`;

const UserInfo = styled.div`
  margin-top: 1.5rem;
`;

const InfoItem = styled.div`
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
  color: #dcdcdc;
`;

const TaskGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const TaskItem = styled.div`
  background: rgba(0, 0, 0, 0.8); /* Fundo preto semitransparente */
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  color: #dcdcdc;
`;

const TaskName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const TaskDate = styled.p`
  font-size: 0.9rem;
  color: #bbb;
`;

const ActionButton = styled.button`
  background: #ea4f97; /* Cor rosa para o botão */
  border: none;
  border-radius: 5px;
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 0.5rem;
  transition: background 0.3s ease;

  &:hover {
    background: #f70073; /* Cor rosa mais escura para hover */
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const TaskModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.9); /* Fundo preto semitransparente */
  color: #dcdcdc;
  border-radius: 10px;
  padding: 2rem;
  width: 80%;
  max-width: 600px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
`;

const LoginModal = styled(TaskModal)`
  background: rgba(0, 0, 0, 0.9); /* Fundo preto semitransparente */
`;

const ModalContent = styled.div``;

const LoginModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalHeader = styled.div`
  margin-bottom: 1rem;
`;

const ModalBody = styled.div`
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: #dcdcdc;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #f70073; /* Cor rosa para hover */
  }
`;

const ModalDate = styled.p`
  font-size: 0.9rem;
  color: #bbb;
`;

const LoginButton = styled.button`
  background: #ea4f97; /* Cor rosa para o botão */
  border: none;
  border-radius: 5px;
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: #f70073; /* Cor rosa mais escura para hover */
  }
`;

export default TasksPage;
