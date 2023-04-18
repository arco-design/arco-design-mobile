import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconSound(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-sound ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    {...other}
                >
                    <defs />
                    <path
                        d="M512 235.67L320 383.36v257.28l192 147.69V235.67zM512 128h85.333v768H512L234.667 682.667V341.333L512 128zm280.79 674.73l-49.58-69.46c68.054-48.555 110.123-131.03 110.123-221.654 0-90.197-41.685-172.352-109.226-221.013l49.877-69.227c89.899 64.747 144.683 172.715 144.683 290.261 0 118.059-55.296 226.475-145.878 291.094zm-84.16-171.455l-51.691-67.883a64.32 64.32 0 0025.728-51.35c0-20.33-9.579-39.082-25.814-51.413l51.627-67.946A149.632 149.632 0 01768 512.043a149.632 149.632 0 01-59.37 119.253zM85.332 341.333h85.334v341.334H85.333V341.333z"
                        fill={useCurrentColor ? 'currentColor' : '#000'}
                    />
                </svg>
            )}
        </ContextLayout>
    );
}
