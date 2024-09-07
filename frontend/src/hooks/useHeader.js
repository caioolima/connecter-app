// useHeader.js
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const useHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [isTaskMenuOpen, setIsTaskMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    fullName: '',
    createdAt: '',
  });
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    if (loading) return; // Evita a execução enquanto está carregando

    if (token && userInfo.username && location.pathname === '/login') {
      navigate(`/tasks/${encodeURIComponent(userInfo.username)}`);
    }
  }, [loading, token, userInfo.username, location.pathname, navigate]);

  useEffect(() => {
    // Fechar os menus ao trocar de página
    setIsTaskMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  const toggleTaskMenu = () => {
    if (isUserMenuOpen) {
      setIsUserMenuOpen(false);
    }
    setIsTaskMenuOpen(prev => !prev);
  };

  const toggleUserMenu = () => {
    if (isTaskMenuOpen) {
      setIsTaskMenuOpen(false);
    }
    setIsUserMenuOpen(prev => !prev);
  };

  const openCreateTaskModal = () => {
    setIsCreateTaskModalOpen(true);
  };

  const closeCreateTaskModal = () => {
    setIsCreateTaskModalOpen(false);
  };

  const handleCreateTask = (task) => {
    console.log('Nova tarefa criada:', task);
  };

  const handleViewTasks = () => {
    navigate('/user-tasks');
    setIsTaskMenuOpen(false); // Fecha o menu ao navegar
  };

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

  const isOnLoginPage = location.pathname === '/login';
  const isOnUserTasksPage = location.pathname === '/user-tasks';

  // Verifica se o usuário está autenticado com base no token e userInfo
  const isAuthenticated = !!token && !!userInfo.username;

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
    setIsTaskMenuOpen, // Adicionando a função aqui
  };
};

export default useHeader;
