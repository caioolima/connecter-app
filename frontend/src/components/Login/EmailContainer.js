import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import Input from './Input';

const EmailContainer = ({ children }) => (
  <StyledEmailContainer>
    {children}
  </StyledEmailContainer>
);

const StyledEmailContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
`;

export default EmailContainer;
