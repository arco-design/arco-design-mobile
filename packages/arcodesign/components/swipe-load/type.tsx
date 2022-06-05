import { ReactNode } from 'react';

export interface SwipeLoadProps {
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 是否禁用组件
     * @en whether to be disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * 页面元素允许划动的最大距离
     * @en The maximum distance the page element is allowed to swipe
     * @default 56
     */
    maxElementOffset?: number;
    /**
     * label移动的最大距离
     * @en The maximum distance the label moves
     * @default 40
     */
    maxLabelOffset?: number;
    /**
     * 页面允许触发的临界值(通常小于maxLabelOffset)
     * @en The threshold value at which the page is allowed to trigger (usually less than maxLabelOffset)
     * @default 30
     */
    minConfirmOffset?: number;
    /**
     * 释放触发的函数(跳转，加载等)
     * @en Callback when releasing(jump, load, etc.)
     */
    onConfirm: () => void;
    /**
     * 圆形的直径
     * @en Diameter of circle
     * @default 80
     */
    circleSize?: number;
    /**
     * 恢复动效时长(ms)
     * @en Resume animation duration (ms)
     * @default 250
     */
    labelAnimationDuration?: number;
    /**
     * 恢复动效函数
     * @en Resume animation function (ms)
     * @default "cubic-bezier(0.14, 1, 0.34, 1)"
     */
    labelAnimationFunction?: string;
    /**
     * 阻尼动效参数，使用函数x = X/(aX+b)，其中X代表当前滑动距离，传入的值代表[a, b]
     * @en Damping animation parameter, use the function x = X/(aX+b), where X represents the current sliding distance, and the incoming value represents [a, b]
     * @default [0.013312, 1.636345]
     */
    damping?: [number, number];
    /**
     * 得到滚动容器
     * @en Scroll container
     */
    getScrollContainer?: () => HTMLElement | null;
    /**
     * 标签初始文案
     * @en Label initial text
     * @default "更多"
     * @default_en "More"
     */
    normalText?: string;
    /**
     * 触发跳转文案
     * @en Text when triggering jump
     * @default "释放查看"
     * @default_en "Release to view"
     */
    activeText?: string;
    /**
     * 抛出外层touch事件，便于自定义，常用于阻止划动退出，切换tab等手势冲突
     * @en Throw the outer touchstart event, which is easy to customize. It is often used to prevent gesture conflicts such as swiping to exit, switching tabs, etc.
     */
    onTouchStart?: (e?: TouchEvent) => void;
    /**
     * 抛出外层touch事件，便于自定义，常用于阻止划动退出，切换tab等手势冲突
     * @en Throws the outer touchmove event, which is easy to customize. It is often used to prevent gesture conflicts such as swiping to exit, switching tabs, etc.
     */
    onTouchMove?: (e?: TouchEvent) => void;
    /**
     * 抛出外层touch事件，便于自定义，常用于阻止划动退出，切换tab等手势冲突
     * @en Throws the outer touchend event, which is easy to customize. It is often used to prevent gesture conflicts such as swiping to exit, switching tabs, etc.
     */
    onTouchEnd?: (e?: TouchEvent) => void;
    /**
     * 抛出外层touch事件，便于自定义，常用于阻止划动退出，切换tab等手势冲突
     * @en Throws the outer touchcancel event, which is easy to customize. It is often used to prevent gesture conflicts such as swiping to exit, switching tabs, etc.
     */
    onTouchCancel?: (e?: TouchEvent) => void;
    /**
     * 用户自定义标签样式
     * @en User-defined label style
     */
    renderLabel?: (offset?: number) => ReactNode;
    /**
     * 标签的初始位置 自定义必传
     * @en The initial position of the label, required when customized
     * @default 0
     */
    initPos?: number;
    /**
     * 子元素
     * @en Children elements
     */
    children: ReactNode;
}
export interface SwipeLoadRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
}
