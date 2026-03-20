// 1. ZMIANA: Dodajemy 'previousTasks: null' do initialState
export const initialState = {
  tasks: [],
  previousTasks: null,    
  filter: "all",
  sortBy: "default",
  searchQuery: "",
  category: "all",
  isLoading: false,
  error: null,
  lastUpdated: null
};

// Funkcja pomocnicza: Zapisuje historię przed modyfikacją tablicy
const saveHistory = (state) => ({ ...state, previousTasks: state.tasks });

export const tasksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING': return { ...state, isLoading: action.payload };
    case 'LOAD_TASKS': return { ...state, tasks: action.payload, isLoading: false, error: null };
    case 'SET_ERROR': return { ...state, isLoading: false, error: action.payload };

    // --- ZMIANA: Każda akcja modyfikująca zadania najpierw zapisuje historię! ---
    case 'ADD_TASK':
      return { ...saveHistory(state), tasks: [...state.tasks, action.payload], lastUpdated: Date.now(), error: null };

    case 'DELETE_TASK':
      return { ...saveHistory(state), tasks: state.tasks.filter(t => t.id !== action.payload), lastUpdated: Date.now() };

    case 'TOGGLE_TASK':
      return {
        ...saveHistory(state),
        tasks: state.tasks.map(t => t.id === action.payload ? { ...t, completed: !t.completed } : t),
        lastUpdated: Date.now()
      };

    case 'UPDATE_TASK':
      return {
        ...saveHistory(state),
        tasks: state.tasks.map(t => t.id === action.payload.id ? { ...t, title: action.payload.title } : t),
        lastUpdated: Date.now()
      };

    case 'CHANGE_PRIORITY':
      return {
        ...saveHistory(state),
        tasks: state.tasks.map(t => t.id === action.payload.id ? { ...t, priority: action.payload.priority } : t),
        lastUpdated: Date.now()
      };

    case 'CHANGE_CATEGORY':
      return {
        ...saveHistory(state),
        tasks: state.tasks.map(t => t.id === action.payload.id ? { ...t, category: action.payload.category } : t),
        lastUpdated: Date.now()
      };

    case 'CLEAR_COMPLETED':
      return { ...saveHistory(state), tasks: state.tasks.filter(t => !t.completed), lastUpdated: Date.now() };

    case 'CLEAR_ALL':
      return { ...saveHistory(state), tasks: [], lastUpdated: Date.now() };

    case 'TOGGLE_ALL':
      const allCompleted = state.tasks.every(t => t.completed);
      return {
        ...saveHistory(state),
        tasks: state.tasks.map(t => ({ ...t, completed: !allCompleted })),
        lastUpdated: Date.now()
      };

    // --- NOWOŚĆ: Przesuwanie zadań w górę i w dół ---
    case 'REORDER_TASKS':
      const { index, direction } = action.payload;
      const newTasks = [...state.tasks];
      
      // Obliczamy nowy indeks
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      
      // Zabezpieczenie przed wyjściem poza tablicę
      if (newIndex < 0 || newIndex >= newTasks.length) return state;

      // Magiczna podmiana elementów w tablicy
      [newTasks[index], newTasks[newIndex]] = [newTasks[newIndex], newTasks[index]];

      return { ...saveHistory(state), tasks: newTasks, lastUpdated: Date.now() };

    // --- NOWOŚĆ: Cofanie ostatniej akcji (Undo) ---
    case 'UNDO':
      if (!state.previousTasks) return state; // Nie ma do czego wracać
      return {
        ...state,
        tasks: state.previousTasks, // Przywracamy stare zadania
        previousTasks: null,        // Czyścimy historię (pozwala cofnąć tylko raz)
        lastUpdated: Date.now()
      };

    case 'SET_FILTER': return { ...state, filter: action.payload };
    case 'SET_SORT': return { ...state, sortBy: action.payload };
    case 'SET_SEARCH': return { ...state, searchQuery: action.payload };
    case 'SET_CATEGORY_FILTER': return { ...state, category: action.payload };

    default: throw new Error(`Nieznany typ akcji: ${action.type}`);
  }
};