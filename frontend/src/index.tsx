import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import 'react-toastify/dist/ReactToastify.min.css';
import './ui/Modal/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Suspense fallback={null}>
        <App />
    </Suspense>,
);
