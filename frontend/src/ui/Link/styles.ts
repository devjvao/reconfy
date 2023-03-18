import {type BoxStyle} from '../Box';

export const style: BoxStyle = {
    color: '#40A5FF',
    textDecoration: 'none',
    outline: 'none',
    transition: 'border, box-shadow 150ms ease-in-out',

    '&:hover': {
        color: '#408CFF',
    },

    '&:focus-visible': {
        boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 1px, #40A5FF 0px 0px 0px 3px',
    },
};
