import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const isAbout = pathname === '/about';

  return (
    <div className={`layout ${isHome ? 'layout--home' : ''} ${isAbout ? 'layout--about' : ''}`}>
      <header className="header">
        <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>Jared Poulsen</Link>
        <button 
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        {menuOpen && (
          <div 
            className="nav-backdrop" 
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}
        <nav className={`nav ${menuOpen ? 'nav--open' : ''}`}>
          <Link to="/" className="nav-link-home" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/projects" onClick={() => setMenuOpen(false)}>Passion Projects</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
