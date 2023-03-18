import {type BoxStyle} from '../../ui/Box';

export const style: BoxStyle = {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',

    '& > .wrapper': {
        padding: '16px',
        height: '400px',
        width: '100%',
        maxWidth: '480px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',

        '& > header': {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',

            '& > h2': {
                fontSize: '32px',
                fontWeight: '500',
            },

            '& > p': {
                fontSize: '16px',
            },
        },
    },
};
