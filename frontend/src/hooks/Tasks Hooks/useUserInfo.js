import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useUserInfo = (username) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`https://connecter-app-production.up.railway.app/api/users/user/${username}`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setFullName(data.fullName || 'Nome completo não disponível');
            setEmail(data.email || 'Email não disponível');
            setCreatedAt(formatDate(data.createdAt) || 'Data não disponível');
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [username]);

  useEffect(() => {
    if (error) {
      navigate('/error'); // Redireciona para a página de erro
    }
  }, [error, navigate]);

  const firstName = fullName ? fullName.split(' ')[0] : 'Nome não disponível';

  return { firstName, fullName, email, createdAt, loading, error };
};

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

export default useUserInfo;
