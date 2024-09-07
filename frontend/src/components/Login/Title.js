import React from 'react';
import styled from 'styled-components';

const Title = ({ children }) => <StyledTitle>{children}</StyledTitle>;

const StyledTitle = styled.h2`
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
`;

export default Title;
