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

const LoginPage = () => {
  const { login, error: authError, clearError } = useAuth(); // Pegue o erro de autenticação e clearError
  const { formValues, handleInputChange } = useFormState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loadingStartTime, setLoadingStartTime] = useState(null);
  const [minLoadingDuration] = useState(5000);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleShowPassword = () => {
    if (validateEmail(formValues.email)) {
      setShowPassword(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingStartTime(Date.now());
    clearError(); // Limpa qualquer erro anterior

    try {
      await login(formValues.email, formValues.password);
      const elapsedTime = Date.now() - loadingStartTime;
      const remainingTime = Math.max(minLoadingDuration - elapsedTime, 0);
      // Adicionar lógica para lidar com remainingTime, se necessário
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      // O erro será manipulado pela função clearError na AuthContext
    }
  };

  const handleChange = (e) => {
    handleInputChange(e); // Atualiza o valor do campo
    clearError(); // Limpa a mensagem de erro ao digitar
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Logo />
        <Title>Faça login com seu ID Connecter</Title>
        <EmailContainer>
          <Input
            name="email"
            type="email"
            placeholder="E-mail"
            value={formValues.email}
            onChange={handleChange} // Usa handleChange para limpar o erro
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
            onChange={handleChange} // Usa handleChange para limpar o erro
          />
          <Button type="submit">
            <FaArrowRight />
          </Button>
        </PasswordContainer>
        <RegisterLink to="/register">Criar um ID Connecter</RegisterLink>
        {authError && <ErrorMessage>{authError}</ErrorMessage>} {/* Exibe o erro de autenticação */}
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  margin-top: 9rem;
`;

const Form = styled.form`
  padding: 2rem;
  max-width: 560px;
  width: 100%;
  text-align: center;
  background: #1c1c1c;
  border-radius: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
`;

export default LoginPage;
