import React from 'react';
import styled from 'styled-components';

// Componente Title para exibir um título principal
const Title = ({ children }) => <StyledTitle>{children}</StyledTitle>;

// Estilo para o componente Title
const StyledTitle = styled.h2`
  width: 100%; /* Garante que o título ocupe toda a largura disponível do contêiner pai */
  font-size: 2rem; /* Define o tamanho da fonte do título, tornando-o maior para destacar o texto */
  font-weight: 500; /* Define o peso da fonte para um estilo semi-negrito, tornando o texto destacado mas não excessivamente grosso */
  color: #fff; /* Define a cor do texto como branco para garantir legibilidade em fundos escuros */
  border-bottom: 2px solid #fff; /* Adiciona uma borda inferior branca de 2 pixels para destacar o título e separá-lo do conteúdo abaixo */
  padding-bottom: 1rem; /* Adiciona espaçamento interno abaixo do texto para criar um espaço entre o texto e a borda inferior */
  margin-bottom: 1rem; /* Define a margem inferior para separar o título do conteúdo subsequente */
`;

// Exporta o componente Title para ser utilizado em outras partes da aplicação
export default Title;
