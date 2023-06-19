import {type Dictionary, type Translation} from '../index';
import {notFoundPage} from './pages/notFoundPage';
import {signInPage} from './pages/signInPage';
import {signUpPage} from './pages/signUpPage';
import {menu} from './components/menu';
import {cameraDialog} from './components/cameraDialog';
import {deleteCameraModal} from './components/deleteCameraModal';

const reconfy: Dictionary<Translation> = {
    component: {
        menu: menu,
        cameraDialog: cameraDialog,
        deleteCameraModal: deleteCameraModal,
    },
    page: {
        notFoundPage: notFoundPage,
        signInPage: signInPage,
        signUpPage: signUpPage,
    },
};

export default reconfy;
