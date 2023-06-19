import {type FunctionComponent, useState} from 'react';
import {useTranslation, type UseTranslationResponse} from 'react-i18next';
import * as yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {type ControlledModalProps, Modal} from '../../ui/Modal';
import {TextField} from '../../ui/TextField';
import {Button} from '../../ui/Button';
import {Form} from '../../ui/Form';
import {BACKEND_URL} from '../../utils/constants';
import {toast} from 'react-toastify';
import {useAuth} from '../AuthProvider';
import {Box} from '../../ui/Box';
import {actionsStyle} from './styles';

const useSchema = (t: UseTranslationResponse<'component', 'cameraDialog'>['t']): yup.Schema => {
    return yup
        .object()
        .shape({
            name: yup.string()
                .required(t('fields.name.error.empty'))
                .max(50, t('fields.name.error.max')),
            url: yup.string()
                .required(t('fields.url.error.empty'))
                .max(255, t('fields.url.error.max')),
        })
        .required();
};

interface Camera {
    id: number
    name: string
    url: string
}

interface CameraDialogProps {
    state: ControlledModalProps['state']
    id?: number
    defaultValues?: FormData
    onSuccess?: (camera: Camera) => void
}

type FormData = Omit<Camera, 'id'>;

export const CameraDialog: FunctionComponent<CameraDialogProps> = props => {
    const {state, id, defaultValues, onSuccess} = props;
    const isEditing = id !== undefined;
    const translationKey = isEditing ? 'edit' : 'new';

    const {t} = useTranslation('component', {keyPrefix: 'cameraDialog'});
    const schema = useSchema(t);
    const [, setOpen] = state;
    const {token = ''} = useAuth();
    const [loading, setLoading] = useState(false);

    const {register, handleSubmit, setError, reset, formState: {errors, isDirty}} = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });

    const onSubmit = async (formData: FormData): Promise<void> => {
        setLoading(true);

        const response = await fetch(`${BACKEND_URL}/api/v1/cameras${isEditing ? `/${id}` : ''}`, {
            method: isEditing ? 'PUT' : 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        switch (response.status) {
            case 200:
            case 201:
                toast(t(`notification.success.${translationKey}`), {type: 'success'});

                break;

            case 409:
                setError('url', {
                    type: 'conflict',
                    message: t('fields.url.error.conflict'),
                });

                return;

            default:
                toast(t('notification.error.internal', {type: 'error'}));

                return;
        }

        const data = await response.json();

        setLoading(false);

        setOpen(false);

        onSuccess?.(data);

        reset();
    };

    return (
        <Modal
            state={state}
            title={t(`title.${translationKey}`)}
        >
            <Form id="camera-form" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register(('name'))}
                    autoFocus
                    id="name"
                    type="text"
                    label={t('fields.name.label')}
                    error={errors.name?.message}
                    autoComplete="off"
                />
                <TextField
                    {...register(('url'))}
                    id="url"
                    type="text"
                    label={t('fields.url.label')}
                    error={errors.url?.message}
                    autoComplete="off"
                />
            </Form>
            <Box style={actionsStyle}>
                <Button onClick={() => setOpen(false)} variant="secondary">
                    {(t('action.cancel'))}
                </Button>
                <Button type="submit" form="camera-form" disabled={loading || !isDirty}>
                    {(t(`action.${translationKey}`))}
                </Button>
            </Box>
        </Modal>
    );
};
