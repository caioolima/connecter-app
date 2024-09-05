import React from 'react';
import styled from 'styled-components';

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

const FooterContainer = styled.footer`
  background-color: #ebe6e6; /* Cor de fundo do rodapé */
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #ddd;
  margin-top: auto; /* Garante que o rodapé fique no final do contêiner flexível */
`;

const FooterText = styled.p`
  margin: 0;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  font-size: 0.9rem;
`;

export default Footer;
