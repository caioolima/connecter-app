import React from 'react';
import styled from 'styled-components';

// Componente ErrorMessage para exibir mensagens de erro
const ErrorMessage = ({ children }) => (
  <StyledErrorMessage aria-live="assertive">
    {children}
  </StyledErrorMessage>
);

// Estilo para a mensagem de erro
const StyledErrorMessage = styled.div`
  color: red; /* Cor do texto da mensagem de erro */
  font-weight: bold; /* Deixa o texto em negrito para maior destaque */
  position: absolute; /* Posiciona o elemento absolutamente em relação ao seu contêiner pai */
  bottom: 2px; /* Define a distância da parte inferior do contêiner pai */
  left: 50%; /* Alinha o elemento ao meio horizontalmente */
  transform: translateX(-50%); /* Ajusta a posição horizontal para garantir que o elemento esteja centralizado */
  width: 90%; /* Largura do elemento como uma porcentagem do contêiner pai */
  text-align: center; /* Centraliza o texto dentro do elemento */
  padding: 10px; /* Adiciona espaçamento interno para melhorar a aparência */
`;

// Exporta o componente para ser utilizado em outras partes da aplicação
export default ErrorMessage;
