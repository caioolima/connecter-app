import React from 'react';
import styled from 'styled-components';

const Logo = () => (
  <StyledLogo
    src="https://firebasestorage.googleapis.com/v0/b/connectrip-10205.appspot.com/o/task%2FConnecter-preview.png?alt=media&token=981e1443-05f7-4bfe-bc30-cc5be9bb4c57"
    alt="Connecter Intro"
  />
);

const StyledLogo = styled.img`
  width: 200px;
  height: 190px;
  margin-bottom: -1rem;
`;

export default Logo;
