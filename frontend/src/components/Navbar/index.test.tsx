import {screen} from '@testing-library/react';
import {Navbar} from './index';
import {render} from '../../utils/testing/render';

describe('<Navbar />', () => {
    it('should render the navbar', () => {
        render({
            component: <Navbar />,
        });

        expect(screen.getByRole('navigation')).toBeInTheDocument();

        expect(screen.getByRole('link', {name: 'logo.svg'})).toBeInTheDocument();
    });
});
