import {type PageTranslations} from '../pages/translations';
import {type ComponentTranslations} from '../components/translations';

export type Dictionary<T extends Record<string, any>> = {
    [P in keyof T]: T[P] extends Record<string, any> ? Dictionary<T[P]> : T[P];
};

export interface Translation {
    page: PageTranslations
    component: ComponentTranslations
}
