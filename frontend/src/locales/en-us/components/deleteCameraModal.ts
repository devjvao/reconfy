import {type Dictionary} from '../../index';
import {type DeleteCameraModalTranslations} from '../../../components/DeleteCameraModal/translations';

export const deleteCameraModal: Dictionary<DeleteCameraModalTranslations> = {
    title: 'Delete camera',
    description: 'Do you really want to delete the camera <0>{{name}}</0>?',
    action: {
        cancel: 'Cancel',
        confirm: 'Delete',
    },
    notification: {
        success: 'The camera was successfully deleted!',
        error: {
            internal: 'Oops! Something went wrong. Please try again later.',
        },
    },
};
