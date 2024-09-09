import React from 'react';
import styled from 'styled-components';

// Componente Input para renderizar um campo de entrada
const Input = ({ name, type, placeholder, value, onChange }) => (
  <StyledInput
    name={name}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

// Estilo para o campo de entrada
const StyledInput = styled.input`
  width: 100%; /* Ajusta o input para ocupar a largura completa do contêiner pai */
  max-width: 400px; /* Define uma largura máxima para o input, evitando que fique muito largo em telas grandes */
  padding: 0.75rem; /* Adiciona espaçamento interno para o texto */
  padding-right: 3.5rem; /* Adiciona mais espaçamento interno à direita para comportar um ícone ou botão se necessário */
  border: 1px solid #a4a4ad; /* Define a cor e estilo da borda */
  margin-bottom: 1rem; /* Adiciona espaçamento inferior entre os inputs e outros elementos */
  border-radius: 6px; /* Arredonda os cantos do input para um visual mais suave */
  font-size: 0.875rem; /* Ajusta o tamanho da fonte para um tamanho legível */
  color: #fff; /* Define a cor do texto como branco */
  background-color: #333; /* Define a cor de fundo do input como cinza escuro */
  transition: border-color 0.3s, box-shadow 0.3s; /* Adiciona uma transição suave para mudanças na cor da borda e na sombra ao focar */

  &:focus {
    border-color: #ea4f97; /* Muda a cor da borda para um tom de rosa quando o input está em foco */
    box-shadow: 0 0 0 2px rgba(234, 79, 151, 0.2); /* Adiciona uma sombra ao redor do input para destacá-lo */
    outline: none; /* Remove o contorno padrão do navegador ao focar no input */
  }

  @media (max-width: 768px) {
    font-size: 0.8rem; /* Ajusta o tamanho da fonte em telas menores para melhorar a legibilidade */
    padding: 0.6rem; /* Ajusta o padding interno para se adequar melhor a telas menores */
    width: 80%; /* Ajusta a largura do input para 80% do contêiner pai em telas menores */
  }

  @media (max-width: 480px) {
    font-size: 0.75rem; /* Ajusta o tamanho da fonte em telas muito pequenas */
    padding: 0.5rem; /* Reduz o padding interno para telas muito pequenas */
  }
`;

// Exporta o componente para ser utilizado em outras partes da aplicação
export default Input;
