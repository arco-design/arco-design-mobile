import React from 'react';

export interface SimpleBaseProps {
    /**
     * 自定义类名
     * @en Custom classname
     * @default ""
     */
    className?: string;
    /**
     * 自定义样式
     * @en Custom stylesheet
     * @default {}
     */
    style?: React.CSSProperties;
}

export interface BaseProps extends SimpleBaseProps {
    /**
     * 自定义组件内容
     * @en Custom component content
     * @default null
     */
    children?: React.ReactNode;
}

export interface BaseRef {
    /**
     * 组件外层dom元素
     * @en The outer DOM element of the component
     */
    dom: HTMLDivElement | null;
}
