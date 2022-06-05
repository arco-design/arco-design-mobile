import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconEyelashInvisible(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-eyelash-invisible ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    {...other}
                >
                    <path
                        fill={useCurrentColor ? 'currentColor' : '#000'}
                        d="M512 640c-28.053 0-55.488-2.219-82.112-6.443l-21.248 79.296a21.333 21.333 0 01-26.112 15.104l-41.216-11.05a21.333 21.333 0 01-15.083-26.134l20.8-77.653a473.984 473.984 0 01-97.13-45.653L182.1 635.264a21.333 21.333 0 01-30.186 0l-30.166-30.165a21.333 21.333 0 010-30.166l59.734-59.733a386.347 386.347 0 01-76.011-97.643c-1.813-3.328-4.01-7.68-6.613-13.013a21.333 21.333 0 014.074-24.32c3.904-3.947 7.083-7.04 9.515-9.237 10.453-9.536 17.835-16 24.277-22.443l1.302-1.344a19.157 19.157 0 0131.189 5.61C222.336 471.958 349.568 554.668 512 554.668c155.648 0 285.845-80.491 338.09-190.976 1.43-2.987 2.987-6.614 4.673-10.838a18.133 18.133 0 0129.632-6.08l27.413 27.414 8.085 8.085a21.333 21.333 0 014.011 24.576c-4.053 8.107-7.424 14.55-10.176 19.285a390.443 390.443 0 01-76.907 94.336l54.443 54.464a21.333 21.333 0 010 30.166l-30.165 30.165a21.333 21.333 0 01-30.166 0l-63.658-63.659a475.413 475.413 0 01-90.304 41.515l20.8 77.653a21.333 21.333 0 01-15.083 26.134l-41.216 11.05a21.333 21.333 0 01-26.112-15.104l-21.248-79.296A523.584 523.584 0 01512 640z"
                    />
                </svg>
            )}
        </ContextLayout>
    );
}
