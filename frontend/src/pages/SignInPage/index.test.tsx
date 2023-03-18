import {screen} from '@testing-library/react';
import {type PartialTranslation, render} from '../../utils/testing/render';
import {SignInPage} from './index';

const translation: PartialTranslation = {
    page: {
        signInPage: {
            title: 'title',
            description: 'description <0>sign up</0>',
            action: 'action',
            fields: {
                username: {
                    label: 'username:label',
                },
                password: {
                    label: 'password:label',
                },
            },
        },
    },
};

describe('<SignInPage />', () => {
    it('should render the page', () => {
        render({
            component: <SignInPage />,
            translation: translation,
        });

        expect(screen.getByRole('heading', {name: 'title', level: 2})).toBeInTheDocument();

        expect(screen.getByText('description')).toBeInTheDocument();

        const signUpLink = screen.getByRole('link', {name: 'sign up'});

        expect(signUpLink).toBeInTheDocument();

        expect(signUpLink).toHaveAttribute('href', '/signup');

        expect(screen.getByRole('textbox', {name: 'username:label'})).toBeInTheDocument();

        expect(screen.getByLabelText('password:label')).toBeInTheDocument();

        expect(screen.getByRole('button', {name: 'action'})).toBeInTheDocument();
    });
});
