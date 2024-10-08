import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useUserInfo from '../hooks/Tasks Hooks/useUserInfo';
import useTasks from '../hooks/Tasks Hooks/useTasks';
import TaskCard from '../components/Tasks Home/TaskCard';
import Modal from '../components/Tasks Home/Modal';
import UserDetails from '../components/Tasks Home/userDetails';

// Componente principal da página de tarefas
const TasksPage = () => {
  // Obtém o nome de usuário da URL usando useParams
  const { username } = useParams();
  // Estado para armazenar a tarefa selecionada e controlar a exibição do loader
  const [selectedTask, setSelectedTask] = useState(null);
  const [showLoader, setShowLoader] = useState(true); // Estado para controlar a exibição do loader

  // Hook personalizado para obter informações do usuário
  const { firstName, fullName, email, createdAt, loading: userLoading } = useUserInfo(username);
  // Hook personalizado para obter as tarefas do usuário
  const { tasks, loading: tasksLoading } = useTasks(username);

  // Efeito para ocultar o loader quando os dados do usuário e das tarefas são carregados
  useEffect(() => {
    if (!userLoading && !tasksLoading) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 300); // Pequeno atraso para garantir que o loader não apareça brevemente

      return () => clearTimeout(timer);
    }
  }, [userLoading, tasksLoading]);

  // Funções para lidar com a visualização e fechamento do modal
  const handleViewTask = (task) => setSelectedTask(task);
  const handleCloseModal = () => setSelectedTask(null);

  // Se os dados ainda estão carregando, exibe um loader
  if (userLoading || tasksLoading) {
    return (
      <PageContainer>
        <Loader>Carregando dados...</Loader>
      </PageContainer>
    );
  }

  // Renderiza a página com detalhes do usuário e lista de tarefas
  return (
    <PageContainer>
      <Header>
        <h1>Tarefas de {firstName}</h1>
        <p>Visualize suas tarefas e detalhes do usuário</p>
      </Header>
      <Content>
        <UserDetailsSection>
          {/* Exibe detalhes do usuário */}
          <UserDetails 
            fullName={fullName} 
            email={email} 
            createdAt={createdAt} 
            username={username} 
          />
        </UserDetailsSection>
        <TasksSection>
          <SectionTitle>Suas Tarefas</SectionTitle>
          {tasks.length > 0 ? (
            <TasksList>
              {/* Mapeia e exibe cada tarefa */}
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onViewTask={() => handleViewTask(task)}
                />
              ))}
            </TasksList>
          ) : (
            <NoTasksMessage>Não há tarefas disponíveis.</NoTasksMessage>
          )}
        </TasksSection>
      </Content>
      {/* Exibe o modal se uma tarefa estiver selecionada */}
      {selectedTask && (
        <Modal task={selectedTask} onClose={handleCloseModal} />
      )}
    </PageContainer>
  );
};

// Estilo do contêiner principal da página
const PageContainer = styled.div`
  color: #f5f5f5;
  padding: 20px;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

// Estilo do cabeçalho da página
const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
  margin-top: 5rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    font-weight: 700;
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  p {
    color: #bbb;
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
  }
`;

// Estilo do conteúdo da página com layout flexível
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px; /* Aumenta o espaço entre os componentes */
  padding: 20px; /* Adiciona mais espaço ao redor dos componentes */

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 30px; /* Ajusta o gap para telas maiores */
  }
`;

// Estilo da seção de detalhes do usuário
const UserDetailsSection = styled.div`
  flex: 2; /* Define um flex de 2 para UserDetails */
  margin-right: 20px; /* Adiciona um espaço à direita */
`;

// Estilo da seção de tarefas com gradiente e efeitos de sombra
const TasksSection = styled.section`
  flex: 3; /* Define um flex de 3 para TasksSection */
  background: linear-gradient(145deg, #1a1a1a, #121212);
  padding: 25px;
  border-radius: 12px;
  box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.3), -4px -4px 12px rgba(255, 255, 255, 0.2);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  color: #f5f5f5;
  border: 1px solid #444;
  margin-bottom: 3rem;
  margin-top: 40px;

  &:hover {
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.4), -8px -8px 16px rgba(255, 255, 255, 0.3);
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

// Estilo do título da seção de tarefas
const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #fff;
  border-bottom: 2px solid #ea4f97;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-weight: 700;
  text-align: center;
  transition: color 0.3s ease;

  &:hover {
    color: #c3c3c3;
  }
`;

// Estilo da lista de tarefas usando grid responsivo
const TasksList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 15px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

// Estilo para a mensagem quando não há tarefas
const NoTasksMessage = styled.p`
  text-align: center;
  color: #888;
  margin-top: 20px;
`;

// Estilo do loader de carregamento
const Loader = styled.div`
  text-align: center;
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 5rem;
`;

export default TasksPage;
