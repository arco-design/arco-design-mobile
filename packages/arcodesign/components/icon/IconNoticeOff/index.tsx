import React, { SVGAttributes, CSSProperties } from 'react';
import { ContextLayout } from '../../context-provider';

export interface IconProps extends SVGAttributes<SVGElement> {
    className?: string;
    useCurrentColor?: boolean;
    style?: CSSProperties;
}

export default function IconNoticeOff(props: IconProps) {
    const { className = '', useCurrentColor = true, style, ...other } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <svg
                    className={`${prefixCls}-icon ${prefixCls}-icon-notice-off ${className}`}
                    width="1em"
                    height="1em"
                    style={style}
                    fill={useCurrentColor ? 'currentColor' : '#000'}
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    {...other}
                >
                    <defs />
                    <path d="M118.101 57.75L962.86 902.506a21.333 21.333 0 010 30.165l-30.187 30.187a21.333 21.333 0 01-30.165 0L57.749 118.1a21.333 21.333 0 010-30.186l30.166-30.166a21.333 21.333 0 0130.186 0zm500.566 795.583A21.333 21.333 0 01640 874.667v42.666a21.333 21.333 0 01-21.333 21.334H405.333A21.333 21.333 0 01384 917.333v-42.666a21.333 21.333 0 0121.333-21.334h213.334zM190.25 341.1l69.888 69.888A280.043 280.043 0 00256 459.136V704h297.152l85.333 85.333H106.667A21.333 21.333 0 0185.333 768v-42.155a21.333 21.333 0 0121.334-21.333h.512l63.488 1.515V459.008c0-41.365 6.912-81.067 19.584-117.91zM576 64a21.333 21.333 0 0121.333 21.333v32.427c147.222 39.125 256 177.067 256 341.248v243.499L768 617.173V459.157C768 311.595 653.376 192 512 192c-48.021 0-92.97 13.803-131.37 37.803l-61.526-61.526a334.763 334.763 0 01107.563-50.517V85.333A21.333 21.333 0 01448 64h128z" />
                </svg>
            )}
        </ContextLayout>
    );
}
