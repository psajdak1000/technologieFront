import { createContext, useContext, useEffect, useReducer } from 'react';
import { tasksApi } from '../api/tasksApi';
import { tasksReducer, initialState } from '../reducers/tasksReducer';

const TasksContext = createContext(null);

// 1. FUNKCJA INIT: Pobiera początkowy stan z localStorage (wymóg z Części B)
function init(defaultState) {
  const saved = localStorage.getItem('myTasks');
  return {
    ...defaultState,
    tasks: saved ? JSON.parse(saved) : defaultState.tasks
  };
}

export const TasksProvider = ({ children }) => {
  // 2. CENTRALNY useReducer: Podpinamy reducer, stan początkowy i funkcję inicjalizującą
  const [state, dispatch] = useReducer(tasksReducer, initialState, init);

  // Efekt 1: Pobieranie danych z serwera (zostawiłem Twoją logikę API, ale z nowym dispatchem!)
  useEffect(() => {
    const controller = new AbortController();
    if (state.tasks.length === 0) {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      tasksApi.fetchTasks(controller.signal)
        .then(data => {
          const apiTasks = data.map(t => ({
            ...t,
            priority: 'medium',
            category: 'Inne'
          }));
          dispatch({ type: 'LOAD_TASKS', payload: apiTasks });
        })
        .catch(err => {
          if (err.name !== 'AbortError') {
            dispatch({ type: 'SET_ERROR', payload: 'Nie udało się pobrać danych z serwera' });
          }
        });
    }
    return () => controller.abort();
  }, [state.tasks.length]);

  // 3. Efekt 2: Zapisywanie do localStorage za każdym razem, gdy zmienią się zadania (wymóg z Części B)
  useEffect(() => {
    localStorage.setItem('myTasks', JSON.stringify(state.tasks));
    
    // Zapis do API
    if (state.tasks.length > 0) {
      tasksApi.saveTasks(state.tasks).catch(err => console.error(err));
    }
  }, [state.tasks]);

  // 4. PRZEKAZUJEMY TYLKO STATE I DISPATCH
  // Pozbyliśmy się sterty callbacków (addTask, deleteTask itp.). 
  // Teraz komponenty same wywołają dispatch({ type: '...', payload: ... })
  return (
    <TasksContext.Provider value={{ state, dispatch }}>
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