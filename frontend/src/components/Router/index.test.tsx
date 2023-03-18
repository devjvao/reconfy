import * as ReactRouter from 'react-router-dom';
import {type RouteObject} from 'react-router-dom';
import {render} from '../../utils/testing/render';
import {Router} from './index';

jest.mock(
    'react-router-dom',
    () => ({
        __esModule: true,
        ...jest.requireActual('react-router-dom'),
        useRoutes: jest.fn(),
    }),
);

describe('<Router />', () => {
    it('should create the routes', () => {
        const callback = jest.fn();

        jest.spyOn(ReactRouter, 'useRoutes').mockImplementation(callback);

        const routes: RouteObject[] = [
            {
                path: '/',
                element: <div>Home</div>,
            },
        ];

        render({
            component: (
                <Router routes={routes} />
            ),
        });

        expect(callback).toHaveBeenCalledWith(routes);
    });
});
