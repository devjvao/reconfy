import {screen} from '@testing-library/react';
import {render} from '../../utils/testing/render';
import {Box} from './index';

describe('<Box />', () => {
    it('should render the provided children', () => {
        render({
            component: (
                <Box>
                    <h1>children</h1>
                </Box>
            ),
        });

        expect(screen.getByRole('heading', {name: 'children'})).toBeInTheDocument();
    });
});
