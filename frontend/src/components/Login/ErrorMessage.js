import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Componente ErrorMessage que exibe uma mensagem de erro estilizada
const ErrorMessage = ({ children }) => <StyledErrorMessage>{children}</StyledErrorMessage>;

// Componente estilizado para exibir mensagens de erro
const StyledErrorMessage = styled.div`
  color: #ff0000; /* Define a cor do texto como vermelho para destacar mensagens de erro */
  margin-top: 1rem; /* Adiciona margem superior para espaçamento com elementos acima */
  font-weight: bold; /* Torna o texto negrito para maior ênfase */
`;

// Define os tipos de propriedades esperadas para o componente ErrorMessage
ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired, // O componente deve receber um filho do tipo node (elementos React, texto, etc.)
};

export default ErrorMessage;
