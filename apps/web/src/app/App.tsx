import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Layout } from './Layout';
import { ErrorBoundary } from './ErrorBoundary';
import './App.css';

// Lazy load pages for code splitting
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const FactorAnalysis = React.lazy(() => import('./pages/FactorAnalysis'));

// Loading component
const PageLoader: React.FC = () => (
  <div className="page-loader">
    <div className="page-loader__spinner"></div>
    <p>Loading...</p>
  </div>
);

// Create router with React Router v7 features
// Using createBrowserRouter for modern routing with data APIs support
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Dashboard />
          </Suspense>
        ),
        // Example loader (commented out as data is static in this app)
        // loader: async () => {
        //   // Fetch data before rendering
        //   const data = await fetchDashboardData();
        //   return { data };
        // },
      },
      {
        path: 'factor-analysis',
        element: (
          <Suspense fallback={<PageLoader />}>
            <FactorAnalysis />
          </Suspense>
        ),
        // Example loader (commented out as data is static in this app)
        // loader: async () => {
        //   const data = await fetchFactorAnalysisData();
        //   return { data };
        // },
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
