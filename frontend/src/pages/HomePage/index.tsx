import {type FunctionComponent} from 'react';
import {Box} from '../../ui/Box';
import {style} from './styles';
import {Camera} from '../../components/Camera';
import {useCamerasContext} from '../../components/CamerasProvider';

export const HomePage: FunctionComponent = () => {
    const {cameras} = useCamerasContext();

    return (
        <Box style={style}>
            <div className="cameras">
                {cameras.map((camera, index) => (
                    <Camera
                        key={camera.url}
                        index={index}
                        id={camera.id}
                        url={camera.url}
                        name={camera.name}
                    />
                ))}
            </div>
        </Box>
    );
};
