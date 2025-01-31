import React from 'react';
import ReactDOM from 'react-dom/client';  // Updated to 'react-dom/client' for React 18 and above
import './index.css';
import App from './App';

// Ensure we're accessing the root element properly
const rootElement = document.getElementById('root') as HTMLElement;

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
