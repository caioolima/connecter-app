// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);
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

  const register = async (username, fullName, email, password) => {
    try {
      const response = await fetch('https://connecter-app-production.up.railway.app//api/users/register', {
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

  const clearLoginError = () => setLoginError(null);
  const clearRegisterError = () => setRegisterError(null);

  return (
    <AuthContext.Provider value={{ login, register, logout, loginError, registerError, token, userInfo, clearLoginError, clearRegisterError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
