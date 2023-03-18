import {type FunctionComponent, type PropsWithChildren} from 'react';
import {Link as BaseLink, type LinkProps as BaseLinkProps} from 'react-router-dom';
import {style} from './styles';
import {Box} from '../Box';

type LinkProps = Omit<BaseLinkProps, 'style'>;

export const Link: FunctionComponent<PropsWithChildren<LinkProps>> = props => {
    const {children, ...rest} = props;

    return (
        <Box as={BaseLink} {...rest} style={style}>
            {children}
        </Box>
    );
};
