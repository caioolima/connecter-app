import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Input = ({ name, type, placeholder, value, onChange, autoFocus }) => (
  <StyledInput
    name={name}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    autoFocus={autoFocus}
  />
);

const StyledInput = styled.input`
  width: 70%;
  padding: 1.2rem;
  padding-right: 3.5rem;
  border: 1px solid #a4a4ad;
  border-radius: 12px;
  font-size: 1rem;
  color: #fff;
  background-color: #333;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;

  &:focus {
    border-color: #ea4f97;
    box-shadow: 0 0 0 2px rgba(234, 79, 151, 0.2);
    outline: none;
  }
`;

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
};

Input.defaultProps = {
  autoFocus: false,
};

export default Input;
