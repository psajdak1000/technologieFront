import { createContext, useContext, useEffect, useReducer, useCallback, useMemo } from 'react';
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

// 1. IMPORTUJEMY NASZ NOWY HOOK
import { useLocalStorage } from '../hooks/useLocalStorage';

const TasksContext = createContext(null);

export const TasksProvider = ({ children }) => {
  // 2. INICJALIZUJEMY HOOK (odczyt z pamięci przeglądarki)
  const [savedTasks, setSavedTasks] = useLocalStorage('myTasks', []);

  // 3. PRZEKAZUJEMY DANE Z HOOKA DO REDUCERA (zamiast używać localStorage.getItem)
  const [state, dispatch] = useReducer(tasksReducer, initialState, (defaultState) => {
    return savedTasks && savedTasks.length > 0 ? { ...defaultState, tasks: savedTasks } : defaultState;
  });

  // Efekt 1: Pobieranie danych z serwera (bez zmian)
  useEffect(() => {
    const controller = new AbortController();
    if (state.tasks.length === 0) {
      dispatch(setLoading(true));
      tasksApi.fetchTasks(controller.signal)
        .then(data => {
          const apiTasks = data.map(t => ({
            id: t.id,
            title: t.title,
            completed: t.completed,
            priority: 'medium',
            category: 'Inne'
          }));
          dispatch(tasksLoaded(apiTasks));
        })
        .catch(err => {
          if (err.name !== 'AbortError') {
            dispatch(setError('Nie udało się pobrać danych z serwera'));
            console.error(err);
          }
        });
    }
    return () => controller.abort();
  }, [state.tasks.length]);

  // Efekt 2: Zapisywanie zmian w zadaniach
  useEffect(() => {
    // 4. UŻYWAMY SETTERA Z HOOKA DO ZAPISU (zamiast localStorage.setItem)
    setSavedTasks(state.tasks);
    
    // Zapis do API (bez zmian)
    if (state.tasks.length > 0) {
      tasksApi.saveTasks(state.tasks).catch(err => console.error(err));
    }
  }, [state.tasks, setSavedTasks]);

  // OPTYMALIZACJE: useCallback (bez zmian)
  const addTask = useCallback((task) => dispatch(addTaskAction(task)), []);
  const deleteTask = useCallback((id) => dispatch(deleteTaskAction(id)), []);
  const toggleTask = useCallback((id) => dispatch(toggleTaskAction(id)), []);
  const updateTask = useCallback((id, title) => dispatch(updateTaskAction(id, title)), []);
  const changePriority = useCallback((id, priority) => dispatch(changePriorityAction(id, priority)), []);

  const clearAllTasks = useCallback(() => {
    if (window.confirm("Czy na pewno chcesz usunąć wszystkie zadania?")) {
      dispatch(clearAllAction());
    }
  }, []);

  const clearCompleted = useCallback(() => dispatch(clearCompletedAction()), []);
  const toggleAll = useCallback(() => dispatch(toggleAllAction()), []);

  // OPTYMALIZACJA: useMemo dla obiektu value (bez zmian)
  const value = useMemo(() => ({
    tasks: state.tasks,
    isLoading: state.isLoading,
    error: state.error,
    lastUpdated: state.lastUpdated,
    addTask,
    deleteTask,
    toggleTask,
    updateTask,
    changePriority,
    clearAllTasks,
    clearCompleted,
    toggleAll
  }), [
    state.tasks, state.isLoading, state.error, state.lastUpdated, 
    addTask, deleteTask, toggleTask, updateTask, changePriority, clearAllTasks, clearCompleted, toggleAll
  ]);

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