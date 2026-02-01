import { createContext, useContext } from 'react';
// 1. Importujemy nasz custom hook (upewnij się, że ścieżka jest poprawna)
import { useLocalStorage } from '../hooks/useLocalStorage';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  // 2. ZAMIANA: Zamiast useState używamy useLocalStorage
  // 'theme' to klucz, pod jakim zapiszemy to w przeglądarce
  // 'light' to wartość domyślna (jeśli nic nie ma w pamięci)
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme musi być użyty wewnątrz ThemeProvider');
  }
  return context;
}