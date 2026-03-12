import { useFilters } from '../context/FilterContext';

function FilterButtons() {
  // Pobieramy stan i setter z Contextu
  const { filterStatus, setFilterStatus } = useFilters();

  return (
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
  );
}

export default FilterButtons;