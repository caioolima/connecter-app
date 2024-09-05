// Header.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode'; // Correção: jwtDecode não é uma função default export.
import CreateTaskModal from '../CreateTaskModal';
import UserMenu from './UserMenu';
import TaskMenu from './TaskMenu';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [name, setName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setName(decodedToken.name || 'Usuário');
        setIsAuthenticated(true);
        setToken(token);
      } catch (error) {
        console.error('Erro ao decodificar o token', error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
  };

  const isOnLoginPage = location.pathname === '/login';

  return (
    <>
      <Container>
        <StyledLink to={isAuthenticated ? `/tasks/${encodeURIComponent(name)}` : '/'}>
          <Logo src="https://firebasestorage.googleapis.com/v0/b/connectrip-10205.appspot.com/o/task%2Fconnecter-logo-preview.png?alt=media&token=08d82f35-dfb6-4552-8024-4efffe218839" alt="Connecter Logo" />
        </StyledLink>
        {isAuthenticated ? (
          <MenuContainer>
            <MenuIcon onClick={toggleMenu}>
              <FaBars />
            </MenuIcon>
            <UserMenu name={name} onLogout={handleLogout} />
            {isMenuOpen && (
              <TaskMenu 
                onOpenCreateTaskModal={openCreateTaskModal} 
                onViewTasks={handleViewTasks} 
              />
            )}
          </MenuContainer>
        ) : (
          !isOnLoginPage && (
            <LoginButton to="/login">Fazer Login</LoginButton>
          )
        )}
      </Container>
      <CreateTaskModal 
        isOpen={isCreateTaskModalOpen} 
        onClose={closeCreateTaskModal} 
        onCreate={handleCreateTask} 
        token={token} 
      />
    </>
  );
};

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.8);
  height: 80px;
  padding: 0 10px;
  margin: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  position: fixed;
  backdrop-filter: blur(5px);
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 100%;
`;

const Logo = styled.img`
  height: 150px;
  width: auto;
  cursor: pointer;
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 1.2rem;
  color: white;
`;

const MenuIcon = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
  margin-right: 1rem;
`;

const LoginButton = styled(Link)`
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #fff;
    color: #333;
  }
`;

export default Header;
