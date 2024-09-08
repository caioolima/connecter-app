import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import useClickOutside from '../../hooks/useClickOutside'; // Importar o hook customizado

const UserMenu = ({ name, onLogout }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const ref = useClickOutside(() => {
    // Fecha o menu quando clicar fora
    setIsUserMenuOpen(false);
  });

  return (
    <UserMenuContainer ref={ref}>
      <UserIcon onClick={toggleUserMenu}>
        <FaUserCircle />
      </UserIcon>
      {isUserMenuOpen && (
        <DropdownMenu>
          <UserName>{name}</UserName>
          <LogoutButton onClick={onLogout}>Sair</LogoutButton>
        </DropdownMenu>
      )}
    </UserMenuContainer>
  );
};

const UserMenuContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const UserIcon = styled.div`
  font-size: 2.4rem;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #333;
  padding: 0.4rem;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  border: 1px solid #fff; /* Borda branca discreta */

  &:hover {
    background-color: #444; /* Cor de fundo sutilmente mais clara no hover */
    border-color: #ea4f97; /* Cor da borda ao passar o mouse */
    color: #ea4f97; /* Cor do ícone no hover */
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 110%;
  right: 0;
  background-color: #1e1e1e; /* Preto escuro para o menu */
  border: 1px solid #444; /* Borda cinza escura para um toque mais discreto */
  border-radius: 8px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.4); /* Sombra mais suave */
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  z-index: 1010;
  min-width: 130px; /* Largura menor e mais compacta */
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
  font-size: 1rem; /* Tamanho da fonte menor */
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.5rem;
  text-align: center;
  padding: 0 1rem; /* Adiciona padding horizontal para mais espaço */
`;

const LogoutButton = styled.button`
  background-color: #ea4f97; /* Cor de fundo rosa */
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.4rem 0.8rem; /* Diminuído padding para tamanho mais compacto */
  cursor: pointer;
  margin: 0 auto;
  font-size: 0.9rem; /* Tamanho da fonte reduzido */
  transition: background-color 0.3s ease, transform 0.3s ease;
  width: 80px; /* Largura ajustada para conteúdo */
  text-align: center;

  &:hover {
    background-color: #d93e8a; /* Tom mais escuro do rosa para hover */
    transform: scale(1.05); /* Efeito de aumento suave */
  }

  &:focus {
    outline: 3px solid #ea4f97; /* Destaque ao focar no botão */
  }
`;

export default UserMenu;
