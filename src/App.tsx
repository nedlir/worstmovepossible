import React from "react";
import { HashRouter, Link } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";
import { useMenu } from "./hooks/useMenu";
import "./app.css";

const App: React.FC = () => {
  const { isMenuOpen, toggleMenu, closeMenu, touchProps } = useMenu();

  return (
    <HashRouter>
      <div className="app">
        <nav className="nav-container">
          <div className="nav-left">
            <div className="logo">
              <Link to="/" onClick={closeMenu} {...touchProps}>
                ♟ WorstMovePossible.com
                <span className="logo-beta-badge">BETA</span>
              </Link>
            </div>
            <button
              className="menu-button"
              onClick={toggleMenu}
              {...touchProps}
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>
        </nav>

        <div className={`menu-nav ${isMenuOpen ? "open" : ""}`}>
          <Link to="/" onClick={closeMenu} {...touchProps}>
            Puzzles
          </Link>
          <Link to="/contribute" onClick={closeMenu} {...touchProps}>
            Contribute
          </Link>
          <Link to="/about" onClick={closeMenu} {...touchProps}>
            About
          </Link>
        </div>

        <main className="main-content">
          <AppRouter />
        </main>
      </div>
    </HashRouter>
  );
};

export default App;
