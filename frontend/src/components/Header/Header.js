import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importa o ícone de "x"
import UserMenu from './UserMenu';
import TaskMenu from './TaskMenu';
import useHeader from '../../hooks/useHeader';

const Header = () => {
  const {
    isTaskMenuOpen,
    isUserMenuOpen,
    userInfo,
    isOnLoginPage,
    isOnUserTasksPage,
    isAuthenticated,
    toggleTaskMenu,
    toggleUserMenu,
    handleViewTasks,
    handleLogout,
    setIsTaskMenuOpen,
  } = useHeader();

  // Referência para detectar clique fora do TaskMenu
  const menuRef = useRef(null);

  // Efeito para detectar cliques fora do menu e fechar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsTaskMenuOpen(false);
      }
    };

    // Adiciona evento ao clicar fora
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Remove evento ao desmontar
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsTaskMenuOpen]);

  return (
    <Container>
      <StyledLink to={isAuthenticated ? `/tasks/${encodeURIComponent(userInfo.username)}` : '/'}>
        <Logo src="https://firebasestorage.googleapis.com/v0/b/connectrip-10205.appspot.com/o/task%2Fconnecter-logo-preview.png?alt=media&token=5891cb1a-9b80-4908-ba62-ebf81bbeb46a" alt="Connecter Logo" />
      </StyledLink>
      {isAuthenticated && !isOnUserTasksPage ? (
        <MenuContainer ref={menuRef}>
          <MenuIcon onClick={toggleTaskMenu}>
            {isTaskMenuOpen ? <FaTimes /> : <FaBars />} {/* Exibe FaTimes quando o menu está aberto, FaBars quando está fechado */}
          </MenuIcon>
          {isTaskMenuOpen && (
            <TaskMenu
              onViewTasks={() => {
                handleViewTasks();
                setIsTaskMenuOpen(false);
              }}
              onClose={() => setIsTaskMenuOpen(false)}
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
        </MenuContainer>
      ) : isAuthenticated && !isOnLoginPage ? (
        <MenuContainer>
          <UserMenu name={userInfo.fullName} onLogout={handleLogout} />
        </MenuContainer>
      ) : !isAuthenticated && !isOnLoginPage ? (
        <LoginButton to="/login">Fazer Login</LoginButton>
      ) : null}
    </Container>
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
  transition: color 0.3s ease, transform 0.3s ease; /* Adicionada a transição */

  &:hover {
    color: #ea4f97; /* Cor do ícone ao passar o mouse */
    transform: scale(1.1); /* Leve aumento de escala ao passar o mouse */
  }
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
