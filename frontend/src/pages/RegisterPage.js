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
  const { register, error, clearError } = useAuth();
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
      await register(formValues.username, formValues.fullName, formValues.email, formValues.password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChangeWrapper = (e) => {
    handleInputChange(e);
    if (error || formError) {
      clearError();
      clearFormError();
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Logo
          src="https://firebasestorage.googleapis.com/v0/b/connectrip-10205.appspot.com/o/task%2FConnecter-preview.png?alt=media&token=981e1443-05f7-4bfe-bc30-cc5be9bb4c57"
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
        <ScrollContainer>
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
        </ScrollContainer>
        <ButtonContainer>
          <Button type="submit">Registrar</Button>
        </ButtonContainer>
        {(error || formError) && <ErrorMessage>{formError || error}</ErrorMessage>}
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin: 5rem;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #fff;
`;

const Form = styled.form`
  padding: 1rem;
  max-width: 560px;
  width: 100%;
  max-height: 90vh;
  text-align: center;
  background: #1c1c1c;
  border-radius: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Text = styled.span`
  color: #fff;
  margin-left: 5px;
`;

const StyledLink = styled(Link)`
  color: #ea4f97;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const ScrollContainer = styled.div`
  width: 100%;
  max-height: 30vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  margin-top: 2rem;
  position: relative;
`;

export default RegisterForm;
