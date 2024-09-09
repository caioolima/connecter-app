import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// Cria o contexto de autenticação
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Estados para armazenar erros de login e registro
  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  // Estado para armazenar o token do usuário e as informações do usuário
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    fullName: '',
    createdAt: '',
  });

  const navigate = useNavigate();

  // Efeito para decodificar o token e atualizar as informações do usuário
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserInfo({
          username: decodedToken.username || '',
          email: decodedToken.email || '',
          fullName: decodedToken.fullName || '',
          createdAt: decodedToken.createdAt || '',
        });
      } catch (error) {
        // Se houver um erro na decodificação do token, limpa o token e informações do usuário
        console.error('Erro ao decodificar o token', error);
        localStorage.removeItem('token');
        setToken('');
        setUserInfo({
          username: '',
          email: '',
          fullName: '',
          createdAt: '',
        });
      }
    } else {
      // Se não houver token, limpa as informações do usuário
      setUserInfo({
        username: '',
        email: '',
        fullName: '',
        createdAt: '',
      });
    }
  }, [token]);

  // Função para login do usuário
  const login = async (email, password) => {
    try {
      if (!email || !password) {
        throw new Error('E-mail e senha são obrigatórios.');
      }

      const response = await fetch('https://connecter-app-production.up.railway.app/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'E-mail ou senha incorretos. Verifique e tente novamente.');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setToken(data.token);

      const decodedToken = jwtDecode(data.token);
      setUserInfo({
        username: decodedToken.username || '',
        email: decodedToken.email || '',
        fullName: decodedToken.fullName || '',
        createdAt: decodedToken.createdAt || '',
      });

      window.location.reload();
    } catch (err) {
      setLoginError(err.message || 'Erro ao fazer login. Tente novamente mais tarde.');
      console.error('Erro ao fazer login:', err);
    }
  };

  // Função para registro do usuário
  const register = async (username, fullName, email, password) => {
    try {
      const response = await fetch('https://connecter-app-production.up.railway.app/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, fullName, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao registrar');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setToken(data.token);

      const decodedToken = jwtDecode(data.token);
      setUserInfo({
        username: decodedToken.username || '',
        email: decodedToken.email || '',
        fullName: decodedToken.fullName || '',
        createdAt: decodedToken.createdAt || '',
      });

      navigate('/login');
    } catch (err) {
      setRegisterError(err.message);
      console.error('Erro ao registrar:', err);
    }
  };

  // Função para logout do usuário
  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUserInfo({
      username: '',
      email: '',
      fullName: '',
      createdAt: '',
    });
    window.location.reload();
  };

  // Funções para limpar erros de login e registro
  const clearLoginError = () => setLoginError(null);
  const clearRegisterError = () => setRegisterError(null);

  // Provedor do contexto com valores e funções fornecidos
  return (
    <AuthContext.Provider value={{ login, register, logout, loginError, registerError, token, userInfo, clearLoginError, clearRegisterError }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);
