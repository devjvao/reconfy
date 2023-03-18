import {type BoxStyle} from '../../ui/Box';

export const style: BoxStyle = {
    borderBottom: '1px solid #EAEEF1',

    '& > nav': {
        padding: '16px',
        margin: 'auto',
        maxWidth: '1280px',
        display: 'flex',
        alignItems: 'center',

        '& > .home': {
            height: '36px',

            '& > .logo': {
                height: '100%',
                width: 'auto',
            },
        },
    },
};
