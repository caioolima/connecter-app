import React from 'react';
import styled from 'styled-components';

const Button = ({ type, onClick, disabled, children }) => (
  <StyledButton type={type} onClick={onClick} disabled={disabled}>
    {children}
  </StyledButton>
);

const StyledButton = styled.button`
  width: 6.2rem;
  height: 2.4rem;
  padding: 0.5rem 1rem;
  margin-bottom: 2rem;
  background-color: #ea4f97;
  border: none;
  color: #fff;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d43f82;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export default Button;
