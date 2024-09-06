// Navbar.js
import React from 'react';

const Navbar = ({ onAddTaskClick, onFilterChange }) => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navContent}>
        <div style={styles.filterContainer}>
          <button style={styles.navButton} onClick={() => onFilterChange('all')}>Todas</button>
          <button style={styles.navButton} onClick={() => onFilterChange('completed')}>Concluídas</button>
          <button style={styles.navButton} onClick={() => onFilterChange('pending')}>Pendentes</button>
          <button style={styles.navButton} onClick={onAddTaskClick}>Adicionar Tarefa</button>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    margin: '5rem auto',
    color: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  navContent: {
    display: 'flex',
    alignItems: 'center',
  },
  navButton: {
    backgroundColor: '#444',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    margin: '0 5px',
    cursor: 'pointer',
  },
  filterContainer: {
    display: 'flex',
  },
};

export default Navbar;
