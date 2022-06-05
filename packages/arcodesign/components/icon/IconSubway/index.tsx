import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconSubway(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-subway ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-0.98 0 10.96 10.96"
                    {...other}
                >
                    <g data-name="图层 2">
                        <path
                            d="M.82 10.9a.24.24 0 01-.35 0l-.31-.39a.24.24 0 010-.35l2.1-1.66H.5A.5.5 0 010 8V.5A.5.5 0 01.5 0h8a.5.5 0 01.5.5V8a.5.5 0 01-.5.5H6.82l2.06 1.62a.26.26 0 010 .35l-.31.39a.24.24 0 01-.35 0L5.2 8.5H3.88zM8 5.5H1v2h7zM3 6v1H2V6zm4 0v1H6V6zm1-5H1v3.5h7z"
                            fill={useCurrentColor ? 'currentColor' : '#000'}
                            data-name="图层 1"
                        />
                    </g>
                </svg>
            )}
        </ContextLayout>
    );
}
