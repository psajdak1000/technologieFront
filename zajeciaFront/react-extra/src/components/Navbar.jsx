import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useUser } from '../context/UserContext'; // Importujemy hook użytkownika

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, login, logout } = useUser(); // Pobieramy funkcje i stan

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: theme === 'light' ? '#eee' : '#333',
    color: theme === 'light' ? '#000' : '#fff',
    transition: 'all 0.3s ease',
    marginBottom: '20px'
  };

  const linkStyle = {
    color: theme === 'light' ? '#000' : '#fff',
    textDecoration: 'none',
    marginRight: '15px'
  };

  // Symulacja logowania (na sztywno wpisane dane)
  const handleLogin = () => {
    login({ name: 'Student', email: 'student@example.com' });
  };

  return (
    <nav style={navStyle}>
      {/* Lewa strona: Linki */}
      <div>
        <NavLink to="/" style={linkStyle}>Strona Główna</NavLink>
        <NavLink to="/products" style={linkStyle}>Produkty</NavLink>
        <NavLink to="/about" style={linkStyle}>O nas</NavLink>
      </div>

      {/* Prawa strona: User + Motyw */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        
        {/* Warunkowe wyświetlanie: Jeśli user istnieje -> Pokaż powitanie i Wyloguj */}
        {user ? (
          <>
            <span>Witaj, <b>{user.name}</b>!</span>
            <button onClick={logout}>Wyloguj</button>
          </>
        ) : (
          /* Jeśli brak usera -> Pokaż przycisk Zaloguj */
          <button onClick={handleLogin}>Zaloguj</button>
        )}

        <button onClick={toggleTheme}>
          {theme === 'light' ? '🌞' : '🌜'}
        </button>
      </div>
    </nav>
  );
}