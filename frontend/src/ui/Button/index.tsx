import {type ButtonHTMLAttributes, forwardRef, type PropsWithChildren} from 'react';
import classNames from 'classnames';
import {Box} from '../Box';
import {style} from './styles';

type InheritedButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'style'>;

type ButtonProps = InheritedButtonProps & {
    variant?: 'filled' | 'neutral'
};

export const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>((props, ref) => {
    const {children, className, variant = 'filled', ...rest} = props;

    return (
        <Box
            {...rest}
            as="button"
            ref={ref}
            style={style}
            className={classNames(className, variant)}
        >
            {children}
        </Box>
    );
});
