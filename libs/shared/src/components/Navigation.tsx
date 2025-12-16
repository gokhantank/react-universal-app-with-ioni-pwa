import React from 'react';
import { Link, NavLink } from 'react-router';
import './Navigation.css';

export const Navigation: React.FC = () => {
  return (
    <nav className="navigation">
      <div className="navigation__logo">
        <Link to="/" className="navigation__logo-link">
          <img src="/assets/logo.svg" alt="Heelix" className="navigation__logo-image" />
          <span className="navigation__logo-text">Heelix</span>
        </Link>
      </div>
      <div className="navigation__links">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'active' : '')}
          end
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/factor-analysis"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Factor Analysis
        </NavLink>
      </div>
    </nav>
  );
};

