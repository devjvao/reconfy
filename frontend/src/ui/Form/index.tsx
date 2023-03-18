import {
    type FormEvent,
    type FormEventHandler,
    type FormHTMLAttributes,
    type FunctionComponent,
    type PropsWithChildren,
    useCallback,
} from 'react';
import {Box} from '../Box';
import {style} from './styles';

export type FormProps = Pick<FormHTMLAttributes<HTMLFormElement>, 'id'> & {
    onSubmit?: FormEventHandler<HTMLFormElement>
};

export const Form: FunctionComponent<PropsWithChildren<FormProps>> = props => {
    const {children, onSubmit, ...rest} = props;

    const handleSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            onSubmit?.(event);

            event.preventDefault();

            event.stopPropagation();
        },
        [onSubmit],
    );

    return (
        <Box
            as="form"
            style={style}
            noValidate
            {...rest}
            onSubmit={handleSubmit}
        >
            {children}
        </Box>
    );
};
