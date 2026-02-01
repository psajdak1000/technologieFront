import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // 1. Na start sprawdzamy, czy w localStorage jest już zapisany motyw.
  // Jeśli nie ma, domyślnie ustawiamy 'light'.
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('app-theme');
    return savedTheme || 'light';
  });

  // 2. Efekt: Za każdym razem, gdy zmienisz motyw, wykonujemy dwie rzeczy:
  // - Ustawiamy atrybut data-theme na elemencie <html> (to aktywuje CSS)
  // - Zapisujemy wybór w pamięci przeglądarki
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook do łatwego użycia w komponentach
export const useTheme = () => useContext(ThemeContext);