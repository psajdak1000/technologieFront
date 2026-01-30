// src/components/Header.jsx
import './Header.css'; // Importujesz plik CSS, aby style działały 

function Header() {
  // Przykład użycia logiki JS wewnątrz komponentu
  const currentData = new Date().toLocaleDateString();

  return (
    <header className="header-container"> {/* Używamy className zamiast class  */}
      <h1>📝 Menedżer Zadań</h1> {/* Ikona/emoji i tytuł zgodnie z poleceniem  */}
      <p className="date-text">Dzisiaj jest: {currentData}</p> {/* JS w nawiasach klamrowych  */}
    </header>
  );
}

export default Header; // Eksportujesz, żeby App.jsx mógł go użyć 