// components/Manager/DropdownMenu.js
import React, { useState } from 'react';
import { FaEllipsisV } from 'react-icons/fa';

const DropdownMenu = ({ onEdit, onDelete, onComplete, isCompleted }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <div style={styles.menuContainer}>
      <FaEllipsisV onClick={handleToggle} style={styles.icon} />
      {isOpen && (
        <div style={styles.dropdown}>
          <button onClick={onComplete} style={styles.menuItem}>
            {isCompleted ? 'Marcar como Pendente' : 'Marcar como Concluída'}
          </button>
          <button onClick={onEdit} style={styles.menuItem}>Editar</button>
          <button onClick={onDelete} style={styles.menuItem}>Excluir</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  menuContainer: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  icon: {
    fontSize: '22px',
    cursor: 'pointer',
    color: '#fff',
  },
  dropdown: {
    position: 'absolute',
    top: '30px',
    right: '0',
    backgroundColor: '#1a1a1a',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    minWidth: '150px',
    zIndex: 1000,
  },
  menuItem: {
    display: 'block',
    padding: '10px 15px',
    color: '#fff',
    backgroundColor: '#1a1a1a',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    borderBottom: '1px solid #333',
    transition: 'background-color 0.3s',
  },
  menuItemHover: {
    backgroundColor: '#333',
  },
};

export default DropdownMenu;
