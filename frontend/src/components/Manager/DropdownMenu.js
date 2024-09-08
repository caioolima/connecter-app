import React, { useState, useEffect, useRef } from 'react';
import { FaEllipsisV } from 'react-icons/fa';

const DropdownMenu = ({ onEdit, onDelete, onComplete, isCompleted }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null); // Estado para controlar o item hover
  const menuRef = useRef(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    // Adiciona o event listener para detectar cliques fora do menu
    document.addEventListener('mousedown', handleClickOutside);

    // Limpeza do event listener quando o componente desmonta
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={styles.menuContainer} ref={menuRef}>
      <FaEllipsisV onClick={handleToggle} style={styles.icon} />
      {isOpen && (
        <div style={styles.dropdown}>
          <button
            onClick={() => { onComplete(); setIsOpen(false); }}
            style={hoveredItem === 'complete' ? { ...styles.menuItem, ...styles.menuItemHover } : styles.menuItem}
            onMouseEnter={() => setHoveredItem('complete')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {isCompleted ? 'Marcar como Concluída' : 'Concluir'}
          </button>
          <button
            onClick={() => { onEdit(); setIsOpen(false); }}
            style={hoveredItem === 'edit' ? { ...styles.menuItem, ...styles.menuItemHover } : styles.menuItem}
            onMouseEnter={() => setHoveredItem('edit')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            Editar
          </button>
          <button
            onClick={() => { onDelete(); setIsOpen(false); }}
            style={hoveredItem === 'delete' ? { ...styles.menuItem, ...styles.menuItemHover } : styles.menuItem}
            onMouseEnter={() => setHoveredItem('delete')}
            onMouseLeave={() => setHoveredItem(null)}
          >
            Excluir
          </button>
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
    transform: 'rotate(90deg)', // Rotaciona o ícone em 90 graus
  },
  dropdown: {
    position: 'absolute',
    top: '30px',
    right: '0',
    backgroundColor: '#1a1a1a',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    minWidth: '80px',
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
    width: '80px',
    borderBottom: '1px solid #333',
    transition: 'background-color 0.3s',
  },
  menuItemHover: {
    backgroundColor: '#333', // Cor cinza claro para o hover
  },
};

export default DropdownMenu;
