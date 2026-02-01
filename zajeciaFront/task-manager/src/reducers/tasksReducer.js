// Definicja stanu początkowego
export const initialState = {
  tasks: [],
  isLoading: false,
  error: null,
  lastUpdated: null // Znacznik czasu ostatniej zmiany (wymóg Zadania 2)
};

// Funkcja Reducer - musi być "czysta" (żadnych fetchy czy localStorage tutaj!)
export const tasksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { 
        ...state, 
        isLoading: action.payload 
      };

    case 'TASKS_LOADED':
      return {
        ...state,
        tasks: action.payload,
        isLoading: false,
        error: null
      };

    case 'SET_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        lastUpdated: Date.now(),
        error: null
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.payload),
        lastUpdated: Date.now()
      };

    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t => 
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
        lastUpdated: Date.now()
      };

    case 'UPDATE_TASK': // Edycja tytułu
      return {
        ...state,
        tasks: state.tasks.map(t => 
          t.id === action.payload.id ? { ...t, title: action.payload.title } : t
        ),
        lastUpdated: Date.now()
      };

    case 'CHANGE_PRIORITY':
      return {
        ...state,
        tasks: state.tasks.map(t => 
          t.id === action.payload.id ? { ...t, priority: action.payload.priority } : t
        ),
        lastUpdated: Date.now()
      };

    case 'CLEAR_COMPLETED': // Dodatkowa akcja z Zadania 2 Część D
      return {
        ...state,
        tasks: state.tasks.filter(t => !t.completed),
        lastUpdated: Date.now()
      };

    case 'CLEAR_ALL':
      return {
        ...state,
        tasks: [],
        lastUpdated: Date.now()
      };

      case 'TOGGLE_ALL':
      // Sprawdzamy, czy wszystkie są już ukończone
      const allCompleted = state.tasks.every(t => t.completed);
      // Jeśli tak -> odznaczamy wszystkie. Jeśli nie -> zaznaczamy wszystkie.
      return {
        ...state,
        tasks: state.tasks.map(t => ({ ...t, completed: !allCompleted })),
        lastUpdated: Date.now()
      };

    




    default:
      throw new Error(`Nieznany typ akcji: ${action.type}`);
  }
};