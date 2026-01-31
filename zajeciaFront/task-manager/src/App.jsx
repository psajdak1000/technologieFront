import Header from './components/Header';
import QuoteOfTheDay from './components/QuoteOfTheDay';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterButtons from './components/FilterButtons';
import TaskStats from './components/TaskStats';
import Card from './components/Card';
import './App.css';

// TERAZ: Importujemy dane z naszych nowych Contextów
import { useTasks } from './context/TasksContext';
import { useFilters } from './context/FilterContext';

function App() {
  // Pobieramy globalne stany z Contextu (zamiast trzymać je tutaj w useState)
  const { isLoading, isSaving, clearAllTasks, tasks } = useTasks();
  
  // Pobieramy stany filtrów i sortowania z drugiego Contextu
  const { 
    searchQuery, setSearchQuery, 
    filterCategory, setFilterCategory, 
    sortType, setSortType 
  } = useFilters();

  return (
    <div className="app">
      <header>
        <Header />
        <QuoteOfTheDay />
      </header>

      <main>
        {/* Komponenty same sobie pobiorą dane, nie musimy ich przekazywać! */}
        <TaskStats /> 
        
        <Card title="Menedżer Zadań">
          <TaskForm /> 
          
          {/* PANEL KONTROLNY: Filtry i Sortowanie sterowane przez Context */}
          <div className="controls-panel" style={{ margin: '20px 0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            
            <input 
              type="text" 
              placeholder="🔍 Szukaj zadania..." 
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
            <TaskList /> /* Pusta lista propsów! */
          )}

          {tasks.length > 0 && (
            <button onClick={clearAllTasks} className="clear-all-btn">Wyczyść wszystko</button>
          )}
        </Card>
      </main>
    </div>
  );
}

export default App;