import React, { useState } from 'react';
import DropdownMenu from './DropdownMenu'; // Importa o componente DropdownMenu
import styled from 'styled-components';

// Container principal para o item da tarefa
const TaskItemContainer = styled.div`
  background-color: #1a1a1a; /* Cor de fundo escura para o item */
  padding: 20px; /* Espaçamento interno */
  border-radius: 12px; /* Bordas arredondadas */
  box-shadow: 0 6px 15px rgba(255, 255, 255, 0.1); /* Sombra sutil */
  position: relative; /* Posiciona o container relativamente ao seu contêiner pai */
  display: flex;
  flex-direction: column; /* Alinha os itens em uma coluna */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Transições suaves para transformações e sombras */
  cursor: pointer; /* Muda o cursor para uma mão ao passar sobre o item */
  border: 1px solid #333; /* Borda fina ao redor do item */

  &:hover {
    transform: translateY(-8px); /* Move o item para cima quando em foco */
    box-shadow: 0 12px 25px rgba(255, 255, 255, 0.2); /* Intensifica a sombra ao passar o mouse */
  }
`;

// Container para o conteúdo da tarefa
const TaskContent = styled.div`
  display: flex;
  flex-direction: column; /* Alinha os itens em uma coluna */
`;

// Título da tarefa
const TaskTitle = styled.h3`
  font-size: 20px; /* Tamanho da fonte */
  font-weight: bold; /* Fonte em negrito */
  margin-bottom: 8px; /* Espaçamento inferior */
  color: #f5f5f5; /* Cor do texto */
`;

// Descrição da tarefa
const TaskDescription = styled.p`
  font-size: 15px; /* Tamanho da fonte */
  line-height: 1.5; /* Altura da linha para melhorar a legibilidade */
  color: #d1d1d1; /* Cor do texto */
  margin-bottom: 10px; /* Espaçamento inferior */
`;

// Data de criação da tarefa
const TaskCreatedAt = styled.p`
  font-size: 13px; /* Tamanho da fonte */
  color: #999; /* Cor do texto */
  margin-bottom: 8px; /* Espaçamento inferior */
`;

// Status da tarefa
const TaskStatus = styled.p`
  font-size: 16px; /* Tamanho da fonte */
  font-weight: bold; /* Fonte em negrito */
  color: ${props => (props.isCompleted ? '#4caf50' : '#f44336')}; /* Cor condicional com base no status da tarefa */
`;

// Componente funcional para um item de tarefa
const TaskItem = ({ task, onEdit, onDelete, onComplete }) => {
  const [hoveredTask, setHoveredTask] = useState(null); // Estado para controlar se o item está sendo pairado

  return (
    <TaskItemContainer
      onMouseEnter={() => setHoveredTask(task.id)} // Define o item pairado ao passar o mouse
      onMouseLeave={() => setHoveredTask(null)} // Remove o item pairado ao sair do mouse
    >
      <DropdownMenu
        onEdit={() => onEdit(task)} // Função de edição chamada com a tarefa
        onDelete={() => onDelete(task.id)} // Função de exclusão chamada com o ID da tarefa
        onComplete={() => onComplete(task.id)} // Função de conclusão chamada com o ID da tarefa
        isCompleted={task.taskStatus} // Passa o status da tarefa para o menu suspenso
      />
      <TaskContent>
        <TaskTitle>Título: {task.taskTitle}</TaskTitle> {/* Exibe o título da tarefa */}
        <TaskDescription>Descrição: {task.taskDescription}</TaskDescription> {/* Exibe a descrição da tarefa */}
        <TaskCreatedAt>Criado em: {new Date(task.createdAt).toLocaleString()}</TaskCreatedAt> {/* Exibe a data de criação */}
        <TaskStatus isCompleted={task.taskStatus}>
          Status: {task.taskStatus ? 'Concluída' : 'Pendente'} {/* Exibe o status da tarefa */}
        </TaskStatus>
      </TaskContent>
    </TaskItemContainer>
  );
};

export default TaskItem;
