// src/components/FilterButtons.jsx
function FilterButtons({ currentFilter, setFilter }) {
  const filters = ['all', 'active', 'completed'];

  return (
    <div className="filter-buttons">
      {filters.map(f => (
        <button 
          key={f}
          className={currentFilter === f ? 'active-filter' : ''} // Wizualne wyróżnienie 
          onClick={() => setFilter(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}
export default FilterButtons;