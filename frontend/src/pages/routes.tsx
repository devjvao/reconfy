import {Outlet, type RouteObject} from 'react-router-dom';
import {Layout} from '../components/Layout';
import {SignInPage} from './SignInPage';
import {NotFoundPage} from './NotFoundPage';
import {AuthProvider} from '../components/AuthProvider';
import {HomePage} from './HomePage';
import {SignUpPage} from './SignUpPage';

export const routes: RouteObject[] = [
    {
        element: (
            <AuthProvider>
                <Layout>
                    <Outlet />
                </Layout>
            </AuthProvider>
        ),
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/signin',
                element: <SignInPage />,
            },
            {
                path: '/signup',
                element: <SignUpPage />,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
];
