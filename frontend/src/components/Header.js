import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaUserCircle } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode'; // Correção para importar jwtDecode corretamente

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [name, setName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setName(decodedToken.name || 'Usuário');
        localStorage.setItem('name', decodedToken.name || 'Usuário');
      } catch (error) {
        console.error('Erro ao decodificar o token', error);
      }
    }
  }, []);

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

  // Verifica se a rota atual é '/login'
  const isOnLoginPage = location.pathname === '/login';

  return (
    <Container>
      <StyledLink
        to={isAuthenticated ? `/tasks/${encodeURIComponent(name)}` : '/'}
      >
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
              <TaskLink to={`/tasks/create/${encodeURIComponent(name)}`}>
                Criar Tarefa
              </TaskLink>
              <TaskLink to={`/tasks/${encodeURIComponent(name)}`}>
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
  );
};

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.8); /* Branco com 80% de opacidade */
  height: 80px; /* Ajustado para um cabeçalho mais compacto */
  padding: 0 10px;
  margin: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Adiciona uma leve sombra */
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000; /* Garante que o cabeçalho fique acima de outros elementos */
  position: fixed; /* Fixa o cabeçalho no topo da página */
  backdrop-filter: blur(5px); /* Adiciona desfoque ao fundo do cabeçalho */
`;

const StyledLink = styled(Link)`
  display: flex; /* Usar flex para garantir que a logo esteja centralizada verticalmente */
  align-items: center;
  text-decoration: none;
  height: 100%; /* Garante que o link ocupe toda a altura do cabeçalho */
`;

const Logo = styled.img`
  height: 150px; /* Ajustado para garantir que a logo seja visível */
  width: auto; /* Mantém a proporção da logo */
  cursor: pointer; /* Adiciona um cursor de ponteiro para indicar que é clicável */
  /* Remover filtro de desfoque da logo */
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
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.2s;

  &:hover {
    background-color: #003d7a;
    transform: scale(1.05);
  }
`;

const TaskMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
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

const TaskLink = styled(Link)`
  font-size: 1rem;
  color: #007aff;
  text-decoration: none;
  padding: 0.5rem;
  transition:
    background-color 0.3s,
    color 0.3s;

  &:hover {
    background-color: #f1f1f1;
    color: #0051a8;
  }
`;

const LoginButton = styled(Link)`
  font-size: 1rem;
  color: #f70073;
  margin-right: 30px;
  text-decoration: none;
  padding: 0.5rem;
  border: 1px solid #f70073;
  border-radius: 6px;
  background-color: transparent;
  font-weight: bold;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;

  &:hover {
    background-color: #f70073;
    color: #fff;
  }
`;

export default Header;
