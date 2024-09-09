import React from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { FaTasks, FaChartLine, FaRegLightbulb } from 'react-icons/fa';

// Estilos Globais com animações
// Define estilos globais e animações para toda a aplicação
const GlobalStyle = createGlobalStyle`
  // Animação de keyframe para o efeito de fade-in (aparecimento gradual)
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  // Animação de keyframe para o efeito de slide-up (deslizar para cima)
  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  // Animação de keyframe para o efeito de pulso (escala pulsante)
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
`;

// Componente Intro
// Este componente serve como a página inicial ou seção introdutória da aplicação
const Intro = () => {
  return (
    <>
      <GlobalStyle />
      <IntroContainer>
        {/* Título principal da seção introdutória */}
        <Title>Connecter Notes</Title>
        {/* Texto introdutório curto */}
        <IntroText>Transforme suas tarefas em conquistas com uma gestão simples e eficiente.</IntroText>
        {/* Botão de login que leva para a página de login */}
        <LoginButton to="/login">Iniciar Sessão</LoginButton>
        {/* Container para as descrições das funcionalidades */}
        <FeaturesContainer>
          {/* Blocos individuais de funcionalidades */}
          <Feature>
            <FeatureIcon><FaTasks /></FeatureIcon>
            <FeatureTitle>Crie Tarefas</FeatureTitle>
            <FeatureDescription>Adicione e organize suas tarefas de forma simples e rápida.</FeatureDescription>
          </Feature>
          <Feature>
            <FeatureIcon><FaChartLine /></FeatureIcon>
            <FeatureTitle>Monitore a Situação</FeatureTitle>
            <FeatureDescription>Veja o progresso e mantenha-se no controle das suas atividades.</FeatureDescription>
          </Feature>
          <Feature>
            <FeatureIcon><FaRegLightbulb /></FeatureIcon>
            <FeatureTitle>Fácil e Prático</FeatureTitle>
            <FeatureDescription>Uma interface intuitiva que torna a gestão das tarefas mais fácil do que nunca.</FeatureDescription>
          </Feature>
        </FeaturesContainer>
        {/* Seção de chamada para ação (CTA) */}
        <CTASection>
          <h2>Pronto para começar?</h2>
          <p>Descubra como a Connecter pode transformar a forma como você gerencia suas tarefas.</p>
        </CTASection>
        {/* Botão de chamada para ação para criar uma conta */}
        <CTAButton to="/register">Criar minha conta</CTAButton>
        {/* Container para os depoimentos dos usuários */}
        <TestimonialsContainer>
          <h2>O que nossos usuários dizem?</h2>
          {/* Depoimento individual */}
          <Testimonial>
            <TestimonialText>
              "A Connecter mudou a forma como eu gerencio meu tempo e tarefas. Simples e eficaz!"
            </TestimonialText>
            <TestimonialAuthor>João Silva</TestimonialAuthor>
          </Testimonial>
          <Testimonial>
            <TestimonialText>
              "A interface é intuitiva e a gestão de tarefas nunca foi tão fácil. Recomendo!"
            </TestimonialText>
            <TestimonialAuthor>Maria Oliveira</TestimonialAuthor>
          </Testimonial>
        </TestimonialsContainer>
      </IntroContainer>
    </>
  );
};

// Componentes Estilizados
// Define os estilos para os componentes da página introdutória
const IntroContainer = styled.div`
  text-align: center;
  padding: 2rem;
  margin: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: #fff;
  background-color: #000;
  animation: fadeIn 2s ease-in;

  @media (max-width: 768px) {
    padding: 1rem;
    margin: 2rem;
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  margin-bottom: 1.7rem;
  overflow: hidden;
  color: #fff;
  animation: fadeIn 2s ease-in;

  @media (max-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const IntroText = styled.p`
  font-size: 2rem;
  color: #ccc;
  font-weight: bold;
  margin: 1rem auto 2rem;
  max-width: 600px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  animation: slideUp 1s ease-out;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin: 0.5rem auto 1rem;
  }
`;

const LoginButton = styled(Link)`
  background-color: #ea4f97;
  color: #fff;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 20px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: background-color 0.3s, transform 0.3s;
  text-decoration: none;
  animation: pulse 1.5s infinite;

  &:hover {
    color: #fff;
    background-color: #d43f82;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1.5rem;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

const FeaturesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  animation: fadeIn 2s ease-in;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const Feature = styled.div`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 2rem;
  margin: 1rem;
  width: 250px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  color: #000;
  transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s;
  animation: slideUp 1s ease-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 200px;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 1rem;
    margin: 0.5rem 0;
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: #ea4f97;
  margin-bottom: 0.5rem;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const CTASection = styled.div`
  text-align: center;
  margin: 3rem 0;
  animation: slideUp 1s ease-out;

  h2 {
    font-size: 2rem;
    color: #fff;
  }

  p {
    font-size: 1.2rem;
    color: #ccc;
    max-width: 600px;
    margin: 1rem auto;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.5rem;
    }

    p {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 1.2rem;
    }

    p {
      font-size: 0.9rem;
    }
  }
`;

const CTAButton = styled(Link)`
  background-color: #ea4f97;
  color: #fff;
  padding: 0.75rem 2rem;
  border-radius: 20px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  margin-top: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d43f82;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1.5rem;
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

const TestimonialsContainer = styled.div`
  margin: 3rem 0;
  text-align: center;
  animation: fadeIn 2s ease-in;

  h2 {
    font-size: 2rem;
    color: #fff;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 1.2rem;
    }
  }
`;

const Testimonial = styled.div`
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 1rem;
  margin: 1rem auto;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #000;

  @media (max-width: 768px) {
    padding: 0.75rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const TestimonialText = styled.p`
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const TestimonialAuthor = styled.p`
  font-size: 0.9rem;
  color: #666;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

export default Intro;
