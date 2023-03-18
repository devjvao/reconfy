import {forwardRef, type InputHTMLAttributes} from 'react';
import {Box} from '../Box';
import {Field} from '../Field';
import {style} from './styles';
import classNames from 'classnames';

type InheritedInputProps = InputHTMLAttributes<HTMLInputElement>;

type TextFieldProps = InheritedInputProps & {
    label: string
    error?: string
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
    const {label, id, error, ...rest} = props;

    return (
        <Field label={label} htmlFor={id}>
            <Box style={style} className={classNames({invalid: error !== undefined})}>
                <input {...rest} id={id} ref={ref} />
                {error !== undefined && (
                    <span className="error">
                        {error}
                    </span>
                )}
            </Box>
        </Field>
    );
});
