import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconEyeInvisible(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-eye-invisible ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    {...other}
                >
                    <path
                        fill={useCurrentColor ? 'currentColor' : '#000'}
                        d="M139.435 79.083l814.57 814.592a21.333 21.333 0 010 30.165l-30.165 30.165a21.333 21.333 0 01-30.165 0L79.083 139.435a21.333 21.333 0 010-30.187l30.165-30.165a21.333 21.333 0 0130.187 0zm31.125 242.282l55.787 55.787c-33.771 37.12-66.56 81.792-98.347 134.293 117.781 190.059 245.248 277.888 383.36 277.888 36.779 0 72.832-6.229 108.16-18.944l64.15 64.128c-54.763 26.774-112.257 40.15-172.374 40.15-180.672 0-336.875-120.854-468.63-362.582 39.915-75.306 82.56-138.88 127.894-190.72zm340.736-172.032c184.235 0 340.907 120.918 470.037 362.752-40.874 74.454-84.032 137.451-129.45 188.992l-55.787-55.808c34.005-37.098 67.307-81.6 99.904-133.824-115.541-189.333-243.157-276.778-384.64-276.778-36.907 0-72.79 5.952-107.755 18.09l-64.469-64.426a394.283 394.283 0 01172.16-38.998zM342.357 493.205l188.438 188.438a170.667 170.667 0 01-188.438-188.438zM512 341.333a170.667 170.667 0 01169.643 189.462L493.205 342.357A171.045 171.045 0 01512 341.333z"
                    />
                </svg>
            )}
        </ContextLayout>
    );
}
