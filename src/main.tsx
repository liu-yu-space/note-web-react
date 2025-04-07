import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './assets/styles/index.css';
import './assets/styles/md.css';
import App from './App.tsx';
import toggleMode from './utils/mode.ts';
import WMsg from './components/wmsg/wmsg.tsx';
import GlobalMsgProvider from '@/components/wmsg/GlobalMsgProvider.tsx';

toggleMode();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GlobalMsgProvider>
            <WMsg />
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </GlobalMsgProvider>
    </StrictMode>
);
