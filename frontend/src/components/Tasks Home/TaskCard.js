import React from 'react';
import styled from 'styled-components';

const TaskCard = ({ task, onViewTask }) => (
  <Card>
    <TaskTitle>Título: {task.taskTitle}</TaskTitle>
    <TaskInfo>Criada em: {formatDate(task.createdAt)}</TaskInfo>
    <ViewButton onClick={onViewTask}>Ver Tarefa</ViewButton>
  </Card>
);

const Card = styled.div`
  background: linear-gradient(145deg, #2c2c2c, #1e1e1e);
  padding: 20px;
  border-radius: 8px;
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const TaskTitle = styled.h3`
  margin: 0;
  color: #fff;
  font-size: 1.25rem;
`;

const TaskInfo = styled.p`
  color: #aaa;
  font-size: 0.9rem;
  margin-top: 5px;
  margin-bottom: 3rem;
`;

const ViewButton = styled.button`
  background-color: #ea4f97;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  position: absolute;
  bottom: 10px;
  left: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f291be;
  }
`;

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

export default TaskCard;
