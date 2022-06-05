import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconCircleChecked(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-circle-checked ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    {...other}
                >
                    <path
                        d="M10 1c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm4.9 6.3L10 13.2s0 .1-.1.1l-.6.7c-.1.1-.2.1-.3.2-.1 0-.3 0-.4-.1l-.6-.7-.1-.1-2.8-2.4c-.2-.2-.2-.5-.1-.7l.6-.7c.2-.2.5-.2.7-.1l2.5 2.1L13.5 6c.2-.2.5-.2.7-.1l.7.6c.1.3.2.6 0 .8z"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        fill={useCurrentColor ? 'currentColor' : '#000'}
                    />
                </svg>
            )}
        </ContextLayout>
    );
}
