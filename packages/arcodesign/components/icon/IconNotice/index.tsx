import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconNotice(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-notice ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    fill={useCurrentColor ? 'currentColor' : '#000'}
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    {...other}
                >
                    <defs />
                    <path d="M618.667 853.333A21.333 21.333 0 01640 874.667v42.666a21.333 21.333 0 01-21.333 21.334H405.333A21.333 21.333 0 01384 917.333v-42.666a21.333 21.333 0 0121.333-21.334h213.334zM576 64a21.333 21.333 0 0121.333 21.333v32.427c147.222 39.125 256 177.067 256 341.248V704h64a21.333 21.333 0 0121.334 21.333V768a21.333 21.333 0 01-21.334 21.333H106.667A21.333 21.333 0 0185.333 768v-42.667A21.333 21.333 0 01106.667 704h64V459.008c0-164.181 108.8-302.123 256-341.248V85.333A21.333 21.333 0 01448 64h128zm-64 128c-141.376 0-256 119.595-256 267.136V704h512V459.136C768 311.595 653.376 192 512 192z" />
                </svg>
            )}
        </ContextLayout>
    );
}
