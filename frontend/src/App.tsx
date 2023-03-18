import {type FunctionComponent} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Router} from './components/Router';
import {routes} from './pages/routes';
import './locales/config';

export const App: FunctionComponent = () => (
    <BrowserRouter>
        <Router routes={routes} />
    </BrowserRouter>
);
