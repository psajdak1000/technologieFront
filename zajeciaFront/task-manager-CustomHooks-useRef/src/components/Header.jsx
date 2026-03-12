// src/components/Header.jsx
import { memo } from 'react'; // <--- 1. Importujemy memo 
import { FaTasks } from 'react-icons/fa'; // Import ikony (wymaga npm install react-icons)
import './Header.css'; 

function Header() {
  // Log diagnostyczny - pokaże się w konsoli tylko raz, 
  // nawet jak będziesz pisał w wyszukiwarce!
  console.log('Render: Header'); 

  // Usunęliśmy datę, żeby komponent był w pełni statyczny
  // (Header zazwyczaj nie musi się zmieniać co chwilę)

  return (
    <header className="header-container">
      <h1 className="logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
        <FaTasks className="icon" />
        Menedżer Zadań
      </h1>
      <p className="subtitle">Zorganizuj swój dzień efektywnie</p>
    </header>
  );
}

// 2. KLUCZOWY MOMENT: Owijamy komponent w memo przy exporcie 
export default memo(Header);