// TaskMenu.js
import React from 'react';
import styled from 'styled-components';

const TaskMenu = ({ onOpenCreateTaskModal, onViewTasks }) => {
  return (
    <TaskMenuContainer>
      <TaskLink onClick={onOpenCreateTaskModal}>
        Criar Tarefa
      </TaskLink>
      <TaskLink onClick={onViewTasks}>
        Ver Tarefas
      </TaskLink>
    </TaskMenuContainer>
  );
};

const TaskMenuContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #333;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1000;
`;

const TaskLink = styled.div`
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }
`;

export default TaskMenu;
