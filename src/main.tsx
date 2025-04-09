import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './assets/styles/index.css';
import './assets/styles/md.css';
import App from './App.tsx';
import { WMsg } from './components';
import { StoreProvider } from './store';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <StoreProvider>
            <WMsg />
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </StoreProvider>
    </StrictMode>
);
