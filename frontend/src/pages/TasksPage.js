import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useUserInfo from '../hooks/Tasks/useUserInfo';
import useTasks from '../hooks/Tasks/useTasks';
import TaskCard from '../components/Tasks Home/TaskCard';
import Modal from '../components/Tasks Home/Modal';
import UserDetails from '../components/Tasks Home/userDetails';

const TasksPage = () => {
  const { username } = useParams();
  const [selectedTask, setSelectedTask] = useState(null);

  const { firstName, fullName, email, createdAt } = useUserInfo(username);
  const tasks = useTasks(username);

  const handleViewTask = (task) => setSelectedTask(task);
  const handleCloseModal = () => setSelectedTask(null);

  return (
    <PageContainer>
      <Header>
        <h1>Tarefas de {firstName}</h1>
        <p>Visualize suas tarefas e detalhes do usuário</p>
      </Header>
      <Content>
        <UserDetails 
          fullName={fullName} 
          email={email} 
          createdAt={createdAt} 
          username={username} 
        />
        <TasksSection>
          <SectionTitle>Suas Tarefas</SectionTitle>
          {tasks.length > 0 ? (
            <TasksList>
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
      {selectedTask && (
        <Modal task={selectedTask} onClose={handleCloseModal} />
      )}
    </PageContainer>
  );
};

const PageContainer = styled.div`
  color: #f5f5f5;
  padding: 20px;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const TasksSection = styled.section`
  flex: 2;
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

const TasksList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 15px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const NoTasksMessage = styled.p`
  text-align: center;
  color: #888;
  margin-top: 20px;
`;

export default TasksPage;
