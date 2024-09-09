import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Importa a função para decodificar JWT

const useHeader = () => {
  // Hooks para navegação e localização
  const navigate = useNavigate();
  const location = useLocation();

  // Estado para controlar a visibilidade dos menus e modal
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isTaskMenuOpen, setIsTaskMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Estado para armazenar o token e as informações do usuário
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    fullName: '',
    createdAt: '',
  });
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
  }, [token]);

  // Efeito para redirecionar para a página de tarefas se o usuário estiver autenticado e na página de login
  useEffect(() => {
    if (loading) return; // Evita a execução enquanto está carregando

    if (token && userInfo.username && location.pathname === '/login') {
      navigate(`/tasks/${encodeURIComponent(userInfo.username)}`);
    }
  }, [loading, token, userInfo.username, location.pathname, navigate]);

  // Efeito para fechar os menus ao trocar de página
  useEffect(() => {
    setIsTaskMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  // Função para alternar a visibilidade do menu de tarefas
  const toggleTaskMenu = () => {
    if (isUserMenuOpen) {
      setIsUserMenuOpen(false);
    }
    setIsTaskMenuOpen(prev => !prev);
  };

  // Função para alternar a visibilidade do menu do usuário
  const toggleUserMenu = () => {
    if (isTaskMenuOpen) {
      setIsTaskMenuOpen(false);
    }
    setIsUserMenuOpen(prev => !prev);
  };

  // Função para abrir o modal de criar tarefa
  const openCreateTaskModal = () => {
    setIsCreateTaskModalOpen(true);
  };

  // Função para fechar o modal de criar tarefa
  const closeCreateTaskModal = () => {
    setIsCreateTaskModalOpen(false);
  };

  // Função para lidar com a criação de uma nova tarefa
  const handleCreateTask = (task) => {
    console.log('Nova tarefa criada:', task);
  };

  // Função para visualizar tarefas e navegar para a página de tarefas do usuário
  const handleViewTasks = () => {
    navigate('/user-tasks');
    setIsTaskMenuOpen(false); // Fecha o menu ao navegar
  };

  // Função para lidar com o logout do usuário
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUserInfo({
      username: '',
      email: '',
      fullName: '',
      createdAt: '',
    });
    navigate('/login');
    setIsTaskMenuOpen(false); // Fecha o menu ao deslogar
    setIsUserMenuOpen(false); // Fecha o menu ao deslogar
  };

  // Variáveis para verificar a página atual
  const isOnLoginPage = location.pathname === '/login';
  const isOnUserTasksPage = location.pathname === '/user-tasks';

  // Verifica se o usuário está autenticado com base no token e userInfo
  const isAuthenticated = !!token && !!userInfo.username;

  // Retorna os estados e funções necessárias para a lógica do cabeçalho
  return {
    isCreateTaskModalOpen,
    isTaskMenuOpen,
    isUserMenuOpen,
    token,
    userInfo,
    loading, 
    isOnLoginPage,
    isOnUserTasksPage,
    isAuthenticated,
    toggleTaskMenu,
    toggleUserMenu,
    openCreateTaskModal,
    closeCreateTaskModal,
    handleCreateTask,
    handleViewTasks,
    handleLogout,
    setIsTaskMenuOpen, 
  };
};

export default useHeader;
