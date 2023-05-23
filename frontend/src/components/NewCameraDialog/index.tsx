import {type FunctionComponent, useState} from 'react';
import {useTranslation, type UseTranslationResponse} from 'react-i18next';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Modal, type ModalProps} from '../Modal';
import {TextField} from '../../ui/TextField';
import {Button} from '../../ui/Button';
import {Form} from '../../ui/Form';
import {BACKEND_URL} from '../../utils/constants';
import {toast} from 'react-toastify';
import {useAuth} from '../AuthProvider';

const useSchema = (t: UseTranslationResponse<'component', 'newCameraDialog'>['t']): yup.Schema => {
    return yup
        .object()
        .shape({
            name: yup.string()
                .required(t('fields.name.error.empty')),
            url: yup.string()
                .required(t('fields.url.error.empty')),
            description: yup.string(),
        })
        .required();
};

interface NewCameraDialogProps {
    disclosure: ModalProps['disclosure']
}

interface FormData {
    name: string
    url: string
    description?: string
}

export const NewCameraDialog: FunctionComponent<NewCameraDialogProps> = ({disclosure}) => {
    const {t} = useTranslation('component', {keyPrefix: 'newCameraDialog'});
    const schema = useSchema(t);
    const state = useState(false);
    const [, setOpen] = state;
    const {token = ''} = useAuth();

    const {register, handleSubmit, setError, formState: {errors}} = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (formData: FormData): Promise<void> => {
        const response = await fetch(`${BACKEND_URL}/api/v1/cameras`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.status !== 200) {
            if (response.status === 409) {
                setError('url', {
                    type: 'conflict',
                    message: t('fields.url.error.conflict'),
                });
            } else {
                toast(t('error.internal', {type: 'error'}));
            }

            return;
        }

        toast('The camera was successfully created!', {type: 'success'});

        setOpen(false);
    };

    return (
        <Modal
            state={state}
            title={t('title')}
            disclosure={disclosure}
        >
            <Form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register(('name'))}
                    id="name"
                    type="text"
                    label={t('fields.name.label')}
                    error={errors.name?.message}
                />
                <TextField
                    {...register(('description'))}
                    id="description"
                    type="text"
                    label={t('fields.description.label')}
                    error={errors.description?.message}
                />
                <TextField
                    {...register(('url'))}
                    id="url"
                    type="text"
                    label={t('fields.url.label')}
                    error={errors.url?.message}
                />
                <Button type="submit">
                    {(t('action'))}
                </Button>
            </Form>
        </Modal>
    );
};
