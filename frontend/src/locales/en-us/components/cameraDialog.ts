import {type Dictionary} from '../../index';
import {type CameraDialogTranslations} from '../../../components/CameraDialog/translations';

export const cameraDialog: Dictionary<CameraDialogTranslations> = {
    title: {
        new: 'New camera',
        edit: 'Edit camera',
    },
    action: {
        new: 'Create',
        edit: 'Update',
    },
    notification: {
        success: {
            new: 'The camera was successfully created!',
            edit: 'The camera was successfully updated!',
        },
        error: {
            internal: 'Oops! Something went wrong. Please try again later.',
        },
    },
    fields: {
        name: {
            label: 'Name',
            error: {
                empty: 'The name is required.',
                max: 'The name must be at most 50 characters.',
            },
        },
        url: {
            label: 'Url',
            error: {
                empty: 'The url is required.',
                conflict: 'The url is already registered.',
                max: 'The url must be at most 255 characters.',
            },
        },
    },
};
