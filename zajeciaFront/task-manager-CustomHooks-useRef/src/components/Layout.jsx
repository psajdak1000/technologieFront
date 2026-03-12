import { Outlet, NavLink } from 'react-router-dom';
import Header from './Header';
import QuoteOfTheDay from './QuoteOfTheDay';
import './Layout.css'; 

function Layout() {
  return (
    <div className="app-container">
      <header className="main-header">
        <Header />
        <QuoteOfTheDay />
        
        {/* NAWIGACJA (Część B) */}
        <nav className="main-nav">
          {/* NavLink automatycznie dodaje klasę 'active' */}
          <NavLink to="/" end>Lista Zadań</NavLink>
          <NavLink to="/settings">Ustawienia</NavLink>
        </nav>
      </header>

      {/* Breadcrumbs (Placeholder na Część B) */}
      <div className="breadcrumbs">
        <small>Home / ...</small>
      </div>

      <main className="main-content">
        {/* Tutaj React Router wstrzykuje wybraną stronę */}
        <Outlet />
      </main>

      <footer className="main-footer">
        <p>&copy; 2026 Menedżer Zadań React</p>
      </footer>
    </div>
  );
}

export default Layout;