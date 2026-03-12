import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Card from '../components/Card';

function LoginPage() {
  const [username, setUsername] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Sprawdzamy skąd przyszedł użytkownik (domyślnie na stronę główną)
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      login(username);
      // Przekieruj tam, gdzie użytkownik chciał iść (lub na główną)
      navigate(from, { replace: true });
    }
  };

  return (
    <Card title="Logowanie">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <p>Aby zobaczyć tę stronę, musisz się zalogować.</p>
        
        <input
          type="text"
          placeholder="Wpisz imię (np. Admin)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        
        <button 
          type="submit" 
          style={{ padding: '10px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Zaloguj się
        </button>
      </form>
    </Card>
  );
}

export default LoginPage;