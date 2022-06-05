import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconScan(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-scan ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    {...other}
                >
                    <path
                        fill={useCurrentColor ? 'currentColor' : '#000'}
                        d="M85.333 320V128A42.667 42.667 0 01128 85.333h192a21.333 21.333 0 0121.333 21.334v42.666A21.333 21.333 0 01320 170.667H170.667V320a21.333 21.333 0 01-21.334 21.333h-42.666A21.333 21.333 0 0185.333 320zm85.334 384v149.333H320a21.333 21.333 0 0121.333 21.334v42.666A21.333 21.333 0 01320 938.667H128A42.667 42.667 0 0185.333 896V704a21.333 21.333 0 0121.334-21.333h42.666A21.333 21.333 0 01170.667 704zm746.666-362.667h-42.666A21.333 21.333 0 01853.333 320V170.667H704a21.333 21.333 0 01-21.333-21.334v-42.666A21.333 21.333 0 01704 85.333h192A42.667 42.667 0 01938.667 128v192a21.333 21.333 0 01-21.334 21.333zM938.667 704v192A42.667 42.667 0 01896 938.667H704a21.333 21.333 0 01-21.333-21.334v-42.666A21.333 21.333 0 01704 853.333h149.333V704a21.333 21.333 0 0121.334-21.333h42.666A21.333 21.333 0 01938.667 704zm-832-234.667h810.666a21.333 21.333 0 0121.334 21.334v42.666a21.333 21.333 0 01-21.334 21.334H106.667a21.333 21.333 0 01-21.334-21.334v-42.666a21.333 21.333 0 0121.334-21.334z"
                    />
                </svg>
            )}
        </ContextLayout>
    );
}
