import React, { useState } from 'react';
import styled from 'styled-components';

// Componente Navbar que recebe callbacks para adicionar tarefa e alterar filtro
const Navbar = ({ onAddTaskClick, onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('all'); // Estado para armazenar o filtro selecionado

  // Função para lidar com a mudança de filtro
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter); // Atualiza o estado com o novo filtro selecionado
    onFilterChange(filter); // Chama a função de callback passando o novo filtro
  };

  return (
    <Nav>
      <NavContent>
        <FilterContainer>
          <NavButton
            isSelected={selectedFilter === 'all'} // Verifica se este botão está selecionado
            onClick={() => handleFilterChange('all')} // Altera o filtro para 'all'
          >
            Todas
          </NavButton>
          <NavButton
            isSelected={selectedFilter === 'completed'} // Verifica se este botão está selecionado
            onClick={() => handleFilterChange('completed')} // Altera o filtro para 'completed'
          >
            Concluídas
          </NavButton>
          <NavButton
            isSelected={selectedFilter === 'pending'} // Verifica se este botão está selecionado
            onClick={() => handleFilterChange('pending')} // Altera o filtro para 'pending'
          >
            Pendentes
          </NavButton>
        </FilterContainer>
        <AddTaskButton onClick={onAddTaskClick}>
          Adicionar Tarefa
        </AddTaskButton>
      </NavContent>
    </Nav>
  );
};

// Estilos do Navbar
const Nav = styled.nav`
  display: flex;
  justify-content: center; /* Centraliza os itens horizontalmente */
  align-items: center; /* Centraliza os itens verticalmente */
  padding: 0.5rem 1rem; /* Espaçamento interno do nav */
  background-color: #000; /* Cor de fundo preta */
  margin-top: 6rem; /* Espaço acima do nav */
  color: #fff; /* Cor do texto branca */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3); /* Sombra do nav */
  width: 100%; /* Largura total do contêiner */
  box-sizing: border-box; /* Inclui padding e border no cálculo da largura e altura */
`;

const NavContent = styled.div`
  display: flex;
  flex-direction: column; /* Layout em coluna por padrão */
  align-items: center; /* Alinha itens ao centro */
  width: 99%; /* Largura do contêiner um pouco menor que 100% */
  box-sizing: border-box; /* Inclui padding e border no cálculo da largura e altura */
  
  @media (min-width: 768px) {
    flex-direction: row; /* Alinha itens em linha em telas maiores */
    justify-content: space-between; /* Espaça itens igualmente */
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: nowrap; /* Não permite quebra de linha dos itens */
  gap: 12px; /* Espaço entre os itens */
  justify-content: center; /* Centraliza os itens horizontalmente */
  margin-bottom: 1rem; /* Espaço abaixo do contêiner de filtros */

  @media (min-width: 768px) {
    margin-bottom: 0; /* Remove o espaço abaixo em telas maiores */
  }
`;

const NavButton = styled.button`
  background-color: ${({ isSelected }) => (isSelected ? '#444' : '#222')}; /* Cor de fundo dependendo se o botão está selecionado */
  color: #fff; /* Cor do texto branca */
  border: 1px solid ${({ isSelected }) => (isSelected ? '#666' : '#444')}; /* Borda dependendo se o botão está selecionado */
  border-radius: 5px; /* Bordas arredondadas */
  padding: 12px 20px; /* Espaçamento interno do botão */
  cursor: pointer; /* Cursor de ponteiro ao passar sobre o botão */
  transition: background-color 0.3s, transform 0.2s; /* Transições suaves para cor de fundo e transformação */
  font-size: 1rem; /* Tamanho da fonte */
  white-space: nowrap; /* Impede a quebra de linha do texto */

  transform: ${({ isSelected }) => (isSelected ? 'scale(1.05)' : 'none')}; /* Aumenta o botão quando selecionado */

  &:hover {
    background-color: #333; /* Cor de fundo quando o botão é hover */
  }
`;

const AddTaskButton = styled.button`
  background-color: #ea4f97; /* Cor de fundo do botão de adicionar tarefa */
  color: #fff; /* Cor do texto branca */
  border-radius: 5px; /* Bordas arredondadas */
  padding: 12px 20px; /* Espaçamento interno do botão */
  cursor: pointer; /* Cursor de ponteiro ao passar sobre o botão */
  transition: background-color 0.3s, color 0.3s; /* Transições suaves para cor de fundo e texto */
  font-size: 1rem; /* Tamanho da fonte */

  &:hover {
    background-color: #d43f82; /* Cor de fundo quando o botão é hover */
  }

  @media (min-width: 768px) {
    margin-left: auto; /* Alinha o botão de adicionar tarefa à direita em telas maiores */
  }
`;

export default Navbar;
