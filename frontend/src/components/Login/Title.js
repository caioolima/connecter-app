import React from 'react'; // Importa o React para poder usar JSX e criar componentes
import styled from 'styled-components'; // Importa o styled-components para estilização dos componentes

// Componente Title que renderiza um título estilizado
const Title = ({ children }) => <StyledTitle>{children}</StyledTitle>;

// Componente estilizado usando styled-components
const StyledTitle = styled.h2`
  margin-bottom: 2rem; // Adiciona uma margem inferior de 2rem para separar o título de outros elementos abaixo dele
  font-size: 1.5rem; // Define o tamanho da fonte do título como 1.5rem
  font-weight: 500; // Define o peso da fonte como 500 (semi-negrito)
  color: #fff; // Define a cor do texto como branco (#fff)
`;

// Exporta o componente Title para ser utilizado em outros arquivos
export default Title;
