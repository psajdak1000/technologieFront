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

const TasksContext = createContext(null);

export const TasksProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState, (defaultState) => {
    const saved = localStorage.getItem('myTasks');
    return saved ? { ...defaultState, tasks: JSON.parse(saved) } : defaultState;
  });

  // 1. Efekt: Pobieranie danych
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
  }, []);

  // 2. Efekt: Zapisywanie (zwróciłem tu tasksApi.saveTasks z Twojego oryginału)
  useEffect(() => {
    localStorage.setItem('myTasks', JSON.stringify(state.tasks));
    
    if (state.tasks.length > 0) {
      tasksApi.saveTasks(state.tasks).catch(err => console.error(err));
    }
  }, [state.tasks]);


  // 3. OPTYMALIZACJA: useCallback
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

  // 4. OPTYMALIZACJA: useMemo dla obiektu value
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