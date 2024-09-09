import { useState } from 'react';

// Hook personalizado para gerenciar o estado de um formulário
const useFormManager = (initialState) => {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState(initialState);

  // Função para lidar com alterações nos campos do formulário
  const handleChange = (event) => {
    const { name, value } = event.target; // Obtém o nome e o valor do campo alterado
    setFormData((prevData) => ({
      ...prevData, // Mantém os dados existentes
      [name]: value, // Atualiza o campo específico com o novo valor
    }));
  };

  // Função para redefinir o formulário para seu estado inicial
  const resetForm = () => {
    setFormData(initialState); // Define os dados do formulário como o estado inicial
  };

  // Retorna os dados do formulário, a função de manipulação de alterações e a função para redefinir o formulário
  return { formData, handleChange, resetForm };
};

export default useFormManager;
