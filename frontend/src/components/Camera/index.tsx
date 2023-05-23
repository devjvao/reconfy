import {type FunctionComponent, useEffect, useState} from 'react';
import {BACKEND_URL} from '../../utils/constants';
import {Box} from '../../ui/Box';
import {style} from './styles';
import {ReactComponent as LoadingIcon} from '../../assets/loading.svg';

interface CameraProps {
    id: number
}

export const Camera: FunctionComponent<CameraProps> = ({id}) => {
    const [src, setSrc] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const connect = async (): Promise<void> => {
            const response = await fetch(`${BACKEND_URL}/api/v1/stream/connect/${id}`);

            setSrc(response.url);
        };

        connect().then(() => setLoading(false));
    }, []);

    return (
        <Box style={style}>
            {loading
                ? <LoadingIcon />
                : <img src={src} alt="Video Stream" />}
        </Box>
    );
};
