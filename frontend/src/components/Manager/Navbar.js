// Navbar.js
import React, { useState } from 'react';

const Navbar = ({ onAddTaskClick, onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    onFilterChange(filter);
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContent}>
        <div style={styles.filterContainer}>
          <button
            style={selectedFilter === 'all' ? { ...styles.navButton, ...styles.selectedButton } : styles.navButton}
            onClick={() => handleFilterChange('all')}
          >
            Todas
          </button>
          <button
            style={selectedFilter === 'completed' ? { ...styles.navButton, ...styles.selectedButton } : styles.navButton}
            onClick={() => handleFilterChange('completed')}
          >
            Concluídas
          </button>
          <button
            style={selectedFilter === 'pending' ? { ...styles.navButton, ...styles.selectedButton } : styles.navButton}
            onClick={() => handleFilterChange('pending')}
          >
            Pendentes
          </button>
          <button style={styles.addTaskButton} onClick={onAddTaskClick}>
            Adicionar Tarefa
          </button>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem 2rem',
    margin: '5rem auto',
    backgroundColor: '#000',
    color: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
    marginBottom: '2rem',
  },
  navContent: {
    display: 'flex',
    alignItems: 'center',
  },
  navButton: {
    backgroundColor: '#222',
    color: '#fff',
    border: '1px solid #444',
    borderRadius: '4px',
    padding: '10px 15px',
    margin: '0 5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
    fontSize: '0.9rem',
  },
  addTaskButton: {
    backgroundColor: '#fff',
    color: '#000',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '10px 15px',
    margin: '0 5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s, transform 0.2s',
    fontSize: '0.9rem',
  },
  filterContainer: {
    display: 'flex',
  },
  selectedButton: {
    backgroundColor: '#444',  // Fundo diferente para o botão selecionado
    border: '1px solid #666', // Bordas mais claras para o botão ativo
    transform: 'scale(1.1)',  // Leve aumento para dar destaque
  },
};

export default Navbar;
