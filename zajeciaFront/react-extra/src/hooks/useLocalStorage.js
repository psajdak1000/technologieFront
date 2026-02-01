import { useState, useEffect } from 'react';

export function useLocalStorage(key, defaultValue) {
  // 1. Leniwa inicjalizacja (funkcja w useState)
  // Sprawdzamy localStorage tylko raz przy starcie aplikacji
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      // Jeśli coś znaleźliśmy, parsujemy JSON, jeśli nie - zwracamy wartość domyślną
      return saved ? JSON.parse(saved) : defaultValue;
    } catch (error) {
      console.error('Błąd odczytu localStorage:', error);
      return defaultValue;
    }
  });

  // 2. Efekt uboczny - aktualizacja localStorage przy każdej zmianie 'value'
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Błąd zapisu localStorage:', error);
    }
  }, [key, value]); // Uruchom ponownie, gdy klucz lub wartość się zmienią

  // Zwracamy to samo co useState: [wartość, funkcjaDoZmiany]
  return [value, setValue];
}