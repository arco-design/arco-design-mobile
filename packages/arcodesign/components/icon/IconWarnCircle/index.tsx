import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconWarnCircle(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-warn-circle ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    fill={useCurrentColor ? 'currentColor' : '#000'}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    {...other}
                >
                    <path d="M12 24C5.4 24 0 18.6 0 12S5.4 0 12 0s12 5.4 12 12-5.4 12-12 12zm0-22.5C6.2 1.5 1.5 6.2 1.5 12S6.2 22.5 12 22.5 22.5 17.8 22.5 12 17.8 1.5 12 1.5z" />
                    <path d="M11.8 15.2h.3c.4 0 .7-.3.7-.7V7.2c0-.4-.3-.7-.7-.7h-.3c-.4 0-.7.3-.7.7v7.3c0 .4.3.7.7.7zM12.2 16.5h-.3c-.4 0-.7.3-.7.7v.3c0 .4.3.7.7.7h.3c.4 0 .7-.3.7-.7v-.3c0-.4-.3-.7-.7-.7z" />
                </svg>
            )}
        </ContextLayout>
    );
}
