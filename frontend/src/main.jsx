import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import { RecoilRoot } from 'recoil';
import App from './App.jsx';
import AuthInitializer from './components/AuthInitializer';



createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RecoilRoot>
            <BrowserRouter>
                <AuthInitializer />
                <App />
            </BrowserRouter>
        </RecoilRoot>
    </StrictMode>
);
