import React from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import styled from 'styled-components';
import useDropdownMenu from '../../hooks/Manager Hooks/useDropdownMenu';

// Componente DropdownMenu para exibir um menu suspenso com ações
const DropdownMenu = ({ onEdit, onDelete, onComplete, isCompleted }) => {
  // Utiliza o hook personalizado useDropdownMenu para gerenciar o estado do menu
  const {
    isOpen,
    hoveredItem,
    menuRef,
    handleToggle,
    handleMouseEnter,
    handleMouseLeave,
  } = useDropdownMenu();

  return (
    <MenuContainer ref={menuRef}>
      {/* Ícone que abre ou fecha o menu */}
      <Icon onClick={handleToggle} />
      {isOpen && (
        <Dropdown>
          {/* MenuItem para completar a tarefa, visível apenas se a tarefa não estiver concluída */}
          {!isCompleted && (
            <MenuItem
              onClick={() => { onComplete(); handleToggle(); }}
              isHovered={hoveredItem === 'complete'}
              onMouseEnter={() => handleMouseEnter('complete')}
              onMouseLeave={handleMouseLeave}
            >
              Concluir
            </MenuItem>
          )}
          {/* MenuItem para editar a tarefa, visível apenas se a tarefa não estiver concluída */}
          {!isCompleted && (
            <MenuItem
              onClick={() => { onEdit(); handleToggle(); }}
              isHovered={hoveredItem === 'edit'}
              onMouseEnter={() => handleMouseEnter('edit')}
              onMouseLeave={handleMouseLeave}
            >
              Editar
            </MenuItem>
          )}
          {/* MenuItem para excluir a tarefa, visível sempre */}
          <MenuItem
            onClick={() => { onDelete(); handleToggle(); }}
            isHovered={hoveredItem === 'delete'}
            onMouseEnter={() => handleMouseEnter('delete')}
            onMouseLeave={handleMouseLeave}
          >
            Excluir
          </MenuItem>
        </Dropdown>
      )}
    </MenuContainer>
  );
};

// Container do menu, que posiciona o menu suspenso
const MenuContainer = styled.div`
  position: relative; /* Faz com que o menu suspenso seja posicionado relativamente ao container */
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Alinha o menu ao final do container */
`;

// Estilização para o ícone do menu (três pontos verticais)
const Icon = styled(FaEllipsisV)`
  font-size: 22px; /* Define o tamanho do ícone */
  cursor: pointer; /* Muda o cursor para indicar que é clicável */
  color: #ea4f97; /* Cor primária para o ícone */
  transform: rotate(90deg); /* Rotaciona o ícone em 90 graus para a posição vertical */
  transition: color 0.3s ease; /* Adiciona uma transição suave na cor ao passar o mouse */

  &:hover {
    color: #f291be; /* Cor secundária ao passar o mouse */
  }
`;

// Estilo para o menu suspenso
const Dropdown = styled.div`
  position: absolute; /* Posiciona o menu suspenso em relação ao container pai */
  top: 30px; /* Define a distância do topo do container pai */
  right: 0; /* Alinha o menu ao lado direito do container pai */
  background-color: #1e1e1e; /* Cor de fundo para o menu */
  border-radius: 8px; /* Arredonda os cantos do menu */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Adiciona uma sombra ao menu */
  min-width: 120px; /* Define uma largura mínima para o menu */
  z-index: 1000; /* Garante que o menu fique acima de outros elementos */
  overflow: hidden; /* Evita que o conteúdo ultrapasse os limites do menu */

  @media (max-width: 768px) {
    min-width: 120px; /* Mantém a largura mínima em telas menores */
  }
`;

// Estilo para cada item do menu
const MenuItem = styled.button`
  display: block;
  padding: 12px 15px; /* Adiciona espaçamento interno ao item do menu */
  color: #f5f5f5; /* Cor do texto dos itens do menu */
  background-color: ${({ isHovered }) => (isHovered ? '#333' : '#1e1e1e')}; /* Cor de fundo para o item do menu baseado no estado de hover */
  border: none; /* Remove a borda padrão do botão */
  text-align: left; /* Alinha o texto à esquerda */
  cursor: pointer; /* Muda o cursor para indicar que é clicável */
  width: 100%; /* Define a largura do item do menu como 100% do menu suspenso */
  border-bottom: 1px solid #333; /* Adiciona uma linha inferior para separar os itens do menu */
  transition: background-color 0.3s; /* Adiciona uma transição suave na cor de fundo ao passar o mouse */
  font-size: 1rem; /* Define o tamanho da fonte para o texto do item do menu */

  &:last-child {
    border-bottom: none; /* Remove a linha inferior do último item do menu */
  }

  &:hover {
    background-color: #333; /* Cor de fundo ao passar o mouse */
  }

  @media (max-width: 768px) {
    font-size: 0.9rem; /* Ajusta o tamanho da fonte em telas menores */
    padding: 10px 12px; /* Ajusta o padding interno em telas menores */
  }
`;

export default DropdownMenu;
