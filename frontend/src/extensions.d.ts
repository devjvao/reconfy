/// <reference types="react-scripts" />
import {type Translation} from './locales';

declare module 'i18next' {
    interface CustomTypeOptions {
        resources: Translation
    }
}

declare module 'react-i18next' {
    interface CustomTypeOptions {
        resources: Translation
    }
}
