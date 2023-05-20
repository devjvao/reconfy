import {type FunctionComponent, useEffect, useState} from 'react';
import {Box} from '../../ui/Box';
import {style} from './styles';
import {BACKEND_URL} from '../../utils/constants';
import {Camera} from '../../components/Camera';
import {useAuth} from '../../components/AuthProvider';

interface CameraResponse {
    id: number
    url: string
    name: string
    is_active: boolean
    description?: string
}

export const HomePage: FunctionComponent = () => {
    const {token = ''} = useAuth();
    const [cameras, setCameras] = useState<CameraResponse[]>([]);

    useEffect(
        () => {
            if (token === '') {
                return;
            }

            fetch(`${BACKEND_URL}/api/v1/cameras`, {headers: {Authorization: `Bearer ${token}`}})
                .then(async response => await response.json())
                .then((data) => {
                    if ('length' in data && data.length > 0) {
                        setCameras(data);
                    }
                });
        },
        [token],
    );

    return (
        <Box style={style}>
            <div className="cameras">
                {cameras.map((camera, index) => (
                    <Camera key={camera.id + index} id={camera.id} />
                ))}
            </div>
        </Box>
    );
};
