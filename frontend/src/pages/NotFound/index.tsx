import {type FunctionComponent} from 'react';
import {Link} from 'react-router-dom';
import {Trans, useTranslation} from 'react-i18next';
import {Box} from '../../ui/Box';
import {style} from './styles';

export const NotFound: FunctionComponent = () => {
    const {t} = useTranslation('page', {keyPrefix: 'notFound'});

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
