import React from 'react';
import { Outlet } from 'react-router';
import { Navigation } from '@heelix-workspace/shared';
import './App.css';

export const Layout: React.FC = () => {
  return (
    <div className="app-container">
      <Navigation />
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
};

