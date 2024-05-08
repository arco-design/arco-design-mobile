// 类型定义

import { CSSProperties } from 'react';

// Type definitions
export interface SimpleBaseProps {
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;

    /**
     * 自定义样式
     * @en Custom stylesheet
     */
    style?: CSSProperties;
}

export interface BaseProps extends SimpleBaseProps {
    /**
     * 自定义组件内容
     * @en Custom component content
     */
    children?: JSX.Element | JSX.Element[];
}

export interface BaseRef {
    /**
     * 组件外层dom元素
     * @en The outer DOM element of the component
     */
    dom: HTMLDivElement | null;
}
