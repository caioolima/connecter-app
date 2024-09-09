import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useFormState } from '../hooks/useFormStates';
import Logo from '../components/Register/Logo';
import Title from '../components/Register/Title';
import Subtitle from '../components/Register/SubTitle';
import Input from '../components/Register/Input';
import Button from '../components/Register/Button';
import ErrorMessage from '../components/Register/ErrorMessage';

const RegisterForm = () => {
  const { register, registerError, clearRegisterError } = useAuth();
  const { formValues, formError, handleInputChange, setError, clearError: clearFormError } = useFormState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValues.password !== formValues.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    try {
      clearFormError();
      clearRegisterError();
      await register(formValues.username, formValues.fullName, formValues.email, formValues.password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChangeWrapper = (e) => {
    handleInputChange(e);
    if (registerError || formError) {
      clearRegisterError();
      clearFormError();
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Logo
          src={`${process.env.PUBLIC_URL}/Connecter-form-preview.png`}
          alt="Connecter Intro"
        />
        <Title>Criar seu ID Connecter</Title>
        <Subtitle>
          Um ID Connecter é o que você precisa para acessar o gerenciador.
          <br />
          <Text>
            Já tem um ID? <StyledLink to="/login">Faça login</StyledLink>
          </Text>
        </Subtitle>
        <Input
          name="username"
          type="text"
          placeholder="Nome de Usuário"
          value={formValues.username}
          onChange={handleInputChangeWrapper}
        />
        <Input
          name="fullName"
          type="text"
          placeholder="Nome Completo"
          value={formValues.fullName}
          onChange={handleInputChangeWrapper}
        />
        <Input
          name="email"
          type="email"
          placeholder="E-mail"
          value={formValues.email}
          onChange={handleInputChangeWrapper}
        />
        <Input
          name="password"
          type="password"
          placeholder="Senha"
          value={formValues.password}
          onChange={handleInputChangeWrapper}
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirme a Senha"
          value={formValues.confirmPassword}
          onChange={handleInputChangeWrapper}
        />
        <ButtonContainer>
          <Button type="submit">Registrar</Button>
        </ButtonContainer>
        {(registerError || formError) && <ErrorMessage>{formError || registerError}</ErrorMessage>}
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 1rem;
  margin: 8rem auto;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Ajuste a altura conforme necessário */
`;

const Form = styled.form`
  padding: 1rem;
  max-width: 500px;
  width: 100%;
  text-align: center;
  background: #1c1c1c;
  border-radius: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    width: 90%;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 1rem;
    border-radius: 20px;
  }
`;

const Text = styled.span`
  color: #fff;
  margin-left: 5px;
  font-size: 0.9rem;
`;

const StyledLink = styled(Link)`
  color: #ea4f97;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 2rem;
`;

export default RegisterForm;
