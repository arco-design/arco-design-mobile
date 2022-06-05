import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconSad(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-sad ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    fill={useCurrentColor ? 'currentColor' : '#000'}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 28 28"
                    {...other}
                >
                    <path d="M14 1.2c7.1 0 12.8 5.7 12.8 12.8S21.1 26.8 14 26.8 1.2 21.1 1.2 14 6.9 1.2 14 1.2zm0 2.3C8.2 3.5 3.5 8.2 3.5 14S8.2 24.5 14 24.5 24.5 19.8 24.5 14 19.8 3.5 14 3.5zm4.7 6.4v3.5h-2.3V9.9h2.3zm-7 0v3.5H9.3V9.9h2.4zm-2.4 7.6h9.3v2.3H9.3v-2.3z" />
                </svg>
            )}
        </ContextLayout>
    );
}
