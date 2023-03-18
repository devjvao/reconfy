import {type BoxStyle} from '../../ui/Box';

export const style: BoxStyle = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '& > span': {
        fontSize: '80px',
        color: '#FFB800',
    },

    '& > h1': {
        marginTop: '16px',
        marginBottom: '16px',
        fontSize: '28px',
        fontWeight: '500',
    },

    '& > p': {
        textAlign: 'center',
        lineHeight: 2,

        '& > a': {
            color: '#40A5FF',
            textDecoration: 'none',

            '&:hover': {
                color: '#408cff',
            },
        },
    },
};
