import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconMinus(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-minus ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    fill={useCurrentColor ? 'currentColor' : '#000'}
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    {...other}
                >
                    <defs />
                    <path d="M115.2 467.2h819.2c6.4 0 6.4 6.4 6.4 6.4V544c0 6.4-6.4 6.4-6.4 6.4H96c-6.4 0-6.4-6.4-6.4-6.4v-64c0-6.4 6.4-6.4 6.4-6.4 6.4-6.4 6.4-6.4 19.2-6.4z" />
                </svg>
            )}
        </ContextLayout>
    );
}
