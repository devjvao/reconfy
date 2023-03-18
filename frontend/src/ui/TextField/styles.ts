import {type BoxStyle} from '../Box';

export const style: BoxStyle = {
    border: '1px solid #CED3DB',
    borderRadius: '6px',
    transition: 'border, box-shadow 150ms ease-in-out',

    '&:focus-within': {
        borderColor: '#408CFF',
        boxShadow: '#408CFF 0px 0px 0px 1px',
    },

    '& > input': {
        height: '32px',
        width: '100%',
        paddingX: '12px',
        paddingY: '8px',
        borderRadius: '6px',
        borderWidth: '0px',
        appearance: 'none',
        outline: 'none',
        fontSize: '14px',
    },
};
