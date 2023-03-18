import {type FunctionComponent, type ReactElement, type ReactNode} from 'react';
import {render as renderTestingLibrary, type RenderResult} from '@testing-library/react';
import i18next, {type InitOptions as i18nextInitOptions} from 'i18next';
import {BrowserRouter as BrowserRouterProvider} from 'react-router-dom';
import {I18nextProvider} from 'react-i18next';
import {type Dictionary, type Translation} from '../../locales';

type DeepPartial<T extends Record<string, any>> = T extends Record<string, any> ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;

export type PartialTranslation = DeepPartial<Dictionary<Translation>>;

export interface RenderProps {
    component: ReactElement
    translation?: PartialTranslation
}

const i18nextDefaultConfig: i18nextInitOptions = {
    lng: 'en-us',
    supportedLngs: ['en-us'],
    lowerCaseLng: true,
    load: 'currentOnly',
};

interface ProvidersProps {
    children?: ReactNode
    translation?: PartialTranslation
}

const Providers: FunctionComponent<ProvidersProps> = props => {
    const {children, translation = {}} = props;

    const i18nInstance = i18next.createInstance({
        ...i18nextDefaultConfig,
        resources: {
            'en-us': translation,
        },
    });

    i18nInstance.init();

    return (
        <I18nextProvider i18n={i18nInstance}>
            <BrowserRouterProvider>
                {children}
            </BrowserRouterProvider>
        </I18nextProvider>
    );
};

export const render = (props: RenderProps): RenderResult => {
    const {component, translation = {}} = props;

    return (
        renderTestingLibrary(
            component,
            {
                wrapper: wrapperProps => (
                    <Providers
                        translation={translation}
                        {...wrapperProps}
                    />
                ),
            },
        )
    );
};
