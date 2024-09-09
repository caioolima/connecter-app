import React from 'react';
import styled from 'styled-components';

// Componente para a página de erro 404 (não encontrado)
const NotFoundPage = () => (
  <ErrorContainer>
    <h1>Algo deu errado</h1>
    <p>Não conseguimos encontrar o que você estava procurando.</p>
  </ErrorContainer>
);

// Estilo do contêiner de erro, centralizando o conteúdo vertical e horizontalmente
const ErrorContainer = styled.div`
  display: flex; /* Usa flexbox para layout */
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente */
  flex-direction: column; /* Alinha os itens em coluna */
  height: 100vh; /* Define a altura do contêiner como 100% da altura da viewport */
  background-color: #121212; /* Define o fundo como uma cor escura */
  color: #fff; /* Define a cor do texto como branca */
  text-align: center; /* Centraliza o texto */

  h1 {
    font-size: 3rem; /* Define o tamanho da fonte para o título */
    margin-bottom: 20px; /* Adiciona espaço abaixo do título */
  }

  p {
    font-size: 1.5rem; /* Define o tamanho da fonte para o parágrafo */
  }
`;

export default NotFoundPage;
