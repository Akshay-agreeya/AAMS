import { useState } from 'react';

const useForm = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const setFieldsValue = (newValues) => {
    setValues((prev) => ({ ...prev, ...newValues }));
  };

  const validateFields = () => {
    let isValid = true;
    const newErrors = {};

    Object.keys(values).forEach((name) => {
      // Basic validation logic (e.g., required fields)
      if (!values[name]) {
        newErrors[name] = `${name} is required`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  return [{ values, errors }, handleChange, setFieldsValue, validateFields];
};

export default useForm;