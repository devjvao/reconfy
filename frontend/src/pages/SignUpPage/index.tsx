import {type FunctionComponent, useEffect} from 'react';
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
import {BACKEND_URL} from '../../utils/constants';
import {useAuth} from '../../components/AuthProvider';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

const useSchema = (t: UseTranslationResponse<'page', 'signUpPage'>['t']): yup.Schema => {
    return yup
        .object()
        .shape({
            name: yup.string()
                .required(t('fields.name.error.empty')),
            email: yup.string()
                .email(t('fields.email.error.invalid'))
                .required(t('fields.email.error.empty')),
            password: yup.string()
                .required(t('fields.password.error.empty')),
        })
        .required();
};

interface FormData {
    name: string
    email: string
    password: string
}

export const SignUpPage: FunctionComponent = () => {
    const {t} = useTranslation('page', {keyPrefix: 'signUpPage'});
    const schema = useSchema(t);
    const {authenticated} = useAuth();
    const navigate = useNavigate();

    const {register, handleSubmit, setError, formState: {errors}} = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSignUp = async (formData: FormData): Promise<void> => {
        const response = await fetch(`${BACKEND_URL}/api/v1/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.status !== 200) {
            if (response.status === 409) {
                setError('email', {
                    type: 'conflict',
                    message: t('fields.email.error.conflict'),
                });
            } else {
                toast(t('error.internal', {type: 'error'}));
            }

            return;
        }

        toast('Successfully signed up! You can sign in now.', {type: 'success'});

        navigate('/signin');
    };

    useEffect(
        () => {
            if (authenticated) {
                navigate('/');
            }
        },
        [authenticated, navigate],
    );

    return (
        <Box style={style}>
            <div className="wrapper">
                <header>
                    <h2>{t('title')}</h2>
                    <p>
                        <Trans t={t} i18nKey="description">
                            <Link to="/signin" />
                        </Trans>
                    </p>
                </header>
                <Form onSubmit={handleSubmit(onSignUp)}>
                    <TextField
                        {...register(('name'))}
                        id="name"
                        type="text"
                        label={t('fields.name.label')}
                        error={errors.name?.message}
                    />
                    <TextField
                        {...register(('email'))}
                        id="email"
                        type="email"
                        label={t('fields.email.label')}
                        error={errors.email?.message}
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
