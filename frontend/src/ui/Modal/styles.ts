import {type BoxStyle} from '../Box';

export const style: BoxStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '& > h2': {
        fontSize: '24px',
        fontWeight: '500',
    },

    '& > .close': {
        width: '24px',
        height: '24px',
        cursor: 'pointer',

        '& > svg': {
            width: 'inherit',
            height: 'inherit',
        },
    },
};
