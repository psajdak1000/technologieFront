import { useEffect, useRef, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import FilterButtons from '../components/FilterButtons';
import TaskStats from '../components/TaskStats';
import Card from '../components/Card';
import { useTasks } from '../context/TasksContext'; 
import { useTheme } from '../context/ThemeContext';

function TasksPage() {
  const { state, dispatch } = useTasks();
  const { theme, toggleTheme } = useTheme();

  const { isLoading, tasks, searchQuery, filterCategory, sortType } = state;

  const searchInputRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearAll = () => {
    if (window.confirm("Czy na pewno chcesz usunąć wszystkie zadania?")) {
      dispatch({ type: 'CLEAR_ALL' });
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 0' }}>
        <button 
          onClick={toggleTheme}
          style={{
            background: 'transparent',
            border: '2px solid var(--border-color)',
            color: 'var(--text-primary)',
            padding: '8px 16px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease'
          }}
        >
          {theme === 'light' ? '🌙 Tryb Ciemny' : '☀️ Tryb Jasny'}
        </button>
      </div>

      <TaskStats />
      
      <Card title="Lista Zadań">
        <TaskForm />
        
        <div className="controls-panel" style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input 
            ref={searchInputRef}
            id="search-input"
            type="text" 
            placeholder="🔍 Szukaj zadania... (Ctrl+K)" 
            value={searchQuery}
            onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
          />

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <select 
              value={filterCategory} 
              onChange={(e) => dispatch({ type: 'SET_CATEGORY_FILTER', payload: e.target.value })}
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
              onChange={(e) => dispatch({ type: 'SET_SORT', payload: e.target.value })}
              style={{ padding: '5px', flex: 1 }}
            >
              <option value="default">Sortuj: Domyślnie</option>
              <option value="priority">Sortuj: Priorytet</option>
              <option value="alpha">Sortuj: A-Z</option>
            </select>
          </div>
        </div>

        <FilterButtons />

        {isLoading ? (
          <div className="skeleton">Pobieranie danych z API...</div>
        ) : (
          <TaskList /> 
        )}

        {tasks.length > 0 && (
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => dispatch({ type: 'TOGGLE_ALL' })} className="action-btn" style={{ background: '#3498db', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Zaznacz/Odznacz
            </button>
            <button onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })} className="action-btn" style={{ background: '#f39c12', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Usuń ukończone
            </button>
            <button onClick={handleClearAll} className="clear-all-btn" style={{ background: '#e74c3c', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Wyczyść wszystko
            </button>
            
            {/* --- NOWOŚĆ: Przycisk COFNIJ --- */}
            {state.previousTasks && (
              <button 
                onClick={() => dispatch({ type: 'UNDO' })} 
                className="action-btn" 
                style={{ background: '#95a5a6', color: 'white', padding: '8px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                ↩ Cofnij
              </button>
            )}
            {/* --------------------------------- */}
          </div>
        )}
      </Card>

      {showScrollTop && (
        <button 
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            padding: '10px 15px',
            background: '#2c3e50',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '20px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
            zIndex: 1000
          }}
          title="Wróć na górę"
        >
          ⬆
        </button>
      )}
    </div>
  );
}

export default TasksPage;