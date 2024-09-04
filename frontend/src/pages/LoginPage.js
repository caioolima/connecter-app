// LoginPage.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom'; // Importa Link do react-router-dom
import { FaArrowRight } from 'react-icons/fa'; // Importa ícone de seta
import { jwtDecode } from 'jwt-decode';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Resetar para o estado inicial se o email for apagado ou inválido
    if (!emailValue || !validateEmail(emailValue)) {
      setShowPassword(false);
    }
  };

  const handleShowPassword = () => {
    // Mostrar o campo de senha apenas se o email for válido
    if (validateEmail(email)) {
      setShowPassword(true);
    }
  };

  const validateEmail = (email) => {
    // Regex simples para validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Error logging in');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);

      // Decodificar o token para obter o nome do usuário
      const decodedToken = jwtDecode(data.token);
      const userName = decodedToken.name || 'Usuário';

      // Redirecionar para a página de tarefas com o nome do usuário
      navigate(`/tasks/${encodeURIComponent(userName)}`);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
      <Logo src="https://firebasestorage.googleapis.com/v0/b/connectrip-10205.appspot.com/o/task%2FConnecter-form-preview.png?alt=media&token=da607aba-6727-4eee-a65a-968c88455272" alt="Connecter Intro" />
        <Title>Faça login com seu ID Connecter</Title>
        <EmailContainer>
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={handleEmailChange}
            autoFocus
          />
          {!showPassword && (
            <Button
              onClick={handleShowPassword}
              disabled={!validateEmail(email)}
              emptyEmail={!email}
            >
              <FaArrowRight /> {/* Ícone de seta */}
            </Button>
          )}
        </EmailContainer>
        {showPassword && (
          <PasswordContainer>
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">
              <FaArrowRight /> {/* Ícone de seta */}
            </Button>
          </PasswordContainer>
        )}
        <RegisterLink to="/register">Criar um ID Connecter</RegisterLink>{' '}
        {/* Novo link para criar ID */}
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  margin-top: 7rem; /* Ajuste para trazer a imagem mais para cima */
`;

const Form = styled.form`
  padding: 2rem;
  max-width: 560px;
  width: 100%;
  text-align: center;
  background: white;
  border-radius: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
`;

const Logo = styled.img`
  width: 200px; /* Ajuste o tamanho conforme necessário */
  height: 190px;
  margin-bottom: -1rem; /* Diminuído o espaço entre o logo e o título */
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
`;

const EmailContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
`;

const PasswordContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 70%;
  padding: 1.2rem;
  padding-right: 3.5rem; /* Aumenta o padding para criar mais espaço para o botão */
  border: 1px solid #a4a4ad;
  border-radius: 12px;
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

const Button = styled.button`
  position: absolute;
  top: 50%;
  right: 3.6rem; /* Ajusta a posição do botão */
  transform: translateY(-50%);
  width: 2.2rem; /* Ajustar para o tamanho desejado */
  height: 2.2rem;
  background: ${(props) =>
    props.emptyEmail
      ? '#d0d0d5'
      : '#007aff'}; /* Cor diferente quando o email está vazio */
  border: none;
  color: #ffffff;
  border-radius: 50%;
  font-size: 1rem; /* Ajustar tamanho do ícone */
  font-weight: bold; /* Deixa a seta em negrito */
  cursor: ${(props) =>
    props.emptyEmail
      ? 'default'
      : 'pointer'}; /* Desabilita o cursor pointer se o email estiver vazio */
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${(props) =>
      props.emptyEmail
        ? '#d0d0d5'
        : '#0051a8'}; /* Cor diferente quando o email está vazio */
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const RegisterLink = styled(Link)`
  display: block;
  margin-top: 1.5rem;
  color: #007aff;
  font-size: 1rem;
  text-decoration: none;
`;

export default LoginPage;
