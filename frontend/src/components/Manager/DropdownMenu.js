import React from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import styled from 'styled-components';
import useDropdownMenu from '../../hooks/Manager Hooks/useDropdownMenu';

const DropdownMenu = ({ onEdit, onDelete, onComplete, isCompleted }) => {
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
      <Icon onClick={handleToggle} />
      {isOpen && (
        <Dropdown>
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

const MenuContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Icon = styled(FaEllipsisV)`
  font-size: 22px;
  cursor: pointer;
  color: #ea4f97; /* Cor primária para o ícone */
  transform: rotate(90deg); /* Rotaciona o ícone em 90 graus */
  transition: color 0.3s ease;

  &:hover {
    color: #f291be; /* Cor secundária ao passar o mouse */
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 30px;
  right: 0;
  background-color: #1e1e1e; /* Cor de fundo para o menu */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  min-width: 120px;
  z-index: 1000;
  overflow: hidden;

  @media (max-width: 768px) {
    min-width: 120px; /* Ajusta a largura em telas menores */
  }
`;

const MenuItem = styled.button`
  display: block;
  padding: 12px 15px;
  color: #f5f5f5; /* Cor do texto dos itens do menu */
  background-color: ${({ isHovered }) => (isHovered ? '#333' : '#1e1e1e')}; /* Cor de fundo para o item do menu */
  border: none;
  text-align: left;
  cursor: pointer;
  width: 100%;
  border-bottom: 1px solid #333;
  transition: background-color 0.3s;
  font-size: 1rem;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #333; /* Cor cinza claro para o hover */
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 10px 12px;
  }
`;

export default DropdownMenu;
