import {type FunctionComponent, useState} from 'react';
import {Box} from '../../ui/Box';
import {style} from './styles';
import {useForm} from 'react-hook-form';
import {Form} from '../../ui/Form';
import {TextField} from '../../ui/TextField';
import {Link} from '../../ui/Link';
import {Button} from '../../ui/Button';
import {Trans, useTranslation, type UseTranslationResponse} from 'react-i18next';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const useSchema = (t: UseTranslationResponse<'page', 'signInPage'>['t']): yup.Schema => {
    return yup
        .object()
        .shape({
            username: yup.string()
                .email(t('fields.username.error.invalid'))
                .required(t('fields.username.error.empty')),
            password: yup.string()
                .required(t('fields.password.error.empty')),
        })
        .required();
};

interface FormData {
    username: string
    password: string
}

export const SignInPage: FunctionComponent = () => {
    const {t} = useTranslation('page', {keyPrefix: 'signInPage'});
    const schema = useSchema(t);
    const [invalidCredentials, setInvalidCredentials] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSignIn = async (formData: FormData): Promise<void> => {
        const body = Object.entries(formData)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        const response = await fetch('http://localhost:8000/api/v1/login/access-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: body,
        });

        if (response.status === 400) {
            setInvalidCredentials(true);

            return;
        }

        setInvalidCredentials(false);

        const responseBody = await response.json();

        console.log(responseBody);
    };

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
                {invalidCredentials && (
                    <div className="invalid-credentials">
                        {t('error.invalidCredentials')}
                    </div>
                )}
                <Form onSubmit={handleSubmit(onSignIn)}>
                    <TextField
                        {...register(('username'))}
                        id="username"
                        type="email"
                        label={t('fields.username.label')}
                        error={errors.username?.message}
                    />
                    <TextField
                        {...register(('password'))}
                        id="password"
                        type="password"
                        label={t('fields.password.label')}
                        error={errors.password?.message}
                    />
                    <Button type="submit">
                        {(t('action'))}
                    </Button>
                </Form>
            </div>
        </Box>
    );
};
