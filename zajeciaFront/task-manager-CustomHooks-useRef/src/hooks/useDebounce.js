import { useState, useEffect } from 'react';

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Ustawiamy timer
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Czyścimy timer, jeśli wartość zmieni się przed upływem czasu (np. szybkie pisanie)
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};