// src/hooks/useInput.js
import { useState } from 'react';

// Custom hook para gerenciar o estado de um campo de entrada (input)
export const useInput = (initialValue = '') => {
  // Estado para armazenar o valor do campo de entrada
  const [value, setValue] = useState(initialValue);

  // Função para atualizar o valor do estado com o valor do campo de entrada
  const onChange = (e) => {
    setValue(e.target.value);
  };

  // Função para redefinir o valor do estado para o valor inicial
  const reset = () => setValue(initialValue);

  // Retorna o valor atual, a função para lidar com mudanças e a função para redefinir
  return { value, onChange, reset };
};
