import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import useClickOutside from '../../hooks/useClickOutside'; // Importa o hook customizado para detectar cliques fora do componente

const UserMenu = ({ name, onLogout }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // Estado para controlar a abertura e fechamento do menu

  // Função para alternar a visibilidade do menu
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Hook personalizado para fechar o menu quando clicar fora dele
  const ref = useClickOutside(() => {
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

// Container para o menu do usuário
const UserMenuContainer = styled.div`
  position: relative; /* Posiciona o menu de forma relativa ao contêiner pai */
  display: inline-block; /* Faz com que o contêiner ocupe apenas o espaço necessário */
`;

// Estilo para o ícone do usuário
const UserIcon = styled.div`
  font-size: 2.4rem; /* Tamanho do ícone */
  color: #fff; /* Cor do ícone */
  cursor: pointer; /* Muda o cursor para indicar que é clicável */
  display: flex;
  align-items: center; /* Alinha o ícone verticalmente */
  justify-content: center; /* Centraliza o ícone horizontalmente */
  border-radius: 50%; /* Faz o ícone ser circular */
  background-color: #333; /* Cor de fundo do ícone */
  padding: 0.4rem; /* Espaçamento interno */
  transition: background-color 0.3s ease, border-color 0.3s ease; /* Transição suave para alterações de cor e borda */
  border: 1px solid #fff; /* Borda branca discreta ao redor do ícone */

  &:hover {
    background-color: #444; /* Cor de fundo um pouco mais clara no hover */
    border-color: #ea4f97; /* Cor da borda ao passar o mouse */
    color: #ea4f97; /* Cor do ícone no hover */
  }
`;

// Estilo para o menu suspenso
const DropdownMenu = styled.div`
  position: absolute; /* Posiciona o menu absolutamente em relação ao contêiner pai */
  top: 110%; /* Coloca o menu logo abaixo do ícone do usuário */
  right: 0; /* Alinha o menu ao lado direito do contêiner pai */
  background-color: #1e1e1e; /* Cor de fundo preta do menu */
  border: 1px solid #444; /* Borda cinza escura para um toque discreto */
  border-radius: 8px; /* Bordas arredondadas do menu */
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.4); /* Sombra suave ao redor do menu */
  padding: 0.5rem; /* Espaçamento interno do menu */
  display: flex;
  flex-direction: column; /* Alinha os itens do menu em uma coluna */
  align-items: stretch; /* Faz com que os itens do menu se estiquem para preencher o contêiner */
  z-index: 1010; /* Garante que o menu fique sobre outros elementos */
  min-width: 130px; /* Define uma largura mínima para o menu */
  animation: fadeIn 0.3s ease-out; /* Animação de aparecimento suave */

  /* Definição da animação fadeIn */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px); /* Animação para cima */
    }
    to {
      opacity: 1;
      transform: translateY(0); /* Finaliza a animação na posição original */
    }
  }
`;

// Estilo para o nome do usuário
const UserName = styled.div`
  font-size: 1rem; /* Tamanho da fonte do nome do usuário */
  font-weight: 600; /* Peso da fonte mais espesso */
  color: #fff; /* Cor do texto */
  margin-bottom: 0.5rem; /* Espaçamento abaixo do nome do usuário */
  text-align: center; /* Alinha o texto ao centro */
  padding: 0 1rem; /* Adiciona padding horizontal para mais espaço */
`;

// Estilo para o botão de logout
const LogoutButton = styled.button`
  background-color: #ea4f97; /* Cor de fundo rosa do botão */
  color: #fff; /* Cor do texto do botão */
  border: none; /* Remove a borda padrão do botão */
  border-radius: 6px; /* Bordas arredondadas do botão */
  padding: 0.4rem 0.8rem; /* Espaçamento interno do botão */
  cursor: pointer; /* Muda o cursor para indicar que é clicável */
  margin: 0 auto; /* Centraliza o botão horizontalmente */
  font-size: 0.9rem; /* Tamanho da fonte do botão */
  transition: background-color 0.3s ease, transform 0.3s ease; /* Transição suave para alterações de cor e tamanho */
  width: 80px; /* Largura ajustada para o botão */
  text-align: center; /* Alinha o texto ao centro */

  &:hover {
    background-color: #d93e8a; /* Cor de fundo mais escura no hover */
    transform: scale(1.05); /* Efeito de aumento suave no hover */
  }

  &:focus {
    outline: 3px solid #ea4f97; /* Destaque ao focar no botão */
  }
`;

export default UserMenu;
