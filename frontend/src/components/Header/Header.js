import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import UserMenu from './UserMenu';
import TaskMenu from './TaskMenu';

const Header = () => {
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
    setIsTaskMenuOpen(!isTaskMenuOpen);
  };

  const toggleUserMenu = () => {
    if (isTaskMenuOpen) {
      setIsTaskMenuOpen(false);
    }
    setIsUserMenuOpen(!isUserMenuOpen);
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

  return (
    <>
      <Container>
        <StyledLink to={isAuthenticated ? `/tasks/${encodeURIComponent(userInfo.username)}` : '/'}>
          <Logo src="https://firebasestorage.googleapis.com/v0/b/connectrip-10205.appspot.com/o/task%2Fconnecter-logo-preview.png?alt=media&token=5891cb1a-9b80-4908-ba62-ebf81bbeb46a" alt="Connecter Logo" />
        </StyledLink>
        {isAuthenticated && !isOnUserTasksPage ? (
          <MenuContainer>
            <MenuIcon onClick={toggleTaskMenu}>
              <FaBars />
            </MenuIcon>
            {isTaskMenuOpen && (
              <TaskMenu 
                onViewTasks={() => {
                  handleViewTasks();
                  setIsTaskMenuOpen(false); // Fecha o menu ao clicar na opção
                }} 
              />
            )}
            <UserMenu
              name={userInfo.fullName}
              onLogout={handleLogout}
              onClick={() => {
                toggleUserMenu();
                // Fechar o menu de tarefas se o menu de usuário for aberto
                if (isTaskMenuOpen) {
                  setIsTaskMenuOpen(false);
                }
              }}
              isOpen={isUserMenuOpen}
            />
            {isUserMenuOpen && !isTaskMenuOpen && (
              <UserMenu 
                name={userInfo.fullName} 
                onLogout={handleLogout} 
              />
            )}
          </MenuContainer>
        ) : isAuthenticated && !isOnLoginPage ? (
          <MenuContainer>
            <UserMenu name={userInfo.fullName} onLogout={handleLogout} />
          </MenuContainer>
        ) : !isAuthenticated && !isOnUserTasksPage ? (
          <LoginButton to="/login">Fazer Login</LoginButton>
        ) : null}
      </Container>
    </>
  );
};

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.6);
  height: 80px;
  padding: 0 20px;
  margin: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  position: fixed;
  backdrop-filter: blur(8px);
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 100%;
`;

const Logo = styled.img`
  height: 30px;
  width: auto;
  cursor: pointer;
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  color: #fff;
  margin-right: 2rem;
`;

const MenuIcon = styled.div`
  font-size: 1.8rem;
  cursor: pointer;
  margin-right: 1.5rem;
  color: #fff;
`;

const LoginButton = styled(Link)`
  color: #fff;
  text-decoration: none;
  background-color: #000;
  margin-right: 2rem;
  padding: 0.6rem 1.2rem;
  border: 3px solid #fff;
  border-radius: 6px;
  font-weight: bold;
  font-size: 1rem;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #fff;
    color: #000;
  }
`;

export default Header;
