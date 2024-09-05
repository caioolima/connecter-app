// src/hooks/useAuth.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const useAuth = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

      // Decodifica o token para obter o nome do usuário
      const decodedToken = jwtDecode(data.token);
      const userName = decodedToken.name || 'Usuário';

      navigate(`/tasks/${encodeURIComponent(userName)}`);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao fazer login:', err);
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao registrar');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate(`/tasks/${encodeURIComponent(name)}`);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao registrar:', err);
    }
  };

  return { login, register, error };
};
