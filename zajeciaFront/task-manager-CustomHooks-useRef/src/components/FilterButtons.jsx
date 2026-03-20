import { useState, useRef, useEffect } from 'react';
import { useFilters } from '../context/FilterContext';

// Importujemy nasze nowe custom hooki
import { usePrevious } from '../hooks/usePrevious';
import { useRenderCount } from '../hooks/useRenderCount';

// Słownik, żeby w komunikacie wyświetlały się ładne polskie nazwy zamiast 'all', 'active'
const filterNames = {
  all: 'Wszystkie',
  active: 'Aktywne',
  completed: 'Ukończone'
};

function FilterButtons() {
  // 1. Podpinamy licznik renderów z nazwą komponentu
  useRenderCount('FilterButtons');

  const { filterStatus, setFilterStatus } = useFilters();
  
  // 2. Zapisujemy poprzedni stan filtra
  const prevFilterStatus = usePrevious(filterStatus);

  // Stany i referencje dla naszego komunikatu (toast)
  const [toastMessage, setToastMessage] = useState(null);
  const timerRef = useRef(null); // Tutaj trzymamy ID timera!

  // 3. Efekt reagujący na zmianę filtra
  useEffect(() => {
    // Sprawdzamy, czy to nie jest pierwszy render i czy filtr faktycznie się zmienił
    if (prevFilterStatus && prevFilterStatus !== filterStatus) {
      const oldName = filterNames[prevFilterStatus];
      const newName = filterNames[filterStatus];
      
      // Ustawiamy treść komunikatu
      setToastMessage(`Zmieniono filtr z «${oldName}» na «${newName}»`);

      // CZYSZCZENIE TIMERA: Jeśli ktoś szybko klika filtry, kasujemy stary timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // USTAWIENIE TIMERA: Komunikat znika po 2 sekundach (zapisujemy ID w refie)
      timerRef.current = setTimeout(() => {
        setToastMessage(null);
      }, 2000);
    }

    // Odmontowanie komponentu - sprzątamy timer, żeby uniknąć wycieków pamięci
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [filterStatus, prevFilterStatus]);

  return (
    <div style={{ position: 'relative', marginBottom: '20px' }}>
      <div className="filter-buttons">
        <button 
          className={filterStatus === 'all' ? 'active' : ''} 
          onClick={() => setFilterStatus('all')}
        >
          Wszystkie
        </button>
        <button 
          className={filterStatus === 'active' ? 'active' : ''} 
          onClick={() => setFilterStatus('active')}
        >
          Aktywne
        </button>
        <button 
          className={filterStatus === 'completed' ? 'active' : ''} 
          onClick={() => setFilterStatus('completed')}
        >
          Ukończone
        </button>
      </div>

      {/* 4. Warunkowe renderowanie naszego "Toasta" */}
      {toastMessage && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '8px',
          padding: '6px 12px',
          backgroundColor: '#333',
          color: 'white',
          borderRadius: '4px',
          fontSize: '0.85rem',
          whiteSpace: 'nowrap',
          zIndex: 10,
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}>
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default FilterButtons;