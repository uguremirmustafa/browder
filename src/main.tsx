import { RightClickContext } from 'context/right-click-context';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RightClickContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RightClickContext>
  </React.StrictMode>
);
