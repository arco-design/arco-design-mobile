import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconRefresh(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-refresh ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    {...other}
                >
                    <path
                        fill={useCurrentColor ? 'currentColor' : '#000'}
                        d="M618.667 426.667a21.333 21.333 0 01-21.334-21.334v-42.666a21.333 21.333 0 0121.334-21.334H757.12c-53.973-77.376-143.616-128-245.12-128-164.95 0-298.667 133.718-298.667 298.667S347.051 810.667 512 810.667c135.296 0 249.579-89.963 286.293-213.334h88.192C847.66 768.363 694.741 896 512 896c-212.075 0-384-171.925-384-384s171.925-384 384-384c120.64 0 228.288 55.637 298.688 142.656l-.021-121.323A21.333 21.333 0 01832 128h42.667A21.333 21.333 0 01896 149.333V384a42.667 42.667 0 01-39.467 42.56l-3.2.107H618.667z"
                    />
                </svg>
            )}
        </ContextLayout>
    );
}
