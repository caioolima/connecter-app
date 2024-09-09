import React from 'react';
import styled from 'styled-components';

// Componente TaskCard que exibe informações de uma tarefa
const TaskCard = ({ task, onViewTask }) => (
  <Card>
    <TaskTitle>{task.taskTitle}</TaskTitle>
    <TaskInfo>Criada em: {formatDate(task.createdAt)}</TaskInfo>
    <ViewButton onClick={onViewTask}>Ver Tarefa</ViewButton>
  </Card>
);

// Estilo para o cartão da tarefa
const Card = styled.div`
  background: linear-gradient(145deg, #2c2c2c, #1e1e1e); /* Gradiente de fundo escuro */
  padding: 20px;
  border-radius: 8px; /* Cantos arredondados */
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s; /* Transições para transformação e sombra */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Sombra padrão */

  &:hover {
    transform: translateY(-5px); /* Levanta o cartão ao passar o mouse */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4); /* Aumenta a sombra no hover */
  }

  @media (max-width: 768px) {
    padding: 15px; /* Reduz o padding em telas menores */
  }
`;

// Estilo para o título da tarefa
const TaskTitle = styled.h3`
  margin: 0;
  color: #fff; /* Branco para o texto */
  font-size: 1.25rem; /* Tamanho da fonte */
  white-space: nowrap;  /* Evita a quebra de linha */
  overflow: hidden;     /* Esconde o texto que ultrapassa os limites */
  text-overflow: ellipsis;  /* Adiciona reticências ao final do texto quando for muito longo */
`;

// Estilo para as informações da tarefa
const TaskInfo = styled.p`
  color: #aaa; /* Cinza claro para o texto */
  font-size: 0.9rem; /* Tamanho da fonte */
  margin-top: 5px; /* Margem superior */
  margin-bottom: 3rem; /* Margem inferior */
`;

// Estilo para o botão de visualização da tarefa
const ViewButton = styled.button`
  background-color: #ea4f97; /* Cor de fundo rosa */
  color: #fff; /* Cor do texto em branco */
  border: none;
  padding: 10px 15px; /* Espaçamento interno */
  border-radius: 5px; /* Cantos arredondados */
  cursor: pointer;
  font-size: 0.9rem; /* Tamanho da fonte */
  position: absolute;
  bottom: 10px; /* Posiciona o botão no fundo do cartão */
  left: 10px; /* Posiciona o botão à esquerda */
  transition: background-color 0.3s; /* Transição suave para a cor de fundo */

  &:hover {
    background-color: #f291be; /* Cor de fundo rosa mais claro no hover */
  }
`;

// Função auxiliar para formatar a data no formato DD/MM/AAAA
const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

export default TaskCard;
