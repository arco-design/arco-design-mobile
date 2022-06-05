import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconSearch(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-search ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    {...other}
                >
                    <path
                        fill={useCurrentColor ? 'currentColor' : '#000'}
                        d="M469.333 106.667C669.632 106.667 832 269.035 832 469.333c0 75.712-23.19 146.006-62.87 204.16l144.683 144.683a21.333 21.333 0 010 30.165l-36.202 36.203a21.333 21.333 0 01-30.166 0L706.56 743.68A361.259 361.259 0 01469.333 832c-200.298 0-362.666-162.368-362.666-362.667s162.368-362.666 362.666-362.666zm0 89.6c-150.826 0-273.066 122.24-273.066 273.066S318.507 742.4 469.333 742.4 742.4 620.16 742.4 469.333 620.16 196.267 469.333 196.267z"
                    />
                </svg>
            )}
        </ContextLayout>
    );
}
