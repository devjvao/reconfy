import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import esUs from './en-us';

export const resources = {
    en: esUs,
};

i18next.use(initReactI18next).init({
    lng: 'en',
    debug: process.env.NODE_ENV === 'development',
    resources,
});
