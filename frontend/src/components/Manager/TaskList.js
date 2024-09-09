import React from 'react';
import TaskItem from './TaskItem'; // Importa o componente TaskItem
import styled from 'styled-components';

// Container principal para a lista de tarefas, usando um layout de grid
const TaskGrid = styled.div`
  display: grid; /* Define o display como grid */
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); /* Cria colunas que se ajustam automaticamente com um mínimo de 280px e máximo de 1fração do espaço disponível */
  gap: 20px; /* Espaçamento entre os itens do grid */
`;

// Componente funcional para a lista de tarefas
const TaskList = ({ tasks, onEdit, onDelete, onComplete }) => (
  <TaskGrid>
    {tasks.map(task => (
      <TaskItem 
        key={task.id}  // A chave única para cada item, crucial para otimização de desempenho e para ajudar o React a identificar itens que mudaram
        task={task}  // Passa os dados da tarefa para o componente TaskItem
        onEdit={onEdit}  // Função chamada para editar a tarefa
        onDelete={onDelete}  // Função chamada para excluir a tarefa
        onComplete={onComplete}  // Função chamada para marcar a tarefa como concluída
      />
    ))}
  </TaskGrid>
);

export default TaskList;
