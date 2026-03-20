// Definicja stanu początkowego (Rozbudowana o filtry zgodnie z wymogami PDF)
export const initialState = {
  tasks: [],
  filter: "all",          // Nowe: z instrukcji
  sortBy: "default",      // Nowe: z instrukcji
  searchQuery: "",        // Nowe: z instrukcji
  category: "all",        // Nowe: z instrukcji
  isLoading: false,
  error: null,
  lastUpdated: null       // Twoje rozszerzenie
};

// Funkcja Reducer - musi być "czysta"
export const tasksReducer = (state, action) => {
  switch (action.type) {
    // --- AKCJE DLA ZADAŃ (Twoje dotychczasowe + modyfikacje) ---
    case 'SET_LOADING':
      return { 
        ...state, 
        isLoading: action.payload 
      };

    case 'LOAD_TASKS': // Zmieniono z TASKS_LOADED na LOAD_TASKS wg PDF
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

    case 'UPDATE_TASK':
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

    case 'CHANGE_CATEGORY': // DODANE: z instrukcji PDF
      return {
        ...state,
        tasks: state.tasks.map(t => 
          t.id === action.payload.id ? { ...t, category: action.payload.category } : t
        ),
        lastUpdated: Date.now()
      };

    case 'CLEAR_COMPLETED':
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
      const allCompleted = state.tasks.every(t => t.completed);
      return {
        ...state,
        tasks: state.tasks.map(t => ({ ...t, completed: !allCompleted })),
        lastUpdated: Date.now()
      };

    // --- NOWE AKCJE DLA FILTRÓW I SORTOWANIA (Zgodnie z PDF) ---
    case 'SET_FILTER':
      return { ...state, filter: action.payload };

    case 'SET_SORT':
      return { ...state, sortBy: action.payload };

    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };

    case 'SET_CATEGORY_FILTER':
      return { ...state, category: action.payload };

    // Domyślny case wyłapujący błędy/literówki
    default:
      throw new Error(`Nieznany typ akcji: ${action.type}`);
  }
};