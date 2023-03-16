import {render, screen} from '@testing-library/react';
import {Box} from './index';

describe('<Box />', () => {
    it('should render the provided children', () => {
        render(
            <Box>
                <h1>children</h1>
            </Box>
        );

        expect(screen.getByRole('heading', {name: 'children'})).toBeInTheDocument();
    });
});
