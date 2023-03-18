import {type ButtonHTMLAttributes, forwardRef, type PropsWithChildren} from 'react';
import {Box} from '../Box';
import {style} from './styles';

type InheritedButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'>;

type ButtonProps = InheritedButtonProps;

export const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>((props, ref) => {
    const {children, ...rest} = props;

    return (
        <Box as="button" {...rest} ref={ref} style={style}>
            {children}
        </Box>
    );
});
