import React from 'react';
import styled, { createGlobalStyle } from 'styled-components'; // Adiciona createGlobalStyle
import { Link } from 'react-router-dom';
import { FaTasks, FaChartLine, FaRegLightbulb } from 'react-icons/fa'; // Ícones da biblioteca react-icons

const GlobalStyle = createGlobalStyle`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

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

const Intro = () => {
  return (
    <>
      <GlobalStyle /> {/* Adiciona o GlobalStyle ao JSX */}
      <IntroContainer>
        <Title>Connecter</Title>
        <IntroText>
          Transforme suas tarefas em conquistas com uma gestão simples e eficiente.
        </IntroText>
        <LoginButton to="/login">Iniciar Sessão</LoginButton>
        <FeaturesContainer>
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
        <CTASection>
          <h2>Pronto para começar?</h2>
          <p>Descubra como a Connecter pode transformar a forma como você gerencia suas tarefas.</p>
          <CTAButton to="/register">Criar minha conta</CTAButton>
        </CTASection>
        <TestimonialsContainer>
          <h2>O que nossos usuários dizem?</h2>
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

const IntroContainer = styled.div`
  text-align: center;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: #fff; /* Cor do texto branco para contraste */
  background-color: #000; /* Fundo preto */
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  margin-bottom: 1.7rem;
  animation: fadeIn 2s ease-in-out; /* Animação de entrada */
`;

const IntroText = styled.p`
  font-size: 2rem;
  color: #ccc;
  font-weight: bold;
  margin: 1rem auto 2rem;
  max-width: 600px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  animation: slideUp 1s ease-out; /* Animação de deslizamento para cima */
`;

const LoginButton = styled(Link)`
  background-color: #ea4f97; /* Rosa aplicado ao botão */
  color: #fff;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 20px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 2rem;
  transition: background-color 0.3s, transform 0.3s; /* Adiciona transição ao botão */
  text-decoration: none;
  animation: pulse 1.5s infinite; /* Animação de pulso */

  &:hover {
    color: #fff;
    background-color: #d43f82; /* Tom mais escuro do rosa ao passar o mouse */
    transform: scale(1.05); /* Levemente maior ao passar o mouse */
  }
`;

const FeaturesContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Permite que os widgets se ajustem à tela */
  justify-content: center;
  gap: 1rem; /* Espaçamento entre os cards */
`;

const Feature = styled.div`
  background: #fff; /* Fundo branco */
  border: 1px solid #ccc; /* Borda fina e sutil */
  border-radius: 10px;
  padding: 2rem;
  margin: 1rem;
  width: 250px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1); /* Sombra leve */
  color: #000;
  transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s; /* Transições para animação */

  &:hover {
    transform: translateY(-5px); /* Levanta o card ao passar o mouse */
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2); /* Aumenta a sombra ao passar o mouse */
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem; /* Tamanho do ícone */
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: #ea4f97; /* Rosa aplicado ao título do recurso */
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #333; /* Cor de texto mais escura para contraste */
`;

const CTASection = styled.div`
  font-size: 2rem;
  color: #ccc;
  font-weight: bold;
  margin: 1rem auto;
  max-width: 700px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  animation: fadeIn 2s ease-in-out;
  text-align: center;

  p {
    font-size: 1.2rem;
    margin-top: 1rem;
    color: #eee; /* Cor do texto do parágrafo */
    animation: slideUp 1s ease-out; /* Animação de deslizamento para cima */
  }
`;

const CTAButton = styled(Link)`
  background-color: #ea4f97; /* Rosa aplicado ao botão */
  color: #fff;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 20px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s, transform 0.3s;
  text-decoration: none;

  &:hover {
    color: #fff;
    background-color: #d43f82; /* Tom mais escuro do rosa ao passar o mouse */
    transform: scale(1.05);
  }
`;

const TestimonialsContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  font-size: 1.5rem;
`;

const Testimonial = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  border-left: 4px solid #ea4f97; /* Borda lateral com cor de destaque */
  background-color: #222; /* Fundo ligeiramente mais claro */
  border-radius: 5px;
  position: relative;
  overflow: hidden;
`;

const TestimonialText = styled.p`
  font-size: 1.2rem;
  color: #eee;
  padding: 0 2rem;
`;

const TestimonialAuthor = styled.p`
  font-size: 1rem;
  color: #ccc;
  font-style: italic;
  margin-top: 1rem;
  text-align: right;
`;

export default Intro;
