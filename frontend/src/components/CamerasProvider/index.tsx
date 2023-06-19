import {
    createContext,
    type FunctionComponent,
    type PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';
import {BACKEND_URL} from '../../utils/constants';
import {useAuth} from '../AuthProvider';

interface Camera {
    id: number
    url: string
    name: string
}

interface CamerasState {
    cameras: Camera[]
    addCamera: (camera: Camera) => void
    updateCamera: (index: number, camera: Camera) => void
    removeCamera: (index: number) => void
}

const CamerasContext = createContext<CamerasState>({
    cameras: [],
    addCamera: () => {},
    updateCamera: () => {},
    removeCamera: () => {},
});

export function useCamerasContext(): CamerasState {
    return useContext(CamerasContext);
}

export const CamerasProvider: FunctionComponent<PropsWithChildren> = ({children}) => {
    const {token = ''} = useAuth();
    const [cameras, setCameras] = useState<Camera[]>([]);

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

    const addCamera = useCallback(
        (camera: Camera) => {
            setCameras(prevState => ([...prevState, camera]));
        },
        [],
    );

    const updateCamera = useCallback(
        (index: number, camera: Camera) => {
            setCameras(prevState => {
                const clone = [...prevState];

                clone[index] = camera;

                return clone;
            });
        },
        [],
    );

    const removeCamera = useCallback(
        (index: number) => {
            setCameras(prevState => {
                const clone = [...prevState];

                clone.splice(index, 1);

                return clone;
            });
        },
        [],
    );

    const value = useMemo<CamerasState>(
        () => ({
            cameras: cameras,
            addCamera: addCamera,
            updateCamera: updateCamera,
            removeCamera: removeCamera,
        }),
        [cameras, updateCamera],
    );

    return (
        <CamerasContext.Provider value={value}>
            {children}
        </CamerasContext.Provider>
    );
};
