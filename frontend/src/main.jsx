import { createRoot } from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import { RecoilRoot } from 'recoil';
import App from './App.jsx';
import AuthInitializer from './components/AuthInitializer';
import './index.css'


createRoot(document.getElementById('root')).render(
        <RecoilRoot>
            <BrowserRouter>
                <AuthInitializer />
                <App />
            </BrowserRouter>
        </RecoilRoot>
);
