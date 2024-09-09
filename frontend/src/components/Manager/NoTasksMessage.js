import React from 'react';
import styled from 'styled-components';

// Componente estilizado para exibir uma mensagem quando não há tarefas
const NoTasksMessage = styled.div`
  grid-column: 1 / -1; /* Faz com que o componente ocupe toda a largura da grid */
  text-align: center; /* Centraliza o texto horizontalmente */
  font-size: 18px; /* Tamanho da fonte da mensagem */
  color: #888; /* Cor do texto em cinza claro */
`;

// Componente funcional que exibe a mensagem "Você não tem tarefas pendentes!"
const NoTasks = () => (
  <NoTasksMessage>Você não tem tarefas pendentes!</NoTasksMessage>
);

export default NoTasks;
