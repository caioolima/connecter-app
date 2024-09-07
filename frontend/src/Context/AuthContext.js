// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    fullName: '',
    createdAt: '',
  });
  const navigate = useNavigate();

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
      setUserInfo({
        username: '',
        email: '',
        fullName: '',
        createdAt: '',
      });
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      // Verifica se todos os campos obrigatórios estão preenchidos
      if (!email || !password) {
        throw new Error('E-mail e senha são obrigatórios.');
      }
  
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      // Verifica se a resposta foi bem-sucedida
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'E-mail ou senha incorretos. Verifique e tente novamente.');
      }
  
      // Processa a resposta se o login for bem-sucedido
      const data = await response.json();
      localStorage.setItem('token', data.token);
      setToken(data.token);
  
      // Atualiza o estado com o usuário decodificado
      const decodedToken = jwtDecode(data.token);
      setUserInfo({
        username: decodedToken.username || '',
        email: decodedToken.email || '',
        fullName: decodedToken.fullName || '',
        createdAt: decodedToken.createdAt || '',
      });
  
      // Atualiza a página ou navega para outra página conforme necessário
      window.location.reload();
    } catch (err) {
      // Atualiza o estado de erro e exibe a mensagem de erro
      setError(err.message || 'Erro ao fazer login. Tente novamente mais tarde.');
      console.error('Erro ao fazer login:', err);
    }
  };

  const register = async (username, fullName, email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
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

      // Atualiza o estado com o usuário decodificado
      const decodedToken = jwtDecode(data.token);
      setUserInfo({
        username: decodedToken.username || '',
        email: decodedToken.email || '',
        fullName: decodedToken.fullName || '',
        createdAt: decodedToken.createdAt || '',
      });

      navigate('/login');
    } catch (err) {
      setError(err.message);
      console.error('Erro ao registrar:', err);
    }
  };

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

  // Adiciona a função clearError
  const clearError = () => setError(null);

  return (
    <AuthContext.Provider value={{ login, register, logout, error, token, userInfo, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
