import { createContext, useState, useEffect, useContext } from 'react';
import { tasksApi } from '../api/tasksApi';

// 1. Tworzymy Kontekst
const TasksContext = createContext(null);

// 2. Tworzymy Provider (Dostawcę danych)
export const TasksProvider = ({ children }) => {
  // --- STAN (Przeniesiony z App.jsx) ---
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('myTasks');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // --- EFEKTY (Przeniesione z App.jsx) ---
  
  // Pobieranie danych z API
  useEffect(() => {
    const controller = new AbortController();
    
    // Pobieramy tylko gdy localStorage jest pusty (symulacja pierwszego wejścia)
    if (tasks.length === 0) {
      setIsLoading(true);
      tasksApi.fetchTasks(controller.signal)
        .then(data => {
          const apiTasks = data.map(t => ({
            id: t.id, 
            title: t.title, 
            completed: t.completed, 
            priority: 'medium',
            category: 'Inne' // Domyślna kategoria dla danych z API
          }));
          setTasks(apiTasks);
        })
        .catch(err => {
          if (err.name !== 'AbortError') console.error("Błąd API:", err);
        })
        .finally(() => setIsLoading(false));
    }

    return () => controller.abort(); 
  }, []);

  // Zapisywanie do localStorage i symulacja API
  useEffect(() => {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    
    if (tasks.length > 0) {
      setIsSaving(true);
      tasksApi.saveTasks(tasks).finally(() => setIsSaving(false));
    }
  }, [tasks]);

  // --- AKCJE (Funkcje modyfikujące stan) ---

  const addTask = (newTask) => setTasks((prev) => [...prev, newTask]);
  
  const updateTask = (id, title) => setTasks((prev) => prev.map(t => t.id === id ? {...t, title} : t));
  
  const deleteTask = (id) => setTasks((prev) => prev.filter(t => t.id !== id));
  
  const toggleTask = (id) => setTasks((prev) => prev.map(t => t.id === id ? {...t, completed: !t.completed} : t));
  
  const changePriority = (id, priority) => setTasks((prev) => prev.map(t => t.id === id ? {...t, priority} : t));

  const clearAllTasks = () => {
    if (window.confirm("Czy na pewno chcesz usunąć wszystkie zadania?")) {
      setTasks([]);
    }
  };

  // Wartości, które udostępniamy całemu drzewu aplikacji
  const value = {
    tasks,
    isLoading,
    isSaving,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    changePriority,
    clearAllTasks
  };

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
};

// 3. Custom Hook z walidacją 
export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};