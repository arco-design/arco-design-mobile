import { CSSProperties, ReactNode } from 'react';

export type NotifyType = 'success' | 'info' | 'warn' | 'error';

export interface NotifyProps {
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 自定义样式
     * @en Custom style
     */
    style?: CSSProperties;
    /**
     * 需要展示的内容
     * @en Notification content
     */
    content?: ReactNode;
    /**
     * 通知类型
     * @en Notification type
     * @default "info"
     */
    type?: NotifyType;
    /**
     * 是否显示通知
     * @en Whether to show notification
     * @default false
     */
    visible?: boolean;
    /**
     * 控制通知关闭的事件
     * @en Close function
     */
    close?: () => void;
    /**
     * 通知关闭时的回调函数
     * @en Callback after closing
     */
    onClose?: () => void;
    /**
     * 将通知放入某个模块
     * @en Get mounted container
     */
    getContainer?: () => HTMLElement;
    /**
     * 动画的执行时间 (单位ms)
     * @en Animation execution time (unit: ms)
     * @default 300
     */
    transitionDuration?: number;
    /**
     * 通知自动关闭时延 (单位ms) 设置为0时不会自动关闭
     * @en The delay of notification automatic closing (unit: ms). Will not automatically close when it is set to 0
     * @default 3000
     */
    duration?: number;
}

export interface NotifyRef {
    /**
     * 最外层dom元素
     * @en The outermost element DOM
     */
    dom: HTMLElement | null;
    /**
     * 更新元素布局
     * @en Update DOM layout
     */
    updateLayout: () => void;
}
