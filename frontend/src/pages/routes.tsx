import {Outlet, type RouteObject} from 'react-router-dom';
import {Layout} from '../components/Layout';
import {SignInPage} from './SignInPage';
import {NotFoundPage} from './NotFoundPage';

export const routes: RouteObject[] = [
    {
        element: (
            <Layout>
                <Outlet />
            </Layout>
        ),
        children: [
            {
                path: '/signin',
                element: <SignInPage />,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
        ],
    },
];
