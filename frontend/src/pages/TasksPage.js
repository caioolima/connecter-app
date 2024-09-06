import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '../hooks/useAuth'; // Importando o hook useAuth
import { jwtDecode } from 'jwt-decode';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const formatDate = (dateString) => {
  const options = {
    day: '2-digit', // Dia do mês com dois dígitos (ex: "06")
    month: '2-digit', // Mês com dois dígitos (ex: "09")
    year: 'numeric' // Ano com quatro dígitos (ex: "2024")
  };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
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
  const { username } = useParams(); // Obtém o nome de usuário da URL
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [createdAt, setCreatedAt] = useState(''); // Estado para a data de criação
  const navigate = useNavigate();

  const { token, userInfo } = useAuth(); // Utilize useAuth para obter informações do usuário

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/user/${username}`);
        if (response.ok) {
          const data = await response.json();
          setFullName(data.fullName || 'Nome não disponível');
          setEmail(data.email || 'Email não disponível');
          setCreatedAt(formatDate(data.createdAt) || 'Data não disponível');
        } else {
          console.error('Erro ao carregar informações do usuário:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao carregar informações do usuário:', error);
      }
    };

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
          setTasks(data);
        } else {
          console.error('Erro ao carregar tarefas:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      }
    };

    fetchUserInfo();
    fetchTasks();
  }, [navigate, username, token, userInfo.username]);

  const handleViewTask = (task) => {
    if (token) {
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
          <h2>Informações de {fullName}</h2>
          <UserInfo>
            <InfoItem>
              <strong>Usuário:</strong> {username}
            </InfoItem>
            <InfoItem>
              <strong>Email:</strong> {email}
            </InfoItem>
            <InfoItem>
              <strong>Data de Criação:</strong> {createdAt}
            </InfoItem>
          </UserInfo>
        </UserWidget>
        <TasksWidget>
          <h2>Tarefas de {fullName}</h2>
          {tasks.length > 0 ? (
            <TaskGrid>
              {tasks.slice(0, 6).map((task) => (
                <TaskItem key={task.id}>
                  <TaskName>{task.taskTitle}</TaskName>
                  <TaskDate>{formatDate(task.createdAt)}</TaskDate>
                  <ActionButton onClick={() => handleViewTask(task)}>
                    Detalhes
                  </ActionButton>
                </TaskItem>
              ))}
            </TaskGrid>
          ) : (
            <NoTasksMessage>Não há tarefas para exibir.</NoTasksMessage>
          )}
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
  background: #000; /* Preto */
  padding: 2rem;
  min-height: 85vh;
  align-items: flex-start;
  color: #fff; /* Branco */
`;

const WidgetsContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  margin-top: 5rem;
  max-width: 1200px;
  justify-content: center;
`;

const Widget = styled.div`
  background: #111; /* Preto muito escuro */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(255, 255, 255, 0.1), inset 0 -2px 4px rgba(255, 255, 255, 0.05);
  padding: 2rem;
  width: 100%;
  box-sizing: border-box;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${fadeIn} 0.6s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(255, 255, 255, 0.2), inset 0 -2px 4px rgba(255, 255, 255, 0.1);
  }
`;

const TasksWidget = styled(Widget)`
  flex: 2;
  max-width: 750px;

  h2 {
    color: #fff; /* Branco */
    font-weight: bold;
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
`;

const UserWidget = styled(Widget)`
  flex: 1;
  max-width: 350px;
  height: auto;

  h2 {
    color: #fff; /* Branco */
    font-weight: bold;
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
`;

const UserInfo = styled.div`
  font-size: 1rem;
  color: #ccc; /* Cinza claro */

  strong {
    color: #fff; /* Branco */
  }
`;

const InfoItem = styled.div`
  margin-bottom: 0.5rem;
`;

const TaskGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const TaskItem = styled.div`
  background: #222; /* Cinza escuro */
  border-radius: 10px;
  padding: 1rem;
  color: #fff; /* Branco */
  transition: background 0.3s ease;

  &:hover {
    background: #333; /* Cinza mais claro */
  }
`;

const TaskName = styled.h3`
  font-size: 1.2rem;
  margin: 0;
`;

const TaskDate = styled.p`
  font-size: 0.9rem;
  color: #888; /* Cinza médio */
`;

const ActionButton = styled.button`
  background: #ea4f97; /* Cor primária */
  color: #fff; /* Branco */
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.3s ease;

  &:hover {
    background: #f70073; /* Cor primária mais forte */
  }
`;

const NoTasksMessage = styled.p`
  color: #ccc; /* Cinza claro */
`;

const TaskModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #111; /* Preto muito escuro */
  border-radius: 10px;
  padding: 2rem;
  width: 80%;
  max-width: 600px;
  color: #fff; /* Branco */
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ModalDate = styled.p`
  font-size: 0.9rem;
  color: #ccc; /* Cinza claro */
`;

const ModalBody = styled.div`
  p {
    margin: 0.5rem 0;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #fff; /* Branco */
  font-size: 1.5rem;
  cursor: pointer;
`;

const LoginModal = styled(TaskModal)``;

const LoginModalContent = styled(ModalContent)`
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

const LoginButton = styled(ActionButton)`
  background: #4bc5f5; /* Cor de link */
  color: #fff; /* Branco */
  margin-top: 1rem;

  &:hover {
    background: #3a9ed9; /* Cor de link mais escura */
  }
`;

export default TasksPage;
