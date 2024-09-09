import { useEffect, useRef } from 'react';

// Hook personalizado para detectar cliques fora de um elemento
const useOnClickOutside = (handler) => {
  // Referência para o elemento alvo
  const ref = useRef();

  useEffect(() => {
    // Função que será chamada quando um clique fora do elemento for detectado
    const listener = (event) => {
      // Verifica se o clique ocorreu fora do elemento referenciado
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      // Chama o manipulador passado como argumento se o clique foi fora
      handler();
    };

    // Adiciona os ouvintes de eventos para detectar cliques
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    // Limpa os ouvintes de eventos quando o componente é desmontado ou o handler muda
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [handler]); // Reexecuta o efeito apenas se o handler mudar

  // Retorna a referência para o elemento alvo
  return ref;
};

export default useOnClickOutside;
