import React from 'react';
import styled from 'styled-components';

const Input = ({ name, type, placeholder, value, onChange }) => (
  <StyledInput
    name={name}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

const StyledInput = styled.input`
  width: 70%;
  padding: 1rem;
  padding-right: 3.5rem;
  border: 1px solid #a4a4ad;
  margin-bottom: 1rem;
  border-radius: 6px;
  font-size: 1rem;
  color: #fff;
  background-color: #333;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #ea4f97;
    box-shadow: 0 0 0 2px rgba(234, 79, 151, 0.2);
    outline: none;
  }
`;

export default Input;
