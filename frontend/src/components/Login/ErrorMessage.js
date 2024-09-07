import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ErrorMessage = ({ children }) => <StyledErrorMessage>{children}</StyledErrorMessage>;

const StyledErrorMessage = styled.div`
  color: #ff0000;
  margin-top: 1rem;
  font-weight: bold;
`;

ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorMessage;
