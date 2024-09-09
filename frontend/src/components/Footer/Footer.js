import React from 'react';
import styled from 'styled-components';

// Componente de Rodapé (Footer)
const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        &copy; {new Date().getFullYear()} Connecter. Todos os direitos
        reservados.
      </FooterText>
    </FooterContainer>
  );
};

// Estilização do contêiner do rodapé
const FooterContainer = styled.footer`
  background-color: #ebe6e6; /* Cor de fundo do rodapé */
  padding: 1rem 2rem; /* Espaçamento interno do rodapé */
  display: flex; /* Usa Flexbox para o layout */
  justify-content: center; /* Centraliza o conteúdo horizontalmente */
  align-items: center; /* Alinha o conteúdo verticalmente */
  border-top: 1px solid #ddd; /* Borda superior sutil */
  margin-top: auto; /* Garante que o rodapé fique no final do contêiner flexível */
`;

// Estilização do texto do rodapé
const FooterText = styled.p`
  margin: 0; /* Remove margens externas para evitar espaçamentos indesejados */
  color: #333; /* Cor do texto */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif; /* Define uma família de fontes moderna e legível */
  font-size: 0.9rem; /* Tamanho da fonte do texto */
`;

export default Footer;
