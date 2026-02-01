import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import FilterButtons from '../components/FilterButtons';
import TaskStats from '../components/TaskStats';
import Card from '../components/Card';
import { useTasks } from '../context/TasksContext';
import { useFilters } from '../context/FilterContext';

function TasksPage() {
  const { isLoading, isSaving, clearAllTasks, clearCompleted, toggleAll, tasks } = useTasks();
  
  const { 
    searchQuery, setSearchQuery, 
    filterCategory, setFilterCategory, 
    sortType, setSortType 
  } = useFilters();

  return (
    <div>
      <TaskStats />
      
      <Card title="Lista Zadań">
        <TaskForm />
        
        {/* Panel filtrów */}
        <div className="controls-panel" style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input 
            id="search-input"
            type="text" 
            placeholder="🔍 Szukaj zadania... (Ctrl+K)" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              style={{ padding: '5px', flex: 1 }}
            >
              <option value="all">Wszystkie kategorie</option>
              <option value="Praca">Praca</option>
              <option value="Dom">Dom</option>
              <option value="Zakupy">Zakupy</option>
              <option value="Inne">Inne</option>
            </select>

            <select 
              value={sortType} 
              onChange={(e) => setSortType(e.target.value)}
              style={{ padding: '5px', flex: 1 }}
            >
              <option value="default">Sortuj: Domyślnie</option>
              <option value="priority">Sortuj: Priorytet</option>
              <option value="alpha">Sortuj: A-Z</option>
            </select>
          </div>
        </div>

        <FilterButtons />

        {isSaving && <p style={{ color: 'gray', fontSize: '12px', textAlign: 'center' }}>Zapisywanie zmian...</p>}

        {isLoading ? (
          <div className="skeleton">Pobieranie danych z API...</div>
        ) : (
          <TaskList /> 
        )}

        {tasks.length > 0 && (
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={toggleAll} className="action-btn" style={{ background: '#3498db', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Zaznacz/Odznacz
            </button>
            <button onClick={clearCompleted} className="action-btn" style={{ background: '#f39c12', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Usuń ukończone
            </button>
            <button onClick={clearAllTasks} className="clear-all-btn" style={{ background: '#e74c3c', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Wyczyść wszystko
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}

export default TasksPage;