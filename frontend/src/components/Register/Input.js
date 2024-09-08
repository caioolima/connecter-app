import React from 'react';
import styled from 'styled-components';

const Input = ({ name, type, placeholder, value, onChange }) => (
  <StyledInput
    name={name}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

const StyledInput = styled.input`
  width: 100%; /* Ajusta para a largura completa do contêiner pai */
  max-width: 400px; /* Define um tamanho máximo para o input */
  padding: 0.75rem; /* Reduz o padding interno */
  padding-right: 3.5rem;
  border: 1px solid #a4a4ad;
  margin-bottom: 1rem;
  border-radius: 6px;
  font-size: 0.875rem; /* Ajusta o tamanho da fonte */
  color: #fff;
  background-color: #333;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #ea4f97;
    box-shadow: 0 0 0 2px rgba(234, 79, 151, 0.2);
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem; /* Ajusta o tamanho da fonte em telas menores */
    padding: 0.6rem; /* Ajusta o padding interno */
  }

  @media (max-width: 480px) {
    font-size: 0.75rem; /* Ajusta o tamanho da fonte em telas muito pequenas */
    padding: 0.5rem; /* Ajusta o padding interno */
  }
`;

export default Input;
