import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconFile(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-file ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    fill={useCurrentColor ? 'currentColor' : '#000'}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    {...other}
                >
                    <path
                        d="M2.3,2.7c0-0.7,0.6-1.3,1.3-1.3h7.3l2.7,2.7v9.3c0,0.7-0.6,1.3-1.3,1.3H3.7c-0.7,0-1.3-0.6-1.3-1.3	V2.7z M10.4,2.7H3.7v10.7h8.7V4.6L10.4,2.7z M10.7,7.7H5.3V6.3h5.3V7.7z M8.7,10.3H5.3V9h3.3V10.3z"
                        fillRule="evenodd"
                        clipRule="evenodd"
                    />
                </svg>
            )}
        </ContextLayout>
    );
}
