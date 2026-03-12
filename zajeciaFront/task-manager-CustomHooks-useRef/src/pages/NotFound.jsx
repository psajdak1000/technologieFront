import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404</h1>
      <p>Nie znaleziono takiej strony.</p>
      <Link to="/">Wróć do zadań</Link>
    </div>
  );
}

export default NotFound;