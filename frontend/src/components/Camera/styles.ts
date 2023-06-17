import {keyframes} from '@emotion/react';
import {type BoxStyle} from '../../ui/Box';

const spin = keyframes({
    from: {
        transform: 'rotate(360deg)',
    },
    to: {
        transform: 'rotate(0deg)',
    },
});

export const style: BoxStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '400px',
    backgroundColor: 'gray',
    position: 'relative',

    '& > svg': {
        width: '32px',
        height: '32px',
        animation: `${spin} 2s linear infinite`,
    },

    '& > img': {
        maxWidth: '100%',
        maxHeight: '100%',
        backgroundColor: 'gray',
    },

    '& > .name': {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: 'black',
        color: 'white',
        fontSize: '24px',
        padding: '2px',
    },

    '&.alert > .name': {
        backgroundColor: 'red',
    },

    '& > .options': {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: '4px',
        backgroundColor: 'rgba(0, 0, 0, .4)',
        borderEndStartRadius: '8px',
        opacity: 0,
        transition: 'opacity 0.1s ease-in-out',
        display: 'flex',
        alignItems: 'center',
        gap: '2px',

        '& > svg': {
            color: 'white',
            width: '30px',
            height: '30px',
            zIndex: 1,
            cursor: 'pointer',
        },
    },

    '&:hover > .options': {
        opacity: 1,
    },
};
