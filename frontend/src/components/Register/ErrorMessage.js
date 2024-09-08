import React from 'react';
import styled from 'styled-components';

const ErrorMessage = ({ children }) => (
  <StyledErrorMessage aria-live="assertive">{children}</StyledErrorMessage>
);

const StyledErrorMessage = styled.div`
color: red;
font-weight: bold;
position: absolute;
bottom: 10px; /* Ajuste conforme necessário */
left: 50%;
transform: translateX(-50%);
width: 90%; /* Ajuste conforme necessário */
text-align: center;
`;


export default ErrorMessage;
