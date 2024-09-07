// Logo.js
import React from 'react';
import styled from 'styled-components';

const Logo = ({ src, alt }) => <StyledLogo src={src} alt={alt} />;

const StyledLogo = styled.img`
  width: 200px;
  height: 190px;
  margin-bottom: -1rem;
`;

export default Logo;
