import React from 'react';
import styled from 'styled-components';
import { FaTasks } from 'react-icons/fa'; // Ícone adicionado
import useOnClickOutside from '../../hooks/useClickOutside'; // Importe do hook

const TaskMenu = ({ onViewTasks, onClose }) => {
  const menuRef = useOnClickOutside(onClose);

  return (
    <TaskMenuContainer ref={menuRef}>
      <TaskLink onClick={onViewTasks}>
        <TaskIcon />
        Gerenciar Tarefas
      </TaskLink>
    </TaskMenuContainer>
  );
};

const TaskMenuContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #1e1e1e; /* Cor de fundo mais suave */
  border-radius: 10px; /* Bordas arredondadas mais acentuadas */
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5); /* Sombra mais suave */
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  z-index: 1000;
  min-width: 200px; /* Largura mínima um pouco maior */
`;

const TaskLink = styled.div`
  color: #fff; /* Cor do texto branca para bom contraste */
  text-decoration: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem; /* Tamanho da fonte ajustado para uma aparência mais compacta */
  transition: background-color 0.3s ease, transform 0.3s ease;
  border-radius: 8px; /* Bordas arredondadas para um toque mais suave */
  display: flex;
  align-items: center; /* Alinhamento vertical do texto e ícone */
  gap: 0.5rem; /* Espaçamento entre ícone e texto */

  &:hover {
    background-color: #333; /* Cor de fundo do hover mais escura */
    transform: translateX(4px); /* Movimento mais suave */
  }

  &:focus {
    outline: 3px solid #ea4f97; /* Destaque de foco rosa para visibilidade */
    outline-offset: 4px;
  }
`;

const TaskIcon = styled(FaTasks)`
  color: #ea4f97; /* Cor do ícone rosa */
  transition: color 0.3s ease; /* Transição suave para a cor do ícone */

  ${TaskLink}:hover & {
    color: #ff66b2; /* Cor do ícone ao passar o mouse sobre o link */
  }
`;

export default TaskMenu;
