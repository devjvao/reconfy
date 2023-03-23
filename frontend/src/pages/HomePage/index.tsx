import {type FunctionComponent, useEffect, useRef} from 'react';
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
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const mediaSource = useRef<MediaSource | null>(null);
    const sourceBuffer = useRef<SourceBuffer | null>(null);

    useEffect(
        () => {
            if (videoRef.current !== null) {
                mediaSource.current = new MediaSource();
                videoRef.current.src = URL.createObjectURL(mediaSource.current);

                mediaSource.current.addEventListener('sourceopen', () => {
                    if (mediaSource.current !== null) {
                        sourceBuffer.current = mediaSource.current.addSourceBuffer('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');

                        mediaSource.current.addEventListener('sourceclose', () => {
                            videoRef.current?.pause();
                        });
                    }
                });
            }

            return () => {
                if (mediaSource.current !== null && mediaSource.current.readyState !== 'closed') {
                    mediaSource.current.removeEventListener('sourceopen', () => {});
                    mediaSource.current.removeEventListener('sourceclose', () => {});
                    mediaSource.current.endOfStream();
                }
            };
        },
        [],
    );

    useEffect(
        () => {
            fetch(`${BACKEND_URL}/api/v1/stream/connect/${1}`)
                .then((response) => {
                    if (response.ok && response.body !== null) {
                        const reader = response.body.getReader();

                        const readChunk = (): void => {
                            reader.read()
                                .then(({done, value}) => {
                                    if (done) {
                                        mediaSource.current?.endOfStream();
                                    } else {
                                        if (sourceBuffer.current?.updating === false) {
                                            sourceBuffer.current?.appendBuffer(value);
                                        }

                                        readChunk();
                                    }
                                })
                                .catch((error) => {
                                    console.log(error);

                                    mediaSource.current?.endOfStream();
                                });
                        };

                        readChunk();
                    }
                })
                .catch((error) => {
                    console.log(error);

                    mediaSource.current?.endOfStream();
                });
        },
        [],
    );

    return (
        <Box style={style}>
            <div className="cameras">
                {cameras.map(camera => (
                    <div key={camera.id} className="camera">
                        <video ref={videoRef} width={300} height={300} autoPlay />
                    </div>
                ))}
            </div>
        </Box>
    );
};
