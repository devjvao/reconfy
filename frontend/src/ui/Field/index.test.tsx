import {screen} from '@testing-library/react';
import {render} from '../../utils/testing/render';
import {Field} from './index';

describe('<Field />', () => {
    it('should render the field with the provided children', () => {
        render({
            component: (
                <Field label="Email">
                    children
                </Field>
            ),
        });

        expect(screen.getByText('Email', {selector: 'label'})).toBeInTheDocument();

        expect(screen.getByText('children')).toBeInTheDocument();
    });
});
