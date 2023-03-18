import {type Dictionary, type Translation} from '../index';
import {notFound} from './pages/notFound';

const reconfy: Dictionary<Translation> = {
    page: {
        notFound: notFound,
    },
};

export default reconfy;
