import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconSmileFill(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-smile-fill ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    fill={useCurrentColor ? 'currentColor' : '#000'}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 28 28"
                    {...other}
                >
                    <path d="M14 1.2c7.1 0 12.8 5.7 12.8 12.8S21.1 26.8 14 26.8 1.2 21.1 1.2 14 6.9 1.2 14 1.2zm6 15.1h-2.6c-.7 1.1-2 1.7-3.4 1.7s-2.6-.7-3.4-1.7H8c.9 2.4 3.3 4.1 6 4.1s5-1.7 6-4.1zm-1.3-6.4h-2.3v3.5h2.3V9.9zm-7 0H9.3v3.5h2.3V9.9z" />
                </svg>
            )}
        </ContextLayout>
    );
}
