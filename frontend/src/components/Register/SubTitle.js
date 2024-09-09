import React from 'react';
import styled from 'styled-components';

// Componente Subtitle para exibir um subtítulo
const Subtitle = ({ children }) => <StyledSubtitle>{children}</StyledSubtitle>;

// Estilo para o componente Subtitle
const StyledSubtitle = styled.h2`
  width: 100%; /* Garante que o subtítulo ocupe toda a largura disponível do contêiner pai */
  margin-bottom: 1.5rem; /* Define a margem inferior para separar o subtítulo do conteúdo abaixo */
  font-size: 1rem; /* Define o tamanho da fonte do subtítulo */
  font-weight: 500; /* Define o peso da fonte, proporcionando um estilo semi-negrito */
  color: #fff; /* Define a cor do texto como branco */
`;

// Exporta o componente Subtitle para ser utilizado em outras partes da aplicação
export default Subtitle;
