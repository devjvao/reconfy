import {type FunctionComponent} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Layout} from './components/Layout';
import {Login} from './pages/Login';
import {NotFound} from './pages/NotFound';
import './locales/config';

export const App: FunctionComponent = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};
