import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconWarnCircleFill(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-warn-circle-fill ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    fill={useCurrentColor ? 'currentColor' : '#000'}
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    {...other}
                >
                    <defs />
                    <path d="M0 512c0 281.6 230.4 512 512 512s512-230.4 512-512S793.6 0 512 0 0 230.4 0 512zm512 160h32c19.2 0 32 12.8 32 32v32c0 19.2-12.8 32-32 32h-32c-19.2 0-32-12.8-32-32v-32c0-19.2 12.8-32 32-32zm0-416h32c19.2 0 32 12.8 32 32v256c0 19.2-12.8 32-32 32h-32c-19.2 0-32-12.8-32-32V288c0-19.2 12.8-32 32-32z" />
                </svg>
            )}
        </ContextLayout>
    );
}
