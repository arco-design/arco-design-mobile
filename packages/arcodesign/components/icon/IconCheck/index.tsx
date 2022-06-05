import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconCheck(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-check ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    viewBox="0 0 20 20"
                    fill={useCurrentColor ? 'currentColor' : '#000'}
                    xmlns="http://www.w3.org/2000/svg"
                    {...other}
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M16.702 4.47a.5.5 0 00-.705.06L8.33 13.596 3.82 9.724a.5.5 0 00-.705.054l-.652.758a.5.5 0 00.054.706L7.361 15.4a.5.5 0 00.054.053l.526.445.22.188a.5.5 0 00.722-.047l8.641-10.218a.5.5 0 00-.059-.705l-.763-.645z"
                        fill={useCurrentColor ? 'currentColor' : '#000'}
                    />
                </svg>
            )}
        </ContextLayout>
    );
}
