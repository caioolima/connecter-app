import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const RegisterLink = ({ to, children }) => <StyledLink to={to}>{children}</StyledLink>;

const StyledLink = styled(Link)`
  display: block;
  margin-top: 1.5rem;
  color: #ea4f97;
  font-size: 1rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default RegisterLink;
