import React, { useRef, useEffect } from 'react'; // Importa o React e hooks useRef e useEffect para gerenciar referências e efeitos colaterais
import { Link } from 'react-router-dom'; // Importa o componente Link do react-router-dom para navegação entre páginas
import styled from 'styled-components'; // Importa styled-components para estilização dos componentes
import { FaBars, FaTimes } from 'react-icons/fa'; // Importa ícones para o menu
import UserMenu from './UserMenu'; // Importa o componente UserMenu
import TaskMenu from './TaskMenu'; // Importa o componente TaskMenu
import useHeader from '../../hooks/useHeader'; // Importa o hook personalizado useHeader para gerenciar o estado do cabeçalho

const Header = () => {
  // Desestrutura o estado e funções retornadas pelo hook useHeader
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
    loading, // Verifica se os dados estão carregando
  } = useHeader();

  // Referência para detectar cliques fora do TaskMenu
  const menuRef = useRef(null);

  // Efeito para detectar cliques fora do menu e fechar o menu de tarefas
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsTaskMenuOpen(false);
      }
    };

    // Adiciona evento de clique fora do menu
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Remove o evento de clique fora do menu ao desmontar o componente
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setIsTaskMenuOpen]);

  if (loading) {
    return null; // Retorna null enquanto os dados estão sendo carregados
  }

  return (
    <Container>
      <StyledLink to={isAuthenticated ? `/tasks/${encodeURIComponent(userInfo.username)}` : '/'}>
        <Logo src="/connecter-logo-preview.png" alt="Connecter Logo" />
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
              // Fecha o menu de tarefas se o menu de usuário for aberto
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

// Estilo do container do cabeçalho
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

// Estilo do link no cabeçalho
const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 100%;
`;

// Estilo do logo no cabeçalho
const Logo = styled.img`
  height: 30px;
  width: auto;
  cursor: pointer;
`;

// Estilo do container do menu
const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  color: #fff;
  margin-right: 2rem;
`;

// Estilo do ícone do menu
const MenuIcon = styled.div`
  font-size: 1.8rem;
  cursor: pointer;
  margin-right: 1.5rem;
  color: #fff;
  transition: color 0.3s ease, transform 0.3s ease; // Transição suave para cor e transformação

  &:hover {
    color: #ea4f97; // Cor do ícone ao passar o mouse
    transform: scale(1.1); // Leve aumento de escala ao passar o mouse
  }
`;

// Estilo do botão de login
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
  transition: background-color 0.3s, color 0.3s; // Transição suave para cor de fundo e cor do texto

  &:hover {
    background-color: #fff; // Cor de fundo ao passar o mouse
    color: #000; // Cor do texto ao passar o mouse
  }
`;

export default Header;
