import {type BoxStyle} from '../../ui/Box';

export const style: BoxStyle = {
    height: '100%',

    '& > .cameras': {
        margin: 'auto',
        display: 'grid',
        gap: '16px',
        gridTemplateColumns: 'repeat(3, 1fr)',

        '@media (max-width: 1024px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },

        '@media (max-width: 480px)': {
            gridTemplateColumns: '1fr',
        },
    },
};
