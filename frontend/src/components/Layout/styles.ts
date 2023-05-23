import {type BoxStyle} from '../../ui/Box';

export const style: BoxStyle = {
    height: '100%',
    width: '100%',

    '& > main': {
        padding: '16px',
        margin: 'auto',
        maxWidth: '1280px',
        minHeight: 'calc(100% - 70px)',

        '&::backdrop': {
            background: 'unset',
        },
    },
};
