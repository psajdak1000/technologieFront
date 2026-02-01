import { createContext, useContext } from 'react';
// 1. Importujemy nasz hook
import { useLocalStorage } from '../hooks/useLocalStorage';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  // 2. Używamy useLocalStorage zamiast useState
  // Klucz: 'user', Wartość domyślna: null (brak użytkownika)
  const [user, setUser] = useLocalStorage('user', null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser musi być użyty wewnątrz UserProvider');
  }
  return context;
}