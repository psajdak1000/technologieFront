import { createContext, useState, useContext, useMemo } from 'react'; 
import { useTasks } from './TasksContext';

// 1. IMPORTUJEMY NASZE HOOKI
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useDebounce } from '../hooks/useDebounce'; // <--- DODANY IMPORT

const FilterContext = createContext(null);

export const FilterProvider = ({ children }) => {
  const { tasks } = useTasks();

  const [filterStatus, setFilterStatus] = useLocalStorage('taskFilterStatus', 'all');
  const [filterCategory, setFilterCategory] = useLocalStorage('taskFilterCategory', 'all');
  const [sortType, setSortType] = useLocalStorage('taskSortType', 'default');
  
  const [searchQuery, setSearchQuery] = useState('');

  // 2. TWORZYMY OPÓŹNIONĄ WERSJĘ WYSZUKIWANIA (300ms)
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredTasks = useMemo(() => {
    
    console.log("🔄 Przeprowadzam kosztowne filtrowanie..."); 
    
    return tasks
      .filter(task => {
        // 1. Status
        if (filterStatus === 'active' && task.completed) return false;
        if (filterStatus === 'completed' && !task.completed) return false;
        
        // 2. Kategoria
        if (filterCategory !== 'all' && task.category !== filterCategory) return false;
        
        // 3. Wyszukiwanie - ZMIANA na debouncedSearchQuery!
        if (debouncedSearchQuery) {
          if (!task.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase())) return false;
        }
        return true;
      })
      .sort((a, b) => {
        // 4. Sortowanie
        if (sortType === 'alpha') return a.title.localeCompare(b.title);
        if (sortType === 'priority') {
          const priorityWeight = { high: 3, medium: 2, low: 1 };
          return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
        }
        return 0;
      });

  // 4. ZMIANA ZALEŻNOŚCI: Reagujemy na debouncedSearchQuery, a nie na searchQuery
  }, [tasks, filterStatus, filterCategory, debouncedSearchQuery, sortType]); 

  const value = {
    filterStatus, setFilterStatus,
    filterCategory, setFilterCategory,
    searchQuery, setSearchQuery, // Tutaj zostaje standardowy setter, aby input działał płynnie
    sortType, setSortType,
    filteredTasks 
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
    const context = useContext(FilterContext);
    if (!context) throw new Error("useFilters error: must be used within FilterProvider");
    return context;
};