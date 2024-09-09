// Logo.js
import React from 'react';
import styled from 'styled-components';

// Componente Logo para exibir uma imagem de logo
const Logo = ({ src, alt }) => <StyledLogo src={src} alt={alt} />;

// Estilo para o componente Logo
const StyledLogo = styled.img`
  width: 200px; /* Define a largura do logo */
  height: 190px; /* Define a altura do logo */
  margin-bottom: -1rem; /* Ajusta a margem inferior para alinhar o logo com outros elementos, se necessário */
`;

// Exporta o componente Logo para ser utilizado em outras partes da aplicação
export default Logo;
