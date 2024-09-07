import React from 'react';
import styled from 'styled-components';

const PasswordContainer = ({ show, children }) => (
  <StyledPasswordContainer show={show}>
    {children}
  </StyledPasswordContainer>
);

const StyledPasswordContainer = styled.div`
  position: relative;
  width: 100%;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transform: ${(props) => (props.show ? 'translateY(0)' : 'translateY(-20px)')};
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

export default PasswordContainer;
