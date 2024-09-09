import React from 'react';
import styled from 'styled-components';

const NotFoundPage = () => (
  <ErrorContainer>
    <h1>Algo deu errado</h1>
    <p>Não conseguimos encontrar o que você estava procurando.</p>
  </ErrorContainer>
);

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: #121212;
  color: #fff;
  text-align: center;

  h1 {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.5rem;
  }
`;

export default NotFoundPage;
