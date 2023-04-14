import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconKeyboardDelete(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-keyboard-delete ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 26 26"
                    {...other}
                >
                    <path
                        d="M23.1,21.4H8.3c-0.6,0-1.2-0.3-1.6-0.8l-4.9-6.4c-0.5-0.7-0.5-1.7,0-2.4l4.9-6.4c0.4-0.5,1-0.8,1.6-0.8h14.8	c1.1,0,2,0.9,2,2v12.7C25.1,20.5,24.2,21.4,23.1,21.4z M8.3,6.6L3.4,13l4.9,6.4h14.8V6.6H8.3z"
                        fill={useCurrentColor ? 'currentColor' : '#1d2129'}
                    />
                    <path
                        d="M11.3,9.4c0.4-0.4,1-0.4,1.3,0l2.5,2.5l2.5-2.5c0.4-0.4,1-0.4,1.3,0c0.4,0.4,0.4,1,0,1.3l-2.5,2.5l2.3,2.3	c0.4,0.4,0.4,1,0,1.3c-0.4,0.4-1,0.4-1.3,0l-2.3-2.3L12.7,17c-0.4,0.4-1,0.4-1.3,0c-0.4-0.4-0.4-1,0-1.3l2.4-2.4l-2.5-2.5	C10.9,10.4,10.9,9.8,11.3,9.4z"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        fill={useCurrentColor ? 'currentColor' : '#1d2129'}
                    />
                </svg>
            )}
        </ContextLayout>
    );
}
