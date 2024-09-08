// useFormManager.js
import { useState, useEffect } from 'react';

const useFormManager = (initialData = {}) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialData);
  };

  return {
    formData,
    handleChange,
    resetForm,
  };
};

export default useFormManager;
