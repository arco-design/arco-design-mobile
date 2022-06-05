import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconCircleDisabled(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-circle-disabled ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    viewBox="0 0 20 20"
                    fill={useCurrentColor ? 'currentColor' : '#F7F8FA'}
                    xmlns="http://www.w3.org/2000/svg"
                    {...other}
                >
                    <path
                        d="M18.375 10a8.375 8.375 0 11-16.75 0 8.375 8.375 0 0116.75 0z"
                        stroke="#E5E6EB"
                        strokeWidth="1.25"
                    />
                </svg>
            )}
        </ContextLayout>
    );
}
