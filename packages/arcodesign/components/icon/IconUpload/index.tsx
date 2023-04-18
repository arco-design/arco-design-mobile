import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconUpload(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-upload ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    fill={useCurrentColor ? 'currentColor' : '#000'}
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    {...other}
                >
                    <defs />
                    <path d="M192 768c12.8 0 19.2 6.4 19.2 19.2v64h595.2v-64c0-12.8 6.4-19.2 19.2-19.2h44.8c12.8 0 19.2 6.4 19.2 19.2V896c0 25.6-19.2 44.8-44.8 44.8h-672c-25.6 0-44.8-19.2-44.8-44.8V787.2c0-12.8 6.4-19.2 19.2-19.2H192zM531.2 89.6l211.2 211.2c6.4 6.4 6.4 19.2 0 32l-32 32c-6.4 6.4-19.2 6.4-32 0l-128-128v473.6c0 12.8-6.4 19.2-19.2 19.2h-38.4c-12.8 0-19.2-6.4-19.2-19.2V249.6L352 364.8c-6.4 6.4-25.6 6.4-32 0l-32-32c-6.4-6.4-6.4-19.2 0-32L499.2 89.6c12.8-6.4 25.6-6.4 32 0z" />
                </svg>
            )}
        </ContextLayout>
    );
}
