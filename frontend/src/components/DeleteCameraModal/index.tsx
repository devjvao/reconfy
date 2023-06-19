import {type FunctionComponent, useState} from 'react';
import {type ControlledModalProps, Modal} from '../../ui/Modal';
import {Trans, useTranslation} from 'react-i18next';
import {actionsStyle} from '../CameraDialog/styles';
import {Button} from '../../ui/Button';
import {Box} from '../../ui/Box';
import {BACKEND_URL} from '../../utils/constants';
import {useAuth} from '../AuthProvider';
import {toast} from 'react-toastify';

interface DeleteCameraModalProps {
    id: number
    name: string
    state: ControlledModalProps['state']
    onDelete?: () => void
}

export const DeleteCameraModal: FunctionComponent<DeleteCameraModalProps> = props => {
    const {id, name, state, onDelete} = props;

    const {t} = useTranslation('component', {keyPrefix: 'deleteCameraModal'});
    const [loading, setLoading] = useState(false);
    const {token = ''} = useAuth();

    const [, setOpen] = state;

    const onConfirm = async (): Promise<void> => {
        setLoading(true);

        const response = await fetch(`${BACKEND_URL}/api/v1/cameras/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200) {
            toast(t('notification.error.internal', {type: 'error'}));

            setLoading(false);

            return;
        }

        toast(t('notification.success'), {type: 'success'});

        setLoading(false);

        setOpen(false);

        onDelete?.();
    };

    return (
        <Modal
            state={state}
            title={t('title')}
        >
            <Trans t={t} i18nKey="description" values={{name: name}}>
                <b />
            </Trans>
            <Box style={actionsStyle}>
                <Button onClick={() => setOpen(false)} variant="secondary">
                    {(t('action.cancel'))}
                </Button>
                <Button onClick={onConfirm} disabled={loading}>
                    {(t('action.confirm'))}
                </Button>
            </Box>
        </Modal>
    );
};
