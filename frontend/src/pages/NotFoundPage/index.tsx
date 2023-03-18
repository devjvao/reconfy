import {type FunctionComponent} from 'react';
import {Trans, useTranslation} from 'react-i18next';
import {Box} from '../../ui/Box';
import {Link} from '../../ui/Link';
import {style} from './styles';

export const NotFoundPage: FunctionComponent = () => {
    const {t} = useTranslation('page', {keyPrefix: 'notFoundPage'});

    return (
        <Box style={style}>
            <span>404</span>
            <h1>{t('title')}</h1>
            <p>
                <Trans t={t} i18nKey="description">
                    <br />
                    <Link to="/" />
                </Trans>
            </p>
        </Box>
    );
};
