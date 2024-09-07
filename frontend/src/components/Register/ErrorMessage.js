import React from 'react';
import styled from 'styled-components';

const ErrorMessage = ({ children }) => (
  <StyledErrorMessage aria-live="assertive">{children}</StyledErrorMessage>
);

const StyledErrorMessage = styled.div`
  color: red;
  margin-top: 1rem;
  position: absolute;
  font-weight: bold;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
`;

export default ErrorMessage;
