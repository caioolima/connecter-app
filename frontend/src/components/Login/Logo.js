import React from 'react';
import styled from 'styled-components';

const Logo = () => (
  <StyledLogo
    src={`${process.env.PUBLIC_URL}/Connecter-form-preview.png`}
    alt="Connecter Intro"
  />
);

const StyledLogo = styled.img`
  width: 200px;
  height: 190px;
  margin-bottom: -1rem;
`;

export default Logo;
