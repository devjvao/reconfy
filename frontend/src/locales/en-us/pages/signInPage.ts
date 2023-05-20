import {type Dictionary} from '../../index';
import {type SignInPageTranslations} from '../../../pages/SignInPage/translations';

export const signInPage: Dictionary<SignInPageTranslations> = {
    title: 'Sign in',
    description: 'or <0>create an account</0>',
    action: 'Sign in',
    error: {
        invalidCredentials: 'Invalid credentials, please verify them and retry.',
    },
    fields: {
        username: {
            label: 'Email',
            error: {
                empty: 'Please enter the email.',
                invalid: 'Please enter a valid email.',
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
