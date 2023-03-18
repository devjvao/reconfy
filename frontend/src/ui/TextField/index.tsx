import {forwardRef, type InputHTMLAttributes} from 'react';
import {Box} from '../Box';
import {Field} from '../Field';
import {style} from './styles';

type InheritedInputProps = InputHTMLAttributes<HTMLInputElement>;

type TextFieldProps = InheritedInputProps & {
    label: string
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
    const {label, id, ...rest} = props;

    return (
        <Field label={label} htmlFor={id}>
            <Box style={style}>
                <input {...rest} id={id} ref={ref} />
            </Box>
        </Field>
    );
});
