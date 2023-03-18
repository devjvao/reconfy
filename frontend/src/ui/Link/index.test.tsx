import {render} from '../../utils/testing/render';
import {Link} from './index';
import {screen} from '@testing-library/react';

describe('<Link />', () => {
    it('should render the link', () => {
        render({
            component: <Link to="/signup">Sign up</Link>,
        });

        const link = screen.getByRole('link', {name: 'Sign up'});

        expect(link).toBeInTheDocument();

        expect(link).toHaveAttribute('href', '/signup');
    });
});
