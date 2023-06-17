import {type BoxStyle} from '../Box';

export const style: BoxStyle = {
    '& .ReactModal__Overlay': {
        zIndex: 999,
    },

    '& .ReactModal__Content': {
        position: 'fixed',
        inset: '16px',
        margin: 'auto',
        display: 'flex',
        height: 'fit-content',
        maxHeight: 'calc(100vh - 32px)',
        flexDirection: 'column',
        gap: '1rem',
        overflow: 'auto',
        borderRadius: '12px',
        backgroundColor: 'hsl(204 20% 100%)',
        padding: '1rem',
        boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        maxWidth: '500px',

        '& > .header': {
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
        },
    },
};
