import {type BoxStyle} from '../Box';

export const style: BoxStyle = {
    border: '1px solid #3382CC',
    borderRadius: '6px',
    paddingX: '16px',
    paddingY: '8px',
    backgroundColor: '#3382CC',
    color: 'white',
    fontSize: '16px',
    outline: 'none',
    cursor: 'pointer',
    transition: 'border, box-shadow 150ms ease-in-out',

    '&:focus-visible': {
        boxShadow: 'rgb(255, 255, 255) 0px 0px 0px 1px, #40A5FF 0px 0px 0px 3px',
    },
};
