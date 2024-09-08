// useDropdownMenu.js
import { useState, useEffect, useRef } from 'react';

const useDropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const menuRef = useRef(null);

  const handleToggle = () => setIsOpen(prev => !prev);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMouseEnter = (item) => setHoveredItem(item);
  const handleMouseLeave = () => setHoveredItem(null);

  return {
    isOpen,
    hoveredItem,
    menuRef,
    handleToggle,
    handleMouseEnter,
    handleMouseLeave,
  };
};

export default useDropdownMenu;
