import {screen} from '@testing-library/react';
import {render} from '../../utils/testing/render';
import {Button} from './index';

describe('<Button />', () => {
    it('should render the button', () => {
        render({
            component: (
                <Button type="submit">
                    Sign in
                </Button>
            ),
        });

        const button = screen.getByRole('button', {name: 'Sign in'});

        expect(button).toBeInTheDocument();

        expect(button).toHaveAttribute('type', 'submit');
    });
});
