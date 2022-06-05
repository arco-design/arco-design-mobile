import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconEyeVisible(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-eye-visible ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    {...other}
                >
                    <path
                        fill={useCurrentColor ? 'currentColor' : '#000'}
                        d="M511.36 789.333c138.155 0 266.027-87.893 384.64-277.888-115.541-189.333-243.157-276.778-384.64-276.778-141.44 0-268.63 87.402-383.36 276.778 117.781 190.059 245.248 277.888 383.36 277.888zm-.064-640c174.357 0 324.01 108.288 449.003 324.864a714.376 714.376 0 017.317 12.95l2.24 3.989a42.667 42.667 0 01-.213 41.75 1701.554 1701.554 0 01-8.534 14.805C832.79 765.675 682.88 874.667 511.275 874.667c-170.966 0-320.022-108.224-447.19-324.694a1047.53 1047.53 0 01-7.552-13.12L54.23 532.8a42.667 42.667 0 01-.213-41.557c4.48-8.107 8.15-14.699 11.03-19.691 123.882-214.827 272.64-322.219 446.25-322.219zm.704 192a170.667 170.667 0 100 341.334 170.667 170.667 0 000-341.334zm0 85.334a85.333 85.333 0 110 170.666 85.333 85.333 0 010-170.666z"
                    />
                </svg>
            )}
        </ContextLayout>
    );
}
