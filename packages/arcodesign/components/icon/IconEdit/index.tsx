import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconEdit(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-edit ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    {...other}
                >
                    <path
                        fill={useCurrentColor ? 'currentColor' : '#000'}
                        d="M917.333 874.859a21.333 21.333 0 0121.334 21.333v42.667a21.333 21.333 0 01-21.334 21.333H106.667a21.333 21.333 0 01-21.334-21.333v-42.667a21.333 21.333 0 0121.334-21.333h810.666zM628.245 97.835l.086.085 146.517 147.285a42.667 42.667 0 01-.085 60.267l-25.131 25.11h.021L290.731 789.546H128a42.667 42.667 0 01-42.56-39.488l-.107-3.222V584.128L537.92 128l-.107-.107 30.08-30.08a42.667 42.667 0 0160.352 0zM464.277 322.133L172.053 620.117v.107l82.56 82.56h.128l294.934-295.232-85.398-85.397zm132.438-135.018l-72.662 74.09 85.952 85.952 73.11-73.194-86.4-86.848z"
                    />
                </svg>
            )}
        </ContextLayout>
    );
}
