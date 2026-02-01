import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import TasksPage from './pages/TasksPage';
import SettingsPage from './pages/SettingsPage';
import NotFound from './pages/NotFound';
import TaskDetailsPage from './pages/TaskDetailsPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// Hooki już tu nie są potrzebne, są w TasksPage!
// App służy teraz tylko do definicji tras (Routing)

function App() {
  return (
    <Routes>
      {/* Layout jest rodzicem dla wszystkich podstron */}
      <Route path="/" element={<Layout />}>
        
        {/* Ścieżka główna: Wyświetla TasksPage */}
        <Route index element={<TasksPage />} />
        
        {/* Ścieżka /tasks również wyświetla TasksPage */}
        <Route path="tasks" element={<TasksPage />} />

        {/* NOWA TRASA: Dwukropek oznacza parametr dynamiczny (np. ID zadania) */}
        <Route path="tasks/:taskId" element={<TaskDetailsPage />} />
        
        {/* TRASA PUBLICZNA: Strona logowania */}
        <Route path="login" element={<LoginPage />} />
        
        {/* TRASA CHRONIONA: Dostępna tylko dla zalogowanych użytkowników */}
        <Route 
          path="settings" 
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Obsługa 404 - każda inna ścieżka */}
        <Route path="*" element={<NotFound />} />
        
      </Route>
    </Routes>
  );
}

export default App;