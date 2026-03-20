import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  // 1. Lazy initial state — odczyt z localStorage tylko przy pierwszym renderze
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch (error) {
      // 3. Obsługa błędów JSON.parse (try/catch) — używamy initialValue w razie błędu
      console.error("Błąd odczytu z localStorage:", error);
      return initialValue; 
    }
  });

  // 2. Automatyczny zapis do localStorage przy każdej zmianie wartości (używamy useEffect)
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Błąd zapisu do localStorage:", error);
    }
  }, [key, value]); // Hook uruchomi się ponownie, gdy zmieni się 'key' lub 'value'

  // 4. Zwraca [value, setValue] — identyczny interfejs jak useState
  return [value, setValue];
}