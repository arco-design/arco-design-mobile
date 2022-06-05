import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconShopping(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-shopping ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-1 0 11 11"
                    {...other}
                >
                    <g data-name="图层 2">
                        <path
                            d="M4.5 0a2.75 2.75 0 012.75 2.75v.75h1.43a.38.38 0 01.19 0 .47.47 0 01.1.1.38.38 0 010 .19v6.86a.38.38 0 010 .19l-.1.1a.38.38 0 01-.19 0H.32a.38.38 0 01-.19 0l-.1-.1a.38.38 0 010-.19V3.82a.38.38 0 010-.19l.1-.1a.38.38 0 01.19 0h1.43v-.78A2.75 2.75 0 014.5 0zM8 4.5h-.75v.75a2.09 2.09 0 010 .25h-1a2.11 2.11 0 000-.25V4.5h-3.5v.75a2.11 2.11 0 000 .25h-1a2.09 2.09 0 010-.25V4.5H1V10h7zM4.5 1a1.75 1.75 0 00-1.75 1.75v.75h3.5v-.75A1.75 1.75 0 004.5 1z"
                            fill={useCurrentColor ? 'currentColor' : '#000'}
                            data-name="图层 1"
                        />
                    </g>
                </svg>
            )}
        </ContextLayout>
    );
}
