import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconArrowDown(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-arrow-down ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    {...other}
                >
                    <path
                        fill={useCurrentColor ? 'currentColor' : '#000'}
                        d="M512 676.864l346.944-346.965a21.333 21.333 0 0130.187 0l30.165 30.186a21.333 21.333 0 010 30.166L542.166 767.36a42.667 42.667 0 01-60.331 0L104.704 390.25a21.333 21.333 0 010-30.165l30.165-30.186a21.333 21.333 0 0130.187 0L512 676.864z"
                    />
                </svg>
            )}
        </ContextLayout>
    );
}
