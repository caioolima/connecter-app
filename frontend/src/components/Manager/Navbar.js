// Navbar.js
import React, { useState } from 'react';
import styled from 'styled-components';

const Navbar = ({ onAddTaskClick, onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  return (
    <Nav>
      <NavContent>
        <FilterContainer>
          <NavButton
            isSelected={selectedFilter === 'all'}
            onClick={() => handleFilterChange('all')}
          >
            Todas
          </NavButton>
          <NavButton
            isSelected={selectedFilter === 'completed'}
            onClick={() => handleFilterChange('completed')}
          >
            Concluídas
          </NavButton>
          <NavButton
            isSelected={selectedFilter === 'pending'}
            onClick={() => handleFilterChange('pending')}
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

// Styled components
const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #000;
  margin-top: 6rem;
  color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  width: 100%;
  box-sizing: border-box;
`;

const NavContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 99%;
  box-sizing: border-box;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const NavButton = styled.button`
  background-color: ${({ isSelected }) => (isSelected ? '#444' : '#222')};
  color: #fff;
  border: 1px solid ${({ isSelected }) => (isSelected ? '#666' : '#444')};
  border-radius: 5px;
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-size: 1rem;
  white-space: nowrap;  // Prevent text from wrapping to the next line

  transform: ${({ isSelected }) => (isSelected ? 'scale(1.05)' : 'none')};

  &:hover {
    background-color: #333;
  }
`;

const AddTaskButton = styled.button`
  background-color: #ea4f97;
  color: #fff;
  border-radius: 5px;
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-size: 1rem;

  &:hover {
    background-color: #d43f82;
  }

  @media (min-width: 768px) {
    margin-left: auto;
  }
`;

export default Navbar;
