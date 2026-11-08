import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './hooks/AuthProvider.jsx';
import './fonts.css';
import './index.css';
import { supabaseConfigError } from '../utils/supabase.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {supabaseConfigError ? (
      <main style={{ maxWidth: 640, margin: '15vh auto', padding: 24 }}>
        <h1>LearnSpace tạm thời chưa sẵn sàng</h1>
        <p role="alert">{supabaseConfigError}</p>
      </main>
    ) : <BrowserRouter>
      <AuthProvider><App /></AuthProvider>
    </BrowserRouter>}
  </StrictMode>,
);
