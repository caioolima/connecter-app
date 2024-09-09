import { useState } from 'react';

// Hook personalizado para gerenciar o estado de um formulário
export const useFormState = (initialState = {}) => {
  // Estado para armazenar os valores dos campos do formulário
  const [formValues, setFormValues] = useState(initialState);
  
  // Estado para armazenar mensagens de erro do formulário
  const [formError, setFormError] = useState('');

  // Função para lidar com mudanças nos campos do formulário
  const handleInputChange = (e) => {
    // Extrai o nome e o valor do campo alterado
    const { name, value } = e.target;
    
    // Atualiza o estado dos valores do formulário
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Função para definir uma mensagem de erro
  const setError = (error) => {
    setFormError(error);
  };

  // Função para limpar a mensagem de erro
  const clearError = () => {
    setFormError('');
  };

  // Retorna os valores do formulário, mensagens de erro e funções para manipulação
  return {
    formValues,
    formError,
    handleInputChange,
    setError,
    clearError,
  };
};
