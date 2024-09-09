import React from 'react';
import styled from 'styled-components';

// Componente PasswordContainer que recebe props e exibe filhos condicionalmente
const PasswordContainer = ({ show, children }) => (
  <StyledPasswordContainer show={show}>
    {children}
  </StyledPasswordContainer>
);

// Componente estilizado utilizando styled-components
const StyledPasswordContainer = styled.div`
  position: relative; // O container está posicionado relativamente ao seu elemento pai
  width: 100%; // Largura do container é 100% do elemento pai
  opacity: ${(props) => (props.show ? 1 : 0)}; // Controla a opacidade com base na prop "show"
  transform: ${(props) => (props.show ? 'translateY(0)' : 'translateY(-20px)')}; // Controla a posição vertical com base na prop "show"
  transition: opacity 0.5s ease, transform 0.5s ease; // Adiciona uma transição suave para as propriedades de opacidade e transformação
`;

// Exporta o componente PasswordContainer para uso em outros arquivos
export default PasswordContainer;
