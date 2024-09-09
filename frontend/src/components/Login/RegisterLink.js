import React from 'react'; // Importa o React para poder usar JSX e criar componentes
import { Link } from 'react-router-dom'; // Importa o componente Link do react-router-dom para navegação entre páginas
import styled from 'styled-components'; // Importa o styled-components para estilização dos componentes

// Componente RegisterLink que renderiza um link estilizado
const RegisterLink = ({ to, children }) => <StyledLink to={to}>{children}</StyledLink>;

// Componente estilizado usando styled-components
const StyledLink = styled(Link)`
  display: block; // Faz o link ser exibido como um bloco, o que permite a adição de margens e preenchimentos
  margin-top: 1.5rem; // Adiciona uma margem superior de 1.5rem
  color: #ea4f97; // Define a cor do texto do link
  font-size: 1rem; // Define o tamanho da fonte como 1rem
  text-decoration: none; // Remove o sublinhado padrão dos links

  &:hover {
    text-decoration: underline; // Adiciona um sublinhado quando o link é hoverado
  }
`;

// Exporta o componente RegisterLink para ser utilizado em outros arquivos
export default RegisterLink;
