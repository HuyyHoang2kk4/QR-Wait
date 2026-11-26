import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './app/ThemeContext';
import { AuthProvider } from './app/AuthContext';
import { WebSocketProvider } from './app/WebSocketProvider';
import { appRouter } from './app/router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <WebSocketProvider>
          <RouterProvider router={appRouter} />
        </WebSocketProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
