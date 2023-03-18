import {screen} from '@testing-library/react';
import {render} from '../../utils/testing/render';
import {TextField} from './index';

describe('<TextField />', () => {
    it('should render the field', () => {
        render({
            component: <TextField id="email" label="Email" />,
        });

        expect(screen.getByRole('textbox', {name: 'Email'})).toBeInTheDocument();
    });
});
