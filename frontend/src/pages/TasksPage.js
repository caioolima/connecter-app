import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { jwtDecode } from 'jwt-decode'; // Corrigido para importar jwtDecode

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const TasksPage = () => {
  const { username } = useParams(); // Obtém o nome de usuário da URL
  const [tasks, setTasks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ firstName: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      // Tenta definir autenticação com base na presença do token
      setIsAuthenticated(true);

      try {
        const decodedToken = jwtDecode(token);
        const fullName = decodedToken.name || 'Nome não disponível';
        const firstName = capitalizeFirstLetter(fullName.split(' ')[0]); // Capitaliza a primeira letra

        setUser({
          firstName,
          email: decodedToken.email || 'Email não disponível',
        });

        // Redireciona se o nome na URL não corresponder ao nome do usuário
        if (username !== firstName) {
          navigate(`/tasks/${encodeURIComponent(firstName)}`);
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        // Mesmo que ocorra erro na decodificação, não redireciona para o login
      }
    } else {
      // Se não estiver autenticado, busca informações do usuário pela URL
      const fetchUserInfo = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/users/user/${encodeURIComponent(username)}`
          );
          if (response.ok) {
            const data = await response.json();
            setUser({
              firstName: capitalizeFirstLetter(data.name),
              email: data.email,
            });
          } else {
            console.error(
              'Erro ao carregar informações do usuário:',
              response.statusText
            );
          }
        } catch (error) {
          console.error('Erro ao carregar informações do usuário:', error);
        }
      };

      fetchUserInfo();
    }

    // Buscar tarefas
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/tasks/${encodeURIComponent(username)}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : '',
            },
          }
        );

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
  }, [navigate, username]);

  const handleAction = () => {
    if (!isAuthenticated) {
      alert('Você precisa estar logado para realizar essa ação.');
      // Nenhum redirecionamento, apenas alerta
    }
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
                {task.name}
                <ActionButton
                  onClick={handleAction}
                  disabled={!isAuthenticated}
                >
                  Editar
                </ActionButton>
              </TaskItem>
            ))}
          </TaskGrid>
        </TasksWidget>
      </WidgetsContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-attachment: fixed; /* Para uma imagem de fundo fixo */
  padding: 2rem;
  background: url('/connecter-background.jpg') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  align-items: flex-start;
  position: relative; /* Alinha o conteúdo com a imagem de fundo */
  z-index: 1; /* Garante que o conteúdo fique atrás do cabeçalho */
`;

const WidgetsContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  margin-top: 10rem;
  max-width: 1200px;
  justify-content: center;
`;

const Widget = styled.div`
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  width: 100%;
  box-sizing: border-box;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const UserWidget = styled(Widget)`
  flex: 1;
  max-width: 300px;
  height: 200px;
  min-height: 220px;
`;

const TasksWidget = styled(Widget)`
  flex: 2;
  max-width: 600px;
  height: auto;
`;

const UserInfo = styled.div`
  margin-top: 1rem;
`;

const InfoItem = styled.div`
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const TaskGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const TaskItem = styled.div`
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;

  &:hover {
    background-color: #f1f1f1;
    transform: translateY(-2px);
  }
`;

const ActionButton = styled.button`
  background-color: #007aff;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease;

  &:hover {
    background-color: #0051a8;
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;

export default TasksPage;
