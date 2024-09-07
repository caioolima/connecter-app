import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useInput } from '../hooks/useInput';

const RegisterForm = () => {
  const { register, error } = useAuth();
  const { value: username, onChange: handleUsernameChange } = useInput('');
  const { value: fullName, onChange: handleFullNameChange } = useInput('');
  const { value: email, onChange: handleEmailChange } = useInput('');
  const { value: password, onChange: handlePasswordChange } = useInput('');
  const { value: confirmPassword, onChange: handleConfirmPasswordChange } = useInput('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
    try {
      await register(username, fullName, email, password);
    } catch (err) {
      alert(err.message); // Exibe o erro para o usuário
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Logo
          src="https://firebasestorage.googleapis.com/v0/b/connectrip-10205.appspot.com/o/task%2FConnecter-form-preview.png?alt=media&token=da607aba-6727-4eee-a65a-968c88455272"
          alt="Connecter Intro"
        />
        <Title>
          Um ID Connecter é o que você precisa para acessar o gerenciador.
          <br />
          <Text>
            Já tem um ID? <StyledLink to="/login">Faça login</StyledLink>
          </Text>
        </Title>

        <Input
          type="text"
          placeholder="Nome de Usuário"
          value={username}
          onChange={handleUsernameChange}
        />
        <Input
          type="text"
          placeholder="Nome Completo"
          value={fullName}
          onChange={handleFullNameChange}
        />
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={handlePasswordChange}
        />
        <Input
          type="password"
          placeholder="Confirme a Senha"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <ButtonContainer>
          <Button type="submit">Registrar</Button>
        </ButtonContainer>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </Container>
  );
};

// Estilos CSS com styled-components
const Container = styled.div`
  display: flex;
  margin: 2rem;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin-bottom: 4rem;
  margin-top: 7rem; /* Ajuste para trazer a imagem mais para cima */
`;

const Form = styled.form`
  padding: 2rem;
  max-width: 560px;
  width: 100%;
  height: 80vh;
  text-align: center;
  background: white;
  border-radius: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
`;

const Logo = styled.img`
  width: 200px;
  height: 190px;
  margin-bottom: -1rem;
`;

const Title = styled.h2`
  width: 100%; /* Corrigido */
  margin-bottom: 2rem;
  font-size: 1rem;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
`;

const Text = styled.span`
  color: #000;
  margin-left: 5px;
`;

const StyledLink = styled(Link)`
  color: #007aff;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const Input = styled.input`
  width: 70%;
  padding: 1rem;
  padding-right: 3.5rem;
  border: 1px solid #a4a4ad;
  margin-bottom: 1rem;
  border-radius: 6px;
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;

  &:focus {
    border-color: #007aff;
    box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.2);
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 90%;
  justify-content: flex-end;
`;

const Button = styled.button`
  width: 6.2rem;
  height: 2.2rem;
  padding: 0.7rem 1rem;
  background-color: #007aff;
  border: none;
  color: #fff;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0051a8;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 1rem;
`;

export default RegisterForm;
