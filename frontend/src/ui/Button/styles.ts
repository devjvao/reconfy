import {type BoxStyle} from '../Box';

export const style: BoxStyle = {
    borderRadius: '6px',
    paddingX: '16px',
    paddingY: '8px',
    fontSize: '16px',
    outline: 'none',
    cursor: 'pointer',
    transition: 'border, box-shadow 150ms ease-in-out',
    color: 'white',
    backgroundColor: '#3382CC',
    border: '1px solid #3382CC',

    '&:focus-visible': {
        boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 1px, #40A5FF 0px 0px 0px 3px',
    },

    '&.secondary': {
        backgroundColor: '#ABABAB',
        border: '1px solid #ABABAB',
    },

    '&.neutral': {
        color: 'black',
        backgroundColor: 'inherit',
        border: 'inherit',
    },

    '&:disabled': {
        opacity: '0.5',
    },
};
