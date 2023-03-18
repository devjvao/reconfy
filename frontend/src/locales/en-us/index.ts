import {type Dictionary, type Translation} from '../index';
import {notFoundPage} from './pages/notFoundPage';
import {signInPage} from './pages/signInPage';

const reconfy: Dictionary<Translation> = {
    page: {
        notFoundPage: notFoundPage,
        signInPage: signInPage,
    },
};

export default reconfy;
