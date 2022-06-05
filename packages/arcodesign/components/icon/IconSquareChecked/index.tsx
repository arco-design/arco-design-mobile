import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconSquareChecked(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-square-checked ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    {...other}
                >
                    <path
                        d="M16 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1.1 5.3L10 13.2s0 .1-.1.1l-.6.7c-.1.1-.2.1-.3.2-.1 0-.3 0-.4-.1l-.6-.7-.1-.1-2.8-2.4c-.2-.2-.2-.5-.1-.7l.6-.7c.2-.2.5-.2.7-.1l2.5 2.1L13.5 6c.2-.2.5-.2.7-.1l.7.6c.1.3.2.6 0 .8z"
                        fill={useCurrentColor ? 'currentColor' : '#000'}
                    />
                </svg>
            )}
        </ContextLayout>
    );
}
