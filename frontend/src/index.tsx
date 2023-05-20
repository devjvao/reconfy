import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import {ToastContainer} from 'react-toastify';
import {App} from './App';

import 'react-toastify/dist/ReactToastify.min.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Suspense fallback={null}>
        <App />
        <ToastContainer />
    </Suspense>,
);
