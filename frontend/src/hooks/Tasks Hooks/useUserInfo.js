import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Hook personalizado para buscar e gerenciar informações do usuário
const useUserInfo = (username) => {
  // Estados para armazenar as informações do usuário e o status de carregamento e erro
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate(); // Hook para navegação entre páginas

  useEffect(() => {
    // Função assíncrona para buscar as informações do usuário
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`https://connecter-app-production.up.railway.app/api/users/user/${username}`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            // Atualiza os estados com as informações do usuário ou valores padrão
            setFullName(data.fullName || 'Nome completo não disponível');
            setEmail(data.email || 'Email não disponível');
            setCreatedAt(formatDate(data.createdAt) || 'Data não disponível');
          } else {
            setError(true); // Define erro se não houver dados
          }
        } else {
          setError(true); // Define erro se a resposta não for bem-sucedida
        }
      } catch (error) {
        setError(true); // Define erro se houver uma exceção
      } finally {
        setLoading(false); // Define loading como false após a tentativa de busca
      }
    };

    fetchUserInfo(); // Chama a função para buscar as informações do usuário
  }, [username]); // Reexecuta o efeito se o username mudar

  useEffect(() => {
    if (error) {
      navigate('/error'); // Redireciona para a página de erro se houver um erro
    }
  }, [error, navigate]); // Reexecuta o efeito se o erro mudar

  // Função para obter o primeiro nome do usuário
  const firstName = fullName ? fullName.split(' ')[0] : 'Nome não disponível';

  return { firstName, fullName, email, createdAt, loading, error };
};

// Função para formatar a data no formato DD/MM/AAAA
const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

export default useUserInfo;
