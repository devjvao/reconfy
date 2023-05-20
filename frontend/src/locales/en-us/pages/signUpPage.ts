import {type Dictionary} from '../../index';
import {type SignUpPageTranslations} from '../../../pages/SignUpPage/translations';

export const signUpPage: Dictionary<SignUpPageTranslations> = {
    title: 'Sign up',
    description: 'already have an account? <0>sign in</0>',
    action: 'Sign up',
    error: {
        internal: 'Oops! Something went wrong. Please try again later.',
    },
    fields: {
        name: {
            label: 'Name',
            error: {
                empty: 'Please enter your name.',
            },
        },
        email: {
            label: 'Email',
            error: {
                empty: 'Please enter the email.',
                invalid: 'Please enter a valid email.',
                conflict: 'The email is already registered.',
            },
        },
        password: {
            label: 'Password',
            error: {
                empty: 'Please enter the password.',
            },
        },
    },
};
