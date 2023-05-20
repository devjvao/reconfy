import {type Dictionary, type Translation} from '../index';
import {notFoundPage} from './pages/notFoundPage';
import {signInPage} from './pages/signInPage';
import {signUpPage} from './pages/signUpPage';

const reconfy: Dictionary<Translation> = {
    page: {
        notFoundPage: notFoundPage,
        signInPage: signInPage,
        signUpPage: signUpPage,
    },
};

export default reconfy;
