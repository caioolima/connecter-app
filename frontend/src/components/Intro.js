// Intro.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Intro = () => {
  return (
    <IntroContainer>
      <Logo src="/connecter-intro.gif" alt="Connecter Intro" />
      <Title>Connecter</Title>
      <LoginButton to="/login">Iniciar Sessão</LoginButton>
      <IntroText>
        O melhor lugar para gerenciar suas tarefas e muito mais.
      </IntroText>
    </IntroContainer>
  );
};

const IntroContainer = styled.div`
  text-align: center;
  padding: 2rem; /* Espaçamento interno para melhor visualização */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Garante que o conteúdo fique centralizado verticalmente */
`;

const Logo = styled.img`
  width: 350px; /* Ajuste o tamanho conforme necessário */
  height: 350px;
  margin-bottom: -2rem; /* Diminuído o espaço entre o logo e o título */
  margin-top: 3rem; /* Ajuste para trazer a imagem mais para cima */
`;

const Title = styled.h1`
  font-size: 6rem;
  color: #000;
  font-weight: bold;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  margin-bottom: 1.7rem; /* Espaço entre o título e o texto */
`;

const IntroText = styled.p`
  font-size: 2rem;
  color: #000;
  font-weight: bold;
  margin: 1rem auto;
  max-width: 500px; /* Limita a largura do texto */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
`;

const LoginButton = styled(Link)`
  background-color: #000; /* Cor do botão */
  color: #fff;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 20px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 1.7rem;
  transition: background-color 0.3s;
  text-decoration: none;

  &:hover {
    color: #000;
    background-color: gray; /* Cor do botão ao passar o mouse */
  }
`;

export default Intro;
