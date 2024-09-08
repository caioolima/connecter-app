import { useState, useEffect } from 'react';

const useUserInfo = (username) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/user/${username}`);
        if (response.ok) {
          const data = await response.json();
          setFullName(data.fullName || 'Nome completo não disponível');
          setEmail(data.email || 'Email não disponível');
          setCreatedAt(formatDate(data.createdAt) || 'Data não disponível');
        } else {
          console.error('Erro ao carregar informações do usuário:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao carregar informações do usuário:', error);
      }
    };

    fetchUserInfo();
  }, [username]);

  // Extraindo o primeiro nome
  const firstName = fullName ? fullName.split(' ')[0] : 'Nome não disponível';

  return { firstName, fullName, email, createdAt };
};

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

export default useUserInfo;
