import {type FunctionComponent} from 'react';
import {Box} from '../../ui/Box';
import {style} from './styles';
import {useForm} from 'react-hook-form';
import {Form} from '../../ui/Form';
import {TextField} from '../../ui/TextField';
import {Link} from '../../ui/Link';
import {Button} from '../../ui/Button';
import {Trans, useTranslation} from 'react-i18next';

interface FormData {
    username: string
    password: string
}

export const SignInPage: FunctionComponent = () => {
    const {register, handleSubmit} = useForm<FormData>();
    const {t} = useTranslation('page', {keyPrefix: 'signInPage'});

    return (
        <Box style={style}>
            <div className="wrapper">
                <header>
                    <h2>{t('title')}</h2>
                    <p>
                        <Trans t={t} i18nKey="description">
                            <Link to="/signup" />
                        </Trans>
                    </p>
                </header>
                <Form onSubmit={handleSubmit(data => { console.log(data); })}>
                    <TextField
                        {...register(('username'))}
                        id="username"
                        label={t('fields.username.label')}
                    />
                    <TextField
                        {...register(('password'))}
                        id="password"
                        type="password"
                        label={t('fields.password.label')}
                    />
                    <Button type="submit">
                        {(t('action'))}
                    </Button>
                </Form>
            </div>
        </Box>
    );
};
