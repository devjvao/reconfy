import {Fragment, type FunctionComponent, useEffect, useState} from 'react';
import {BACKEND_URL, BACKEND_WS_URL} from '../../utils/constants';
import {Box} from '../../ui/Box';
import {style} from './styles';
import {ReactComponent as LoadingIcon} from '../../assets/loading.svg';
import classNames from 'classnames';
import {ReactComponent as EditIcon} from '../../assets/edit.svg';
import {ReactComponent as RemoveIcon} from '../../assets/remove.svg';
import {CameraDialog} from '../CameraDialog';
import {useCamerasContext} from '../CamerasProvider';
import {DeleteCameraModal} from '../DeleteCameraModal';

interface CameraProps {
    id: number
    index: number
    name: string
    url: string
}

export const Camera: FunctionComponent<CameraProps> = props => {
    const {index, id, name, url} = props;

    const {updateCamera, removeCamera} = useCamerasContext();
    const [src, setSrc] = useState('');
    const [loading, setLoading] = useState(true);
    const [hasFire, setFire] = useState(false);

    const formModalState = useState(false);
    const [formModalOpen, setFormModalOpen] = formModalState;

    const deleteModalState = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = deleteModalState;

    useEffect(
        () => {
            const websocket = new WebSocket(`${BACKEND_WS_URL}/api/v1/stream/connect/${id}`);

            websocket.onopen = () => setLoading(false);

            websocket.onmessage = (event) => {
                const payload = JSON.parse(event.data);

                const {key, hasFire} = payload;

                if (typeof hasFire === 'boolean') {
                    setFire(hasFire);
                }

                if (typeof key === 'string') {
                    setSrc(`${BACKEND_URL}/api/v1/stream/detect/${key}`);
                }
            };

            websocket.onclose = () => {
                setLoading(true);
                setSrc('');
            };

            return () => {
                if (websocket !== null) {
                    websocket.close();
                }
            };
        },
        [id],
    );

    return (
        <Fragment>
            <Box style={style} className={classNames({alert: hasFire})}>
                <div className="options">
                    <EditIcon onClick={() => setFormModalOpen(true)} />
                    <RemoveIcon onClick={() => setDeleteModalOpen(true)} />
                </div>
                <span className="name">{name}</span>
                {loading ? <LoadingIcon /> : <img src={src} alt="Video Stream" onLoad={() => console.log('load')} />}
            </Box>
            {formModalOpen && (
                <CameraDialog
                    id={id}
                    state={formModalState}
                    defaultValues={{
                        name: name,
                        url: url,
                    }}
                    onSuccess={camera => updateCamera(index, camera)}
                />
            )}
            {deleteModalOpen && (
                <DeleteCameraModal
                    id={id}
                    name={name}
                    state={deleteModalState}
                    onDelete={() => removeCamera(index)}
                />
            )}
        </Fragment>
    );
};
