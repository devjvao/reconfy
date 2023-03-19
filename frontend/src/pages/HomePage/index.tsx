import {type FunctionComponent} from 'react';
import {Box} from '../../ui/Box';
import {style} from './styles';
import {BACKEND_URL} from '../../utils/constants';

interface Camera {
    id: number
    url: string
    name: string
    is_active: boolean
    description?: string
}

const cameras: Camera[] = [
    {
        id: 1,
        url: 'rtsp://192.168.1.3:5540/ch0',
        name: 'Camera 1',
        is_active: true,
    },
];

export const HomePage: FunctionComponent = () => {
    return (
        <Box style={style}>
            <div className="cameras">
                {cameras.map(camera => (
                    <div key={camera.id} className="camera">
                        <iframe width={300} height={300} src={`${BACKEND_URL}/api/v1/stream/connect/${camera.id}`} />
                    </div>
                ))}
            </div>
        </Box>
    );
};
