import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import TasksPage from './pages/TasksPage';
import SettingsPage from './pages/SettingsPage';
import NotFound from './pages/NotFound';
import TaskDetailsPage from './pages/TaskDetailsPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

// Importujemy Providery (Konteksty)
import { TasksProvider } from './context/TasksContext';
import { FilterProvider } from './context/FilterContext';
import { ThemeProvider } from './context/ThemeContext'; //  (Dark Mode)

import './App.css';

function App() {
  return (
    // KOLEJNOŚĆ JEST WAŻNA:
    // 1. ThemeProvider (wygląd)
    // 2. TasksProvider (dane)
    // 3. FilterProvider (filtrowanie danych)
    // 4. Routes (nawigacja)
    <ThemeProvider>
      <TasksProvider>
        <FilterProvider>
          <Routes>
            {/* Layout jest rodzicem dla wszystkich podstron */}
            <Route path="/" element={<Layout />}>
              
              {/* Ścieżka główna: Wyświetla TasksPage */}
              <Route index element={<TasksPage />} />
              
              {/* Ścieżka /tasks również wyświetla TasksPage */}
              <Route path="tasks" element={<TasksPage />} />

              {/* Dynamiczna ścieżka do szczegółów */}
              <Route path="tasks/:taskId" element={<TaskDetailsPage />} />
              
              {/* Strona logowania */}
              <Route path="login" element={<LoginPage />} />
              
              {/* Trasa chroniona: Ustawienia */}
              <Route 
                path="settings" 
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Obsługa 404 */}
              <Route path="*" element={<NotFound />} />
              
            </Route>
          </Routes>
        </FilterProvider>
      </TasksProvider>
    </ThemeProvider>
  );
}

export default App;