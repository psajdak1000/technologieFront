import { useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
  // 1. Inicjalizacja stanu z localStorage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // 2. Funkcja setter, która aktualizuje stan I localStorage
  const setValue = (value) => {
    try {
      // Pozwala na przekazanie funkcji (tak jak w useState)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};