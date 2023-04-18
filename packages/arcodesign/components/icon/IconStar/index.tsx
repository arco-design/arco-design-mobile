import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconStar(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-star ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    {...other}
                >
                    <path
                        fill={useCurrentColor ? 'currentColor' : '#000'}
                        d="M268.437 941.29a35.563 35.563 0 01-50.773-35.733l25.899-248.49a35.563 35.563 0 00-8.896-27.456L66.176 442.155a35.563 35.563 0 0119.008-58.539l246.507-52.608a35.563 35.563 0 0023.36-16.96L481.237 95.872a35.563 35.563 0 0161.568 0l126.187 218.176a35.525 35.525 0 0023.36 16.96l246.507 52.608a35.563 35.563 0 0119.008 58.539L789.376 629.61a35.533 35.533 0 00-8.917 27.456l25.898 248.49a35.563 35.563 0 01-50.773 35.734l-228.16-109.739a35.563 35.563 0 00-30.805 0l-228.16 109.739zm191.147-186.645a120.896 120.896 0 01104.81 0l147.84 71.104-16.682-159.829a120.896 120.896 0 0130.336-93.355L836.864 449.11l-162.347-34.645a120.896 120.896 0 01-79.402-57.685L512 213.099l-83.115 143.68a120.896 120.896 0 01-79.402 57.685l-162.347 34.645 110.976 123.456a120.896 120.896 0 0130.336 93.355l-16.683 159.83 147.84-71.105z"
                    />
                </svg>
            )}
        </ContextLayout>
    );
}
