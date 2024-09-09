import React from 'react';
import styled from 'styled-components';

// Componente funcional Logo
// Este componente renderiza uma imagem que funciona como um logo.
const Logo = () => (
  <StyledLogo
    src={`${process.env.PUBLIC_URL}/Connecter-form-preview.png`} // Caminho para a imagem do logo
    alt="Connecter Intro" // Texto alternativo para a imagem, importante para acessibilidade
  />
);

// Estilização do componente StyledLogo usando styled-components
const StyledLogo = styled.img`
  width: 200px;            // Largura da imagem
  height: 190px;           // Altura da imagem
  margin-bottom: -1rem;    // Margem inferior negativa para ajustar o posicionamento da imagem
`;

export default Logo;
