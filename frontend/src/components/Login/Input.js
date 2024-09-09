import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Componente funcional Input
// Este componente renderiza um campo de entrada estilizado com styled-components.
const Input = ({ name, type, placeholder, value, onChange, autoFocus }) => (
  <StyledInput
    name={name}             // Nome do campo de entrada
    type={type}             // Tipo do campo de entrada, ex: "text", "password"
    placeholder={placeholder} // Texto a ser exibido quando o campo estiver vazio
    value={value}           // Valor atual do campo de entrada
    onChange={onChange}     // Função de callback chamada quando o valor do campo muda
    autoFocus={autoFocus}   // Define se o campo deve receber foco automaticamente ao renderizar
  />
);

// Estilização do componente StyledInput usando styled-components
const StyledInput = styled.input`
  width: 70%;                     // Largura do campo de entrada
  padding: 1.2rem;                // Espaçamento interno do campo
  padding-right: 3.5rem;         // Espaçamento interno à direita (para espaço para ícones ou outros elementos)
  border: 1px solid #a4a4ad;     // Cor e estilo da borda do campo de entrada
  border-radius: 12px;           // Arredondamento das bordas
  font-size: 1rem;               // Tamanho da fonte
  color: #fff;                   // Cor do texto
  background-color: #333;        // Cor de fundo do campo de entrada
  transition:                    // Efeitos de transição para mudanças de estilo
    border-color 0.3s,            // Transição suave para a cor da borda
    box-shadow 0.3s;              // Transição suave para a sombra da caixa

  &:focus {
    border-color: #ea4f97;       // Cor da borda quando o campo está em foco
    box-shadow: 0 0 0 2px rgba(234, 79, 151, 0.2); // Sombra ao redor do campo quando em foco
    outline: none;               // Remove a borda de foco padrão do navegador
  }
`;

// Definindo as propriedades esperadas e seus tipos para o componente Input
Input.propTypes = {
  name: PropTypes.string.isRequired,       // Nome do campo de entrada (obrigatório)
  type: PropTypes.string.isRequired,       // Tipo do campo de entrada (obrigatório)
  placeholder: PropTypes.string.isRequired, // Texto de placeholder (obrigatório)
  value: PropTypes.string.isRequired,       // Valor do campo de entrada (obrigatório)
  onChange: PropTypes.func.isRequired,      // Função chamada quando o valor muda (obrigatório)
  autoFocus: PropTypes.bool,                // Se o campo deve receber foco automaticamente (opcional)
};

// Definindo o valor padrão para a propriedade autoFocus
Input.defaultProps = {
  autoFocus: false,
};

export default Input;
