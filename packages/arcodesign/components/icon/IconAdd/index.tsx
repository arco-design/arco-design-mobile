import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconAdd(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-add ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    {...other}
                >
                    <path
                        fill={useCurrentColor ? 'currentColor' : '#000'}
                        d="M527.317 85.333c9.515 0 12.95.982 16.427 2.859a19.337 19.337 0 018.064 8.064c1.877 3.477 2.859 6.912 2.859 16.427v356.65h356.65c9.515 0 12.95.982 16.427 2.859a19.337 19.337 0 018.064 8.064c1.877 3.477 2.859 6.912 2.859 16.427v30.634c0 9.515-.982 12.95-2.859 16.427a19.392 19.392 0 01-8.064 8.064c-3.477 1.877-6.912 2.859-16.427 2.859h-356.65v356.65c0 9.515-.982 12.95-2.859 16.427a19.392 19.392 0 01-8.064 8.064c-3.477 1.877-6.912 2.859-16.427 2.859h-30.634c-9.515 0-12.95-.982-16.427-2.859a19.392 19.392 0 01-8.064-8.064c-1.877-3.477-2.859-6.912-2.859-16.427l-.021-356.65h-356.63c-9.514 0-12.949-.982-16.426-2.859a19.392 19.392 0 01-8.064-8.064c-1.877-3.477-2.859-6.912-2.859-16.427v-30.634c0-9.515.982-12.95 2.859-16.427a19.392 19.392 0 018.064-8.064c3.477-1.877 6.912-2.859 16.427-2.859l356.65-.021v-356.63c0-9.514.982-12.949 2.859-16.426a19.392 19.392 0 018.064-8.064c3.477-1.877 6.912-2.859 16.427-2.859h30.634z"
                    />
                </svg>
            )}
        </ContextLayout>
    );
}
