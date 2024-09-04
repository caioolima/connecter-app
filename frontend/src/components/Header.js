import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import CreateTaskModal from './CreateTaskModal'; // Importa o componente do modal

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
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
        localStorage.setItem('name', decodedToken.name || 'Usuário');
        setIsAuthenticated(true);
        setToken(token); // Armazena o token
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
    localStorage.removeItem('name');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const openCreateTaskModal = () => {
    setIsCreateTaskModalOpen(true);
  };

  const closeCreateTaskModal = () => {
    setIsCreateTaskModalOpen(false);
  };

  const handleCreateTask = (task) => {
    // Aqui você pode adicionar lógica para lidar com a nova tarefa criada
    console.log('Nova tarefa criada:', task);
    // Por exemplo, você pode atualizar o estado de tarefas ou fazer outra ação
  };

  const handleTaks = () => {
    navigate('/user-tasks');
  }

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
            <UserMenu>
              <UserIcon onClick={toggleUserMenu}>
                <FaUserCircle />
              </UserIcon>
              {isUserMenuOpen && (
                <DropdownMenu>
                  <UserName>{name}</UserName>
                  <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
                </DropdownMenu>
              )}
            </UserMenu>
            {isMenuOpen && (
              <TaskMenu>
                <TaskLink onClick={openCreateTaskModal}>
                  Criar Tarefa
                </TaskLink>
                <TaskLink onClick={handleTaks}>
                  Ver Tarefas
                </TaskLink>
              </TaskMenu>
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
        onCreate={handleCreateTask} // Passa a função para o modal
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

const UserMenu = styled.div`
  position: relative;
`;

const UserIcon = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #007aff;
  border: 1px solid #0051a8;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1010;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const UserName = styled.div`
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const LogoutButton = styled.button`
  background-color: #0051a8;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #003d7a;
  }
`;

const TaskMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #333;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1000;
`;

const TaskLink = styled.div`
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #555;
  }
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
