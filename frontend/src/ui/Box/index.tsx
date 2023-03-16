import {type CSSProperties, type FunctionComponent, type PropsWithChildren} from 'react';

export type BoxStyle = CSSProperties;

type BoxProps = JSX.IntrinsicElements['div'] & {
    style?: BoxStyle
};

export const Box: FunctionComponent<PropsWithChildren<BoxProps>> = ({children, ...props}) => (
    <div {...props}>{children}</div>
);
