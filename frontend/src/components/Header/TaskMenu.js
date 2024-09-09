import React from 'react';
import styled from 'styled-components';
import { FaTasks } from 'react-icons/fa'; // Importa o ícone de tarefas do react-icons
import useOnClickOutside from '../../hooks/useClickOutside'; // Importa o hook personalizado para fechar o menu ao clicar fora

const TaskMenu = ({ onViewTasks, onClose }) => {
  // Referência para o menu, usando o hook para fechar o menu ao clicar fora
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

// Container do menu de tarefas
const TaskMenuContainer = styled.div`
  position: absolute; /* Posiciona o menu absolutamente em relação ao seu contêiner pai */
  top: 100%; /* Coloca o menu logo abaixo do contêiner pai */
  right: 0; /* Alinha o menu ao lado direito do contêiner pai */
  background-color: #1e1e1e; /* Cor de fundo do menu */
  border-radius: 10px; /* Bordas arredondadas do menu */
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5); /* Sombra suave ao redor do menu */
  padding: 0.5rem; /* Espaçamento interno do menu */
  display: flex;
  flex-direction: column; /* Alinha os itens do menu em uma coluna */
  align-items: stretch; /* Faz com que os itens do menu se estiquem para preencher o contêiner */
  z-index: 1000; /* Garante que o menu fique sobre outros elementos */
  min-width: 200px; /* Define uma largura mínima para o menu */
`;

// Estilo para o link de gerenciamento de tarefas
const TaskLink = styled.div`
  color: #fff; /* Cor do texto */
  text-decoration: none; /* Remove o sublinhado do texto */
  padding: 0.5rem 1rem; /* Espaçamento interno do link */
  cursor: pointer; /* Muda o cursor para indicar que o link é clicável */
  font-size: 0.9rem; /* Tamanho da fonte */
  transition: background-color 0.3s ease, transform 0.3s ease; /* Transições suaves para mudanças de cor e movimento */
  border-radius: 8px; /* Bordas arredondadas para o link */
  display: flex;
  align-items: center; /* Alinha verticalmente o texto e o ícone */
  gap: 0.5rem; /* Espaçamento entre o ícone e o texto */

  &:hover {
    background-color: #333; /* Cor de fundo do link ao passar o mouse */
    transform: translateX(4px); /* Movimento suave para a direita ao passar o mouse */
  }

  &:focus {
    outline: 3px solid #ea4f97; /* Destaque ao focar no link */
    outline-offset: 4px; /* Espaçamento do destaque em relação ao link */
  }
`;

// Estilo para o ícone de tarefas
const TaskIcon = styled(FaTasks)`
  color: #ea4f97; /* Cor inicial do ícone */
  transition: color 0.3s ease; /* Transição suave para a cor do ícone */

  ${TaskLink}:hover & {
    color: #ff66b2; /* Cor do ícone ao passar o mouse sobre o link */
  }
`;

export default TaskMenu;
