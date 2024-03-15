import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconDownload(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-download ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    fill={useCurrentColor ? 'currentColor' : '#000'}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    {...other}
                >
                    <path
                        d="M7.3,8.8V1.7h1.3v7.1l1.9-1.9l0.9,0.9L8,11.3L4.5,7.8l0.9-0.9L7.3,8.8z M3.3,13v-1.3H2v2.7h12v-2.7	h-1.3V13H3.3z"
                        fillRule="evenodd"
                        clipRule="evenodd"
                    />
                </svg>
            )}
        </ContextLayout>
    );
}
