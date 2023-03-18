import {type BoxStyle} from '../Box';

export const style: BoxStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',

    '& > input': {
        border: '1px solid #CED3DB',
        borderRadius: '6px',
        transition: 'border, box-shadow 150ms ease-in-out',
        height: '32px',
        width: '100%',
        paddingX: '12px',
        paddingY: '8px',
        appearance: 'none',
        outline: 'none',
        fontSize: '14px',

        '&:focus-within': {
            borderColor: '#408CFF',
            boxShadow: '#408CFF 0px 0px 0px 1px',
        },
    },

    '&.invalid > input': {
        borderColor: '#fea0ab',

        '&:focus-within': {
            borderColor: '#fea0ab',
            boxShadow: '#fea0ab 0px 0px 0px 1px',
        },
    },

    '& > .error': {
        fontSize: '14px',
        color: '#ff4c65',
    },
};
