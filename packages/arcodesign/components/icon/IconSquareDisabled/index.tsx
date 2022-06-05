import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconSquareDisabled(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-square-disabled ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    viewBox="0 0 20 20"
                    fill={useCurrentColor ? 'currentColor' : '#F7F8FA'}
                    {...other}
                >
                    <path
                        stroke="#E5E6EB"
                        d="M15.6 2.5H4.4c-1 0-1.9.8-1.9 1.9v11.2c0 1 .8 1.9 1.9 1.9h11.2c1 0 1.9-.8 1.9-1.9V4.4c0-1.1-.8-1.9-1.9-1.9z"
                    />
                </svg>
            )}
        </ContextLayout>
    );
}
