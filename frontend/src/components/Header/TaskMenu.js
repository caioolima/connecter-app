// TaskMenu.js
import React from 'react';
import styled from 'styled-components';
import { FaTasks } from 'react-icons/fa'; // Ícone adicionado

const TaskMenu = ({ onViewTasks }) => {
  return (
    <TaskMenuContainer>
      <TaskLink onClick={onViewTasks}>
        <TaskIcon />
        Gerenciar Tarefas
      </TaskLink>
    </TaskMenuContainer>
  );
};

const TaskMenuContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #1e1e1e; /* Cor de fundo mais suave */
  border-radius: 10px; /* Bordas arredondadas mais acentuadas */
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4); /* Sombra mais suave */
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  z-index: 1000;
  min-width: 200px; /* Largura mínima um pouco maior */
`;

const TaskLink = styled.div`
  color: #f0f0f0; /* Cor do texto mais clara */
  text-decoration: none;
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
  border-radius: 8px; /* Bordas arredondadas para um toque mais suave */
  display: flex;
  align-items: center; /* Alinhamento vertical do texto e ícone */
  
  &:hover {
    background-color: #2c2c2c; /* Cor de fundo do hover mais clara */
    transform: translateX(8px); /* Movimento mais suave */
  }

  &:focus {
    outline: 3px solid #1e90ff; /* Destaque de foco mais visível */
    outline-offset: 4px;
  }
`;

const TaskIcon = styled(FaTasks)`
  margin-right: 0.5rem; /* Espaçamento entre ícone e texto */
  color: #ffdd57; /* Cor do ícone mais atraente */
`;

export default TaskMenu;
