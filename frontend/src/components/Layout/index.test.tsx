import {screen} from '@testing-library/react';
import {render} from '../../utils/testing/render';
import {Layout} from './index';

describe('<Layout />', () => {
    it('should render the provided children', () => {
        render({
            component: <Layout>children</Layout>,
        });

        expect(screen.getByRole('navigation')).toBeInTheDocument();

        expect(screen.getByText('children')).toBeInTheDocument();
    });
});
