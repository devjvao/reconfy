import {type BoxStyle} from '../Box';

export const style: BoxStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '12px',

    '& > label': {
        fontSize: '16px',
    },
};
