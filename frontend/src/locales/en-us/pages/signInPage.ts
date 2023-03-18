import {type Dictionary} from '../../index';
import {type SignInPageTranslations} from '../../../pages/SignInPage/translations';

export const signInPage: Dictionary<SignInPageTranslations> = {
    title: 'Sign in',
    description: 'or <0>create an account</0>',
    action: 'Sign in',
    fields: {
        username: {
            label: 'Email',
        },
        password: {
            label: 'Password',
        },
    },
};
