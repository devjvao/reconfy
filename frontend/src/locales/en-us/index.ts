import {type Dictionary, type Translation} from '../index';
import {notFoundPage} from './pages/notFoundPage';
import {signInPage} from './pages/signInPage';
import {signUpPage} from './pages/signUpPage';
import {menu} from './components/menu';
import {newCameraDialog} from './components/newCameraDialog';

const reconfy: Dictionary<Translation> = {
    component: {
        menu: menu,
        newCameraDialog: newCameraDialog,
    },
    page: {
        notFoundPage: notFoundPage,
        signInPage: signInPage,
        signUpPage: signUpPage,
    },
};

export default reconfy;
