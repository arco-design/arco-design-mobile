import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconLikeCircle(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-like-circle ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    {...other}
                >
                    <path
                        fill={useCurrentColor ? 'currentColor' : '#000'}
                        d="M569.067 53.184c51.733 23.552 135.018 74.987 135.018 160.213 0 32.128-14.293 74.752-42.816 127.872h161.664c127.318 0 156.566 112.384 127.318 196.587L822.933 873.003c-10.752 38.976-46.57 66.026-87.466 66.026H213.013V341.27h87.339L490.219 71.168c11.989-19.072 44.373-33.707 78.848-17.984zm-419.734 288.15v597.333H64V341.333h85.333zm398.443-203.67L344.683 426.603h-46.336v427.093h437.12c2.645 0 4.693-1.557 5.226-3.413l1.067-3.84L869.995 508.82c16.853-49.664.042-82.218-47.062-82.218H518.55l67.563-125.718c22.464-41.813 32.64-72.213 32.64-87.488 0-24.746-26.539-52.778-70.976-75.733z"
                    />
                </svg>
            )}
        </ContextLayout>
    );
}
