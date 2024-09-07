import React from 'react';
import styled from 'styled-components';

const Subtitle = ({ children }) => <StyledSubtitle>{children}</StyledSubtitle>;

const StyledSubtitle = styled.h2`
  width: 100%;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
`;

export default Subtitle;
