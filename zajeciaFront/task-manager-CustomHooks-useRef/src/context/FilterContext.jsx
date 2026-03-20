import { createContext, useState, useContext, useMemo } from 'react'; 
import { useTasks } from './TasksContext';

// 1. IMPORTUJEMY NASZ HOOK
import { useLocalStorage } from '../hooks/useLocalStorage';

const FilterContext = createContext(null);

export const FilterProvider = ({ children }) => {
  const { tasks } = useTasks();

  // 2. ZAMIENIAMY useState NA useLocalStorage
  // Dzięki temu po odświeżeniu strony aplikacja zapamięta Twoje ustawienia!
  const [filterStatus, setFilterStatus] = useLocalStorage('taskFilterStatus', 'all');
  const [filterCategory, setFilterCategory] = useLocalStorage('taskFilterCategory', 'all');
  const [sortType, setSortType] = useLocalStorage('taskSortType', 'default');
  
  // Wyszukiwanie zostawiamy w zwykłym useState (zajmiemy się nim w Części C!)
  const [searchQuery, setSearchQuery] = useState('');

  // OPTYMALIZACJA: useMemo zapamiętuje wynik tej funkcji. (Bez zmian)
  const filteredTasks = useMemo(() => {
    
    console.log("🔄 Przeprowadzam kosztowne filtrowanie..."); 
    
    return tasks
      .filter(task => {
        // 1. Status
        if (filterStatus === 'active' && task.completed) return false;
        if (filterStatus === 'completed' && !task.completed) return false;
        
        // 2. Kategoria
        if (filterCategory !== 'all' && task.category !== filterCategory) return false;
        
        // 3. Wyszukiwanie
        if (searchQuery) {
          if (!task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
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

  }, [tasks, filterStatus, filterCategory, searchQuery, sortType]); 

  const value = {
    filterStatus, setFilterStatus,
    filterCategory, setFilterCategory,
    searchQuery, setSearchQuery,
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