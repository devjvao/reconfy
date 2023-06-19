import {type RefObject, useCallback, useEffect, useState} from 'react';
import fscreen from 'fscreen';

interface FullscreenState {
    enabled: boolean
    active: boolean
    enter: () => void
    exit: () => void
}

export function useFullscreen(fullscreenRef: RefObject<HTMLElement>): FullscreenState {
    const [active, setActive] = useState(false);

    useEffect(
        () => {
            const handleChange = (): void => {
                setActive(fscreen.fullscreenElement === fullscreenRef.current);
            };

            fscreen.addEventListener('fullscreenchange', handleChange);

            return () => {
                fscreen.removeEventListener('fullscreenchange', handleChange);
            };
        },
        [],
    );

    const exitFullscreen = useCallback(
        (): void => {
            fscreen.exitFullscreen().catch(() => {
                console.debug('ignore');
            });
        },
        [],
    );

    const enter = useCallback(
        (): void => {
            if (fscreen.fullscreenElement !== undefined) {
                exitFullscreen();
            }

            if (fullscreenRef.current !== null) {
                fscreen.requestFullscreen(fullscreenRef.current);
            }
        },
        [exitFullscreen, fullscreenRef.current],
    );

    const exit = useCallback(
        (): void => {
            if (fscreen.fullscreenElement === fullscreenRef.current) {
                exitFullscreen();
            }
        },
        [exitFullscreen, fullscreenRef.current],
    );

    return {
        enabled: fscreen.fullscreenEnabled,
        active: active,
        enter: enter,
        exit: exit,
    };
}
