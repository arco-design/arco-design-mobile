import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconArrowIn(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-arrow-in ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    fill={useCurrentColor ? 'currentColor' : '#000'}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    {...other}
                >
                    <path d="M13.9 8L8.4 2.6c-.1-.1-.1-.3 0-.5l.5-.5c.1-.1.3-.1.5 0l5.9 5.9c.3.3.3.7 0 .9l-5.9 5.9c-.1.1-.3.1-.5 0l-.5-.5c-.1-.1-.1-.3 0-.5L13.9 8z" />
                </svg>
            )}
        </ContextLayout>
    );
}
