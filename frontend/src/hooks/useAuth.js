import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
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
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer login');
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
    } catch (err) {
      setError(err.message);
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

      // Força o reload da página
      window.location.reload();
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
    navigate('/login');
  };

  return { login, register, logout, error, token, userInfo };
};
