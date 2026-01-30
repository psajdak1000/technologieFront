import { useState, useEffect } from 'react';
import Header from './components/Header';
import QuoteOfTheDay from './components/QuoteOfTheDay'; // Import cytatu
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterButtons from './components/FilterButtons';
import TaskStats from './components/TaskStats';
import Card from './components/Card';
import { tasksApi } from './api/tasksApi'; // Import symulowanego API
import './App.css';

function App() {
  // Część A: Lazy initial state - wczytywanie z localStorage
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('myTasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(false); // Globalny stan ładowania
  const [isSaving, setIsSaving] = useState(false);   // Stan "Zapisywanie..."

  // Część C: Pobieranie zadań przy montowaniu z AbortController
  useEffect(() => {
    const controller = new AbortController(); // Cleanup
    
    // Pobieramy z API tylko, gdy localStorage jest pusty
    if (tasks.length === 0) {
      setIsLoading(true);
      tasksApi.fetchTasks(controller.signal)
        .then(data => {
          const apiTasks = data.map(t => ({
            id: t.id, 
            title: t.title, 
            completed: t.completed, 
            priority: 'medium' 
          }));
          setTasks(apiTasks);
        })
        .catch(err => {
          if (err.name !== 'AbortError') console.error("Błąd API:", err);
        })
        .finally(() => setIsLoading(false));
    }

    // Funkcja czyszcząca (Cleanup) zapobiega memory leaks
    return () => controller.abort(); 
  }, []);

  // Część A i C: Zapisywanie do localStorage i API przy każdej zmianie
  useEffect(() => {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    
    if (tasks.length > 0) {
      setIsSaving(true);
      tasksApi.saveTasks(tasks).finally(() => setIsSaving(false));
    }
  }, [tasks]);

  // Część A: Przycisk "Wyczyść wszystko" z potwierdzeniem
  const clearAllTasks = () => {
    if (window.confirm("Czy na pewno chcesz usunąć wszystkie zadania?")) {
      setTasks([]);
    }
  };

  const addTask = (newTask) => setTasks([...tasks, newTask]);
  const updateTask = (id, title) => setTasks(tasks.map(t => t.id === id ? {...t, title} : t));
  const deleteTask = (id) => setTasks(tasks.filter(t => t.id !== id));
  const toggleTask = (id) => setTasks(tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t));
  const changePriority = (id, priority) => setTasks(tasks.map(t => t.id === id ? {...t, priority} : t));

  const filteredTasks = tasks.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return (
    <div className="app">
      {/* Nagłówek aplikacji z dołączonym cytatem dnia */}
      <header>
        <Header />
        <QuoteOfTheDay /> 
      </header>

      <main>
        {/* Statystyki obliczane na podstawie props tasks */}
        <TaskStats tasks={tasks} />
        
        <Card title="Menedżer Zadań">
          <TaskForm addTask={addTask} />
          
          <FilterButtons currentFilter={filter} setFilter={setFilter} />

          {/* Wyświetlanie globalnego stanu zapisu */}
          {isSaving && <p style={{ color: 'gray', fontSize: '12px', textAlign: 'center' }}>Zapisywanie zmian...</p>}

          {/* Część C: Globalny stan ładowania (np. skeleton loader) */}
          {isLoading ? (
            <div className="skeleton">Pobieranie danych z API...</div>
          ) : (
            <TaskList 
              tasks={filteredTasks} 
              onToggle={toggleTask} 
              onDelete={deleteTask}
              onChangePriority={changePriority}
              onUpdate={updateTask}
            />
          )}

          {/* Przycisk wyczyść wszystko widoczny tylko gdy lista nie jest pusta */}
          {tasks.length > 0 && (
            <button onClick={clearAllTasks} className="clear-all-btn">
              Wyczyść wszystko
            </button>
          )}
        </Card>
      </main>
    </div>
  );
}

export default App;