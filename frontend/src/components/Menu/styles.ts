import {type BoxStyle} from '../../ui/Box';

export const style: BoxStyle = {
    backgroundColor: '#f6f6f6',
    display: 'flex',
    gap: '2px',
    marginBottom: '16px',

    '& > .control': {
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'transparent',

        '& > svg': {
            width: '40px',
            height: '40px',
        },
    },
};
