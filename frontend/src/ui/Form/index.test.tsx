import {screen} from '@testing-library/react';
import {render} from '../../utils/testing/render';
import {Form} from './index';
import userEvent from '@testing-library/user-event';

jest.mock(
    './styles',
    () => ({
        __esModule: true,
        ...jest.requireActual('./styles'),
        computeStyle: jest.fn(jest.requireActual('./styles').computeStyle),
    }),
);

describe('<Form />', () => {
    it('should render the provided children', () => {
        const {container} = render({
            component: (
                <Form>
                    <input type="text" />
                    <button type="submit">Submit</button>
                </Form>
            ),
        });

        expect(screen.getByRole('textbox')).toBeInTheDocument();

        expect(screen.getByRole('button')).toBeInTheDocument();

        expect(container.firstChild).toHaveAttribute('noValidate');
    });

    it('should invoke the onSubmit callback when the form is submitted', async () => {
        const callback = jest.fn(event => event.preventDefault);

        render({
            component: (
                <Form onSubmit={callback}>
                    <button type="submit">Submit</button>
                </Form>
            ),
        });

        expect(callback).not.toHaveBeenCalled();

        await userEvent.click(screen.getByRole('button'));

        expect(callback).toHaveBeenCalledTimes(1);
    });
});
