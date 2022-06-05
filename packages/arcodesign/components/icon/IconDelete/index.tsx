import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconDelete(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-delete ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    {...other}
                >
                    <path
                        fill={useCurrentColor ? 'currentColor' : '#000'}
                        d="M640 85.333A42.667 42.667 0 01682.667 128l-.022 42.645 228.694.022c9.493 0 12.928.981 16.426 2.858a19.41 19.41 0 018.043 8.064c1.877 3.478 2.859 6.912 2.859 16.427v30.635c0 9.514-.982 12.949-2.859 16.426a19.392 19.392 0 01-8.064 8.064c-3.477 1.878-6.912 2.859-16.427 2.859l-57.984-.021V896a42.667 42.667 0 01-42.666 42.667H213.333A42.667 42.667 0 01170.667 896l-.022-640.021-57.962.021c-9.515 0-12.95-.981-16.427-2.859a19.392 19.392 0 01-8.064-8.064c-1.877-3.477-2.859-6.912-2.859-16.426v-30.635c0-9.515.982-12.95 2.859-16.427a19.392 19.392 0 018.064-8.064c3.477-1.877 6.912-2.858 16.427-2.858l228.629-.022.021-42.645A42.667 42.667 0 01384 85.333h256zM768 256H256v597.333h512V256zM448 384a21.333 21.333 0 0121.333 21.333V704A21.333 21.333 0 01448 725.333h-42.667A21.333 21.333 0 01384 704V405.333A21.333 21.333 0 01405.333 384H448zm170.667 0A21.333 21.333 0 01640 405.333V704a21.333 21.333 0 01-21.333 21.333H576A21.333 21.333 0 01554.667 704V405.333A21.333 21.333 0 01576 384h42.667z"
                    />
                </svg>
            )}
        </ContextLayout>
    );
}
