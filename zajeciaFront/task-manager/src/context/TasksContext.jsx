import { createContext, useContext, useEffect, useReducer } from 'react';
import { tasksApi } from '../api/tasksApi';
import { tasksReducer, initialState } from '../reducers/tasksReducer';
import { 
  setLoading, 
  tasksLoaded, 
  setError, 
  addTaskAction, 
  deleteTaskAction, 
  toggleTaskAction, 
  updateTaskAction, 
  changePriorityAction, 
  clearAllAction,
  clearCompletedAction, 
  toggleAllAction       
} from '../actions/taskActions';



const TasksContext = createContext(null);

export const TasksProvider = ({ children }) => {
  // 1. Inicjalizacja reducera z "Lazy Initialization" (wczytanie localStorage na start)
  const [state, dispatch] = useReducer(tasksReducer, initialState, (defaultState) => {
    const saved = localStorage.getItem('myTasks');
    return saved 
      ? { ...defaultState, tasks: JSON.parse(saved) } 
      : defaultState;
  });

  // 2. Efekt: Pobieranie danych z API (jeśli lista pusta)
  useEffect(() => {
    const controller = new AbortController();

    if (state.tasks.length === 0) {
      dispatch(setLoading(true)); // Używamy Action Creator

      tasksApi.fetchTasks(controller.signal)
        .then(data => {
          // Mapujemy dane z API (dodajemy brakujące pola)
          const apiTasks = data.map(t => ({
            id: t.id,
            title: t.title,
            completed: t.completed,
            priority: 'medium',
            category: 'Inne'
          }));
          
          dispatch(tasksLoaded(apiTasks)); // Wysyłamy akcję TASKS_LOADED
        })
        .catch(err => {
          if (err.name !== 'AbortError') {
            dispatch(setError('Nie udało się pobrać danych z serwera'));
            console.error(err);
          }
        });
    }

    return () => controller.abort();
  }, []); // Pusta tablica zależności - tylko przy montowaniu

  // 3. Efekt: Zapisywanie do localStorage i symulacja API przy każdej zmianie tasks
  useEffect(() => {
    localStorage.setItem('myTasks', JSON.stringify(state.tasks));
    
    // Opcjonalnie: symulacja zapisu do API (bez wpływu na Reducer, to tylko efekt uboczny)
    if (state.tasks.length > 0) {
      tasksApi.saveTasks(state.tasks).catch(err => console.error(err));
    }
  }, [state.tasks]);


  // 4. Funkcje pomocnicze (Wrapper Functions)
  // Komponenty nie muszą wiedzieć o "dispatch", po prostu wywołują funkcje jak dawniej
  
  const addTask = (task) => dispatch(addTaskAction(task));
  
  const deleteTask = (id) => dispatch(deleteTaskAction(id));
  
  const toggleTask = (id) => dispatch(toggleTaskAction(id));
  
  const updateTask = (id, title) => dispatch(updateTaskAction(id, title));
  
  const changePriority = (id, priority) => dispatch(changePriorityAction(id, priority));

  const clearCompleted = () => {
  // Usuwamy bez pytania, albo z pytaniem - jak wolisz
  dispatch(clearCompletedAction());
};

const toggleAll = () => {
  dispatch(toggleAllAction());
};

  const clearAllTasks = () => {
    if (window.confirm("Czy na pewno chcesz usunąć wszystkie zadania?")) {
      dispatch(clearAllAction());
    }
  };

  // 5. Wartości udostępniane w Context
  const value = {
    tasks: state.tasks,      // Pobieramy ze stanu reducera
    isLoading: state.isLoading,
    error: state.error,      // Nowość: obsługa błędów
    lastUpdated: state.lastUpdated, // Nowość: timestamp
    addTask,
    deleteTask,
    toggleTask,
    updateTask,
    changePriority,
    clearAllTasks,
    clearCompleted, 
    toggleAll       
  };

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};