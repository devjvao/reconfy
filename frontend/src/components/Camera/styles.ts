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

    '& > svg': {
        width: '32px',
        height: '32px',
        animation: `${spin} 2s linear infinite`,
    },

    '& > img': {
        width: 'auto',
        height: 'auto',
        maxWidth: '100%',
        maxHeight: '100%',
        backgroundColor: 'gray',
    },
};
