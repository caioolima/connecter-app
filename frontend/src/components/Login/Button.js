import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = ({ onClick, disabled, emptyEmail, children, type }) => (
  <StyledButton
    onClick={onClick}
    disabled={disabled}
    emptyEmail={emptyEmail}
    type={type}
  >
    {children}
  </StyledButton>
);

const StyledButton = styled.button`
  position: absolute;
  top: 50%;
  right: 3.6rem;
  transform: translateY(-50%);
  width: 2.2rem;
  height: 2.2rem;
  background: ${(props) =>
    props.emptyEmail
      ? '#a4a4ad'
      : '#000'};
  border: none;
  color: #fff;
  border-radius: 50%;
  font-size: 1rem;
  font-weight: bold;
  cursor: ${(props) =>
    props.emptyEmail
      ? 'default'
      : 'pointer'};
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${(props) =>
      props.emptyEmail
        ? '#a4a4ad'
        : '#141414'};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    width: 2rem;
    height: 2rem;
    font-size: 0.9rem;
    right: 1.6rem; /* Ajuste o posicionamento para telas menores */
  }
`;

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  emptyEmail: PropTypes.bool,
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
  emptyEmail: false,
  type: 'button',
};

export default Button;
