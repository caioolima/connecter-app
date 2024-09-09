import React from 'react';
import styled from 'styled-components';

// Componente LoadingMessage estilizado com Styled Components
const LoadingMessage = styled.div`
  grid-column: 1 / -1; /* Faz com que o componente ocupe toda a largura da grade */
  text-align: center; /* Centraliza o texto horizontalmente */
  font-size: 18px; /* Define o tamanho da fonte do texto */
  color: #888; /* Define a cor do texto para um tom cinza claro */
`;

// Componente Loading que exibe uma mensagem de carregamento
const Loading = () => (
  <LoadingMessage>Carregando tarefas...</LoadingMessage> /* Mensagem exibida enquanto as tarefas estão sendo carregadas */
);

export default Loading;
