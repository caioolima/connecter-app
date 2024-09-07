import React from 'react';
import styled from 'styled-components';

const Title = ({ children }) => <StyledTitle>{children}</StyledTitle>;

const StyledTitle = styled.h2`
  width: 100%;
  font-size: 2rem;
  font-weight: 500;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  border-bottom: 2px solid #fff;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;

export default Title;
