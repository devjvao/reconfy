import {type BoxStyle} from '../../ui/Box';

export const style: BoxStyle = {
    borderBottom: '1px solid #EAEEF1',

    '& > nav': {
        padding: '16px',
        margin: 'auto',
        maxWidth: '1280px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',

        '& > .home': {
            height: '36px',

            '& > .logo': {
                height: '100%',
                width: 'auto',
            },
        },

        '& > .menu-item': {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#1c1b1b',

            '&:hover': {
                color: '#424242',
            },
        },
    },
};
