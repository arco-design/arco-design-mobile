import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconShop(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-shop ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-0.19 0 10.5 10.5"
                    {...other}
                >
                    <g data-name="图层 2">
                        <path
                            d="M9.09 0a.52.52 0 01.51.43l.48 2.5a2.15 2.15 0 01-.56 1.91v5a.65.65 0 01-.65.66H1.25a.65.65 0 01-.65-.66v-5A2.15 2.15 0 010 2.93L.52.43A.52.52 0 011 0zM6.46 5.05a2.36 2.36 0 01-2.8 0 2.63 2.63 0 01-1.49.46 1.81 1.81 0 01-.4 0h-.12v4h6.82v-4h-.12a1.81 1.81 0 01-.4 0 2.63 2.63 0 01-1.49-.46zm2.19-4H1.47l-.4 2.08A1.11 1.11 0 002 4.44a.75.75 0 00.21 0 1.53 1.53 0 00.89-.27l.62-.43.6.45a1.34 1.34 0 001.56 0l.6-.45.62.43a1.53 1.53 0 00.9.29.75.75 0 00.21 0 1.11 1.11 0 00.89-1.31zM7.42 2.1a.27.27 0 01.27.26v.53a.27.27 0 01-.27.26H2.7a.26.26 0 01-.26-.26v-.53a.26.26 0 01.26-.26z"
                            fill={useCurrentColor ? 'currentColor' : '#000'}
                            data-name="图层 1"
                        />
                    </g>
                </svg>
            )}
        </ContextLayout>
    );
}
