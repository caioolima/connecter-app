import { useState, useEffect, useRef } from 'react';

// Hook personalizado para gerenciar o estado de um menu suspenso (dropdown)
const useDropdownMenu = () => {
  // Estado que indica se o menu está aberto ou fechado
  const [isOpen, setIsOpen] = useState(false);
  // Estado que armazena o item atualmente sobre o qual o mouse está passando
  const [hoveredItem, setHoveredItem] = useState(null);
  // Referência ao elemento do menu
  const menuRef = useRef(null);

  // Função para alternar o estado de abertura do menu
  const handleToggle = () => setIsOpen(prev => !prev);

  // Função para fechar o menu se um clique fora do menu for detectado
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Adiciona o ouvinte de evento para detectar cliques fora do menu
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Remove o ouvinte de evento quando o componente é desmontado
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Função para definir o item atualmente sobre o qual o mouse está passando
  const handleMouseEnter = (item) => setHoveredItem(item);
  // Função para limpar o item sobre o qual o mouse estava passando
  const handleMouseLeave = () => setHoveredItem(null);

  // Retorna os estados e funções necessários para controlar o menu suspenso
  return {
    isOpen,              // Indica se o menu está aberto
    hoveredItem,        // Armazena o item atualmente sobre o qual o mouse está passando
    menuRef,            // Referência ao elemento do menu
    handleToggle,       // Função para alternar o estado de abertura do menu
    handleMouseEnter,   // Função para definir o item sobre o qual o mouse está passando
    handleMouseLeave,   // Função para limpar o item sobre o qual o mouse estava passando
  };
};

export default useDropdownMenu;
