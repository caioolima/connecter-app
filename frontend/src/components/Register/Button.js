import React from 'react';
import styled from 'styled-components';

// Componente Button, que exibe um botão estilizado e gerencia seus estados
const Button = ({ type, onClick, disabled, children }) => (
  <StyledButton type={type} onClick={onClick} disabled={disabled}>
    {children}
  </StyledButton>
);

// Estilo para o botão
const StyledButton = styled.button`
  width: 6.2rem; /* Largura do botão */
  height: 2.4rem; /* Altura do botão */
  padding: 0.5rem 1rem; /* Espaçamento interno: 0.5rem em cima e embaixo, 1rem nas laterais */
  margin-bottom: 2rem; /* Margem inferior para espaçamento entre elementos */
  background-color: #ea4f97; /* Cor de fundo do botão */
  border: none; /* Remove a borda padrão do botão */
  color: #fff; /* Cor do texto do botão */
  border-radius: 6px; /* Cantos arredondados do botão */
  font-size: 0.9rem; /* Tamanho da fonte */
  font-weight: bold; /* Peso da fonte em negrito */
  cursor: pointer; /* Muda o cursor para pointer quando o botão é clicável */
  transition: background-color 0.3s; /* Transição suave para a mudança de cor de fundo */

  &:hover {
    background-color: #d43f82; /* Cor de fundo quando o botão é hover (passado o mouse) */
  }

  &:disabled {
    cursor: not-allowed; /* Cursor muda para não permitido quando o botão está desativado */
    opacity: 0.5; /* Torna o botão semi-transparente quando desativado */
  }
`;

export default Button;
