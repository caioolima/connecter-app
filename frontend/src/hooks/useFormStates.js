import { useState } from 'react';

export const useFormState = (initialState = {}) => {
  const [formValues, setFormValues] = useState(initialState);
  const [formError, setFormError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const setError = (error) => {
    setFormError(error);
  };

  const clearError = () => {
    setFormError('');
  };

  return {
    formValues,
    formError,
    handleInputChange,
    setError,
    clearError,
  };
};
