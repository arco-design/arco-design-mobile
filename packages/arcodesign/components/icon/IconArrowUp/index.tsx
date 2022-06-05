import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconArrowUp(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-arrow-up ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    {...other}
                >
                    <path
                        fill={useCurrentColor ? 'currentColor' : '#000'}
                        d="M512 329.472L165.056 676.416a21.333 21.333 0 01-30.187 0l-30.165-30.165a21.333 21.333 0 010-30.166l377.13-377.152a42.667 42.667 0 0160.331 0l377.131 377.131a21.333 21.333 0 010 30.165l-30.165 30.166a21.333 21.333 0 01-30.187 0L512 329.472z"
                    />
                </svg>
            )}
        </ContextLayout>
    );
}
