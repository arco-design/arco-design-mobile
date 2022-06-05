import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconArrowBack(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-arrow-back ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    fill={useCurrentColor ? 'currentColor' : '#000'}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    {...other}
                >
                    <path d="M2.1 8l5.4 5.4c.1.1.1.3 0 .5l-.5.5c-.1.1-.3.1-.5 0L.7 8.5c-.3-.3-.3-.7 0-.9l5.9-5.9c.1-.1.3-.1.5 0l.5.5c.1.1.1.3 0 .5L2.1 8z" />
                </svg>
            )}
        </ContextLayout>
    );
}
