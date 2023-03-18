import css, {type SystemStyleObject} from '@styled-system/css';
import styled from '@emotion/styled';
import {type ComponentProps, type ElementType, type ForwardedRef, type ReactElement} from 'react';

export type BoxStyle = SystemStyleObject;

export interface BoxProps {
    className?: string
    style?: BoxStyle
}

export type GenericProps<
    T extends ElementType,
    P extends Record<string, any>,
    FP extends Record<string, any>
> =
    P & Omit<ComponentProps<T>, 'as' | keyof P | keyof FP> & {
        as?: ComponentProps<T> extends ComponentProps<T> & Partial<FP> ? T : never
    };

export type GenericComponent<
    P extends Record<string, any>,
    ST extends ElementType,
    D extends ST,
    FP extends Record<string, any
    // eslint-disable-next-line @typescript-eslint/ban-types -- Type is necessary
    > = {}> = <T extends ElementType & ST = D>(
        props: GenericProps<T, P, FP>,
        ref?: ForwardedRef<T>
    ) => ReactElement | null;

const shouldForwardProp = (prop: string): boolean => !['as', 'style'].includes(prop);

export const Box = styled('div', {shouldForwardProp: shouldForwardProp})(
    ({style}) => (style !== undefined ? css(style) : undefined),
) as GenericComponent<BoxProps, ElementType, 'div'>;
