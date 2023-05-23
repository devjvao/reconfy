import {type Dictionary} from '../../index';
import {type NewCameraDialogTranslations} from '../../../components/NewCameraDialog/translations';

export const newCameraDialog: Dictionary<NewCameraDialogTranslations> = {
    title: 'New camera',
    action: 'Create',
    error: {
        internal: 'Oops! Something went wrong. Please try again later.',
    },
    fields: {
        name: {
            label: 'Name',
            error: {
                empty: 'Please enter the name.',
            },
        },
        url: {
            label: 'Url',
            error: {
                empty: 'Please enter the url.',
                conflict: 'The url is already registered.',
            },
        },
        description: {
            label: 'Description',
        },
    },
};
