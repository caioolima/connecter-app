import React, { useState } from 'react';
import styled from 'styled-components';
import { FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../Context/AuthContext';
import { useFormState } from '../hooks/useFormStates';
import Logo from '../components/Login/Logo';
import Title from '../components/Login/Title';
import EmailContainer from '../components/Login/EmailContainer';
import PasswordContainer from '../components/Login/PasswordContainer';
import Input from '../components/Login/Input';
import Button from '../components/Login/Button';
import RegisterLink from '../components/Login/RegisterLink';
import ErrorMessage from '../components/Login/ErrorMessage';

// Componente de formulário de login
const LoginForm = () => {
  // Obtém funções e estado do contexto de autenticação
  const { login, loginError, clearLoginError } = useAuth();
  // Obtém valores e funções para gerenciar o estado do formulário
  const { formValues, handleInputChange } = useFormState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a exibição da senha
  const [loadingStartTime, setLoadingStartTime] = useState(null); // Estado para controlar o início do carregamento
  const [minLoadingDuration] = useState(5000); // Duração mínima de carregamento

  // Função para validar o e-mail com regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Função para mostrar a senha, se o e-mail for válido
  const handleShowPassword = () => {
    if (validateEmail(formValues.email)) {
      setShowPassword(true);
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingStartTime(Date.now()); // Define o horário de início do carregamento
    clearLoginError(); // Limpa qualquer erro de login existente

    try {
      await login(formValues.email, formValues.password); // Tenta fazer o login
      const elapsedTime = Date.now() - loadingStartTime; // Calcula o tempo decorrido
      const remainingTime = Math.max(minLoadingDuration - elapsedTime, 0);
      // Lógica adicional pode ser adicionada para lidar com remainingTime, se necessário
    } catch (err) {
      console.error('Erro ao fazer login:', err); // Log de erros
    }
  };

  // Função para lidar com mudanças nos campos de entrada
  const handleChange = (e) => {
    handleInputChange(e);
    clearLoginError(); // Limpa a mensagem de erro ao digitar
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Logo /> {/* Componente logo */}
        <Title>Faça login com seu ID Connecter</Title> {/* Título do formulário */}
        <EmailContainer>
          <Input
            name="email"
            type="email"
            placeholder="E-mail"
            value={formValues.email}
            onChange={handleChange}
            autoFocus
          />
          {!showPassword && (
            <Button
              onClick={handleShowPassword}
              disabled={!validateEmail(formValues.email)}
              emptyEmail={!formValues.email}
            >
              <FaArrowRight />
            </Button>
          )}
        </EmailContainer>
        <PasswordContainer show={showPassword}>
          <Input
            name="password"
            type="password"
            placeholder="Senha"
            value={formValues.password}
            onChange={handleChange}
          />
          <Button type="submit">
            <FaArrowRight />
          </Button>
        </PasswordContainer>
        <RegisterLink to="/register">Criar um ID Connecter</RegisterLink>
        {loginError && <ErrorMessage>{loginError}</ErrorMessage>} {/* Mensagem de erro se houver */}
      </Form>
    </Container>
  );
};

// Estilo para o contêiner principal do formulário
const Container = styled.div`
  display: flex; /* Usa flexbox para layout */
  justify-content: center; /* Centraliza horizontalmente */
  align-items: center; /* Centraliza verticalmente */
  height: 60vh; /* Define a altura do contêiner como 60% da altura da viewport */
  margin-top: 9rem; /* Adiciona uma margem no topo */
`;

// Estilo para o formulário de login
const Form = styled.form`
  padding: 2rem; /* Adiciona espaçamento interno */
  max-width: 560px; /* Define a largura máxima */
  width: 100%; /* Define a largura como 100% do contêiner pai */
  text-align: center; /* Centraliza o texto */
  background: #1c1c1c; /* Define o fundo como uma cor escura */
  border-radius: 30px; /* Define o raio da borda */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4); /* Adiciona sombra ao formulário */
`;

export default LoginForm;
