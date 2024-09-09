import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Componente Button que renderiza um botão estilizado
const Button = ({ onClick, disabled, emptyEmail, children, type }) => (
  <StyledButton
    onClick={onClick}
    disabled={disabled}
    emptyEmail={emptyEmail}
    type={type}
  >
    {children} {/* Renderiza o conteúdo dentro do botão */}
  </StyledButton>
);

// Estilização do botão usando styled-components
const StyledButton = styled.button`
  position: absolute; /* Posiciona o botão absolutamente dentro do container pai */
  top: 50%; /* Centraliza verticalmente em relação ao container pai */
  right: 3.6rem; /* Posiciona o botão à direita */
  transform: translateY(-50%); /* Centraliza verticalmente em relação ao seu próprio tamanho */
  width: 2.2rem; /* Largura do botão */
  height: 2.2rem; /* Altura do botão */
  background: ${(props) =>
    props.emptyEmail
      ? '#a4a4ad' /* Cor de fundo se emptyEmail for true */
      : '#000'}; /* Cor de fundo padrão */
  border: none; /* Remove a borda padrão */
  color: #fff; /* Cor do texto do botão */
  border-radius: 50%; /* Torna o botão redondo */
  font-size: 1rem; /* Tamanho da fonte */
  font-weight: bold; /* Negrito para o texto */
  cursor: ${(props) =>
    props.emptyEmail
      ? 'default' /* Cursor padrão se emptyEmail for true */
      : 'pointer'}; /* Cursor de ponteiro padrão */
  padding: 0; /* Remove o padding padrão */
  display: flex; /* Usa flexbox para centralizar o conteúdo */
  align-items: center; /* Alinha o conteúdo verticalmente */
  justify-content: center; /* Alinha o conteúdo horizontalmente */

  &:hover {
    background: ${(props) =>
      props.emptyEmail
        ? '#a4a4ad' /* Cor de fundo ao passar o mouse se emptyEmail for true */
        : '#141414'}; /* Cor de fundo ao passar o mouse */
  }

  &:disabled {
    cursor: not-allowed; /* Cursor de não permitido para botão desativado */
    opacity: 0.5; /* Torna o botão semi-transparente */
  }

  @media (max-width: 768px) {
    width: 2rem; /* Ajusta a largura do botão para telas menores */
    height: 2rem; /* Ajusta a altura do botão para telas menores */
    font-size: 0.9rem; /* Ajusta o tamanho da fonte para telas menores */
    right: 1.6rem; /* Ajusta a posição do botão à direita para telas menores */
  }
`;

// Validação das props do componente Button usando PropTypes
Button.propTypes = {
  onClick: PropTypes.func, /* Função chamada ao clicar no botão */
  disabled: PropTypes.bool, /* Indica se o botão está desativado */
  emptyEmail: PropTypes.bool, /* Indica se o botão deve ter uma cor de fundo diferente */
  children: PropTypes.node.isRequired, /* Conteúdo que será exibido dentro do botão */
  type: PropTypes.string, /* Tipo do botão (por exemplo, "button", "submit") */
};

// Valores padrão para as props do componente Button
Button.defaultProps = {
  onClick: () => {}, /* Função vazia por padrão */
  disabled: false, /* O botão não está desativado por padrão */
  emptyEmail: false, /* Cor padrão para o botão */
  type: 'button', /* Tipo padrão do botão */
};

export default Button;
