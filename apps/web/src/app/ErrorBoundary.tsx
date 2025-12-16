import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router';
import './ErrorBoundary.css';

export const ErrorBoundary: React.FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="error-boundary">
        <div className="error-boundary__container">
          <h1 className="error-boundary__title">{error.status}</h1>
          <p className="error-boundary__message">{error.statusText}</p>
          {error.data?.message && (
            <p className="error-boundary__details">{error.data.message}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="error-boundary">
      <div className="error-boundary__container">
        <h1 className="error-boundary__title">Oops!</h1>
        <p className="error-boundary__message">Something went wrong.</p>
        {error instanceof Error && (
          <p className="error-boundary__details">{error.message}</p>
        )}
      </div>
    </div>
  );
};

