import React from 'react';
import styled from 'styled-components';
import Button from './Button'; // Importa o componente Button, que pode ser utilizado dentro do EmailContainer
import Input from './Input';   // Importa o componente Input, que pode ser utilizado dentro do EmailContainer

// Componente EmailContainer que serve como um contêiner estilizado para elementos relacionados a e-mails
const EmailContainer = ({ children }) => (
  <StyledEmailContainer>
    {children} {/* Renderiza os elementos filhos passados como prop */}
  </StyledEmailContainer>
);

// Estilização do contêiner usando styled-components
const StyledEmailContainer = styled.div`
  position: relative; /* Define a posição relativa para permitir o posicionamento absoluto dos elementos filhos se necessário */
  width: 100%; /* Faz o contêiner ocupar toda a largura disponível */
  margin-bottom: 1rem; /* Adiciona uma margem inferior para espaçamento com outros elementos */
`;

export default EmailContainer;
