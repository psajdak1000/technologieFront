import { useState } from 'react';

export const useForm = (initialValues, validate, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Obsługa zmiany w inputach
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    
    // Opcjonalnie: czyść błędy podczas pisania
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  // Walidacja przy utracie focusu (Blur)
  const handleBlur = (e) => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  // Obsługa wysłania formularza
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
      // Reset formularza po sukcesie (opcjonalnie)
      setValues(initialValues);
    }
    
    setIsSubmitting(false);
  };

  // Reset ręczny
  const resetForm = () => setValues(initialValues);

  return {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues // Eksportujemy, żeby móc ręcznie zmieniać stan (np. selecty)
  };
};