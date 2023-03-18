import {forwardRef, type PropsWithChildren} from 'react';
import {Box} from '../Box';
import {style} from './styles';

interface FieldProps {
    label: string
    htmlFor?: string
}

export const Field = forwardRef<HTMLDivElement, PropsWithChildren<FieldProps>>((props, ref) => {
    const {children, label, htmlFor} = props;

    return (
        <Box ref={ref} style={style}>
            <label htmlFor={htmlFor}>{label}</label>
            {children}
        </Box>
    );
});
