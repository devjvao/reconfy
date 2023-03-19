import {type BoxStyle} from '../../ui/Box';

export const style: BoxStyle = {
    height: '100%',

    '& > .cameras': {
        margin: 'auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px',

        '& > .camera': {
            width: '100%',
            height: '300px',
            backgroundColor: 'gray',
        },
    },
};
