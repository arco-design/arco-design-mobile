import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconClear(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-clear ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 18 18"
                    {...other}
                >
                    <path
                        d="M9 1.1C4.7 1.1 1.1 4.7 1.1 9s3.5 7.9 7.9 7.9 7.9-3.5 7.9-7.9S13.3 1.1 9 1.1zm3.4 10.2c.2.2.2.5 0 .7l-.5.5c-.2.2-.5.2-.7 0L9 10.3l-2.2 2.2c-.2.2-.5.2-.7 0l-.6-.5c-.2-.2-.2-.5 0-.7l2.2-2.2-2.2-2.3c-.2-.2-.2-.5 0-.7l.5-.5c.2-.2.5-.2.7 0l2.2 2.2 2.2-2.2c.2-.2.5-.2.7 0l.5.5c.2.2.2.5 0 .7L10.1 9l2.3 2.3z"
                        fill={useCurrentColor ? 'currentColor' : '#000'}
                    />
                </svg>
            )}
        </ContextLayout>
    );
}
