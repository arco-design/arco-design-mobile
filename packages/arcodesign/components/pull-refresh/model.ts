import type { CSSProperties, ReactNode } from 'react';

export interface PullRefreshRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
    /**
     * 主动触发刷新，执行完成动画后异步返回
     * @en Actively trigger the refresh, and return asynchronously after the animation is completed
     */
    refresh: () => Promise<void>;
    /**
     * 手动更新 IOS 容器自动高度
     * @en Manually update IOS container height
     */
    updateIOSHeight: () => void;
}

export enum PullRefreshStatus {
    Static,
    Pulling,
    Loosing,
    Loading,
    Finish,
}

export interface PullRefreshBasicProps {
    /**
     * 子元素
     * @en Children element
     */
    children: ReactNode;
    /**
     * 样式类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 自定义样式
     * @en Custom style
     */
    style?: CSSProperties;
    /**
     * 是否禁用
     * @en Whether to be disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * 加载完成后，展示加载完成的时间(ms)
     * @en After the loading is completed, the time to display the loading completion (ms)
     * @default 300
     */
    finishDelay?: number;
    /**
     * 下拉到可释放时的展示元素（type 为 ios 失效）
     * @en Displayed element when pulled down to releasable (Invalid in type iOS)
     */
    loosingText?: ReactNode;
    /**
     * 加载中的展示元素
     * @en Loading displayed element
     */
    loadingText?: ReactNode;
    /**
     * 下拉时的展示元素
     * @en Displayed element when pulling down
     */
    pullingText?: ReactNode;
    /**
     * 加载完成的展示元素
     * @en Loaded displayed element
     */
    finishText?: ReactNode;
    /**
     * 初始状态还未下拉时的展示元素
     * @en The display element in the initial state when  has not been pulled down
     * @default pullingText属性值
     * @defalt_en  pullingText value
     */
    initialText?: ReactNode;
    /**
     * 阻尼系数（type 为 ios 失效）
     * @en @en Damping coefficient (Invalid in type iOS)
     * @default 4
     */
    dampRate?: number;
    /**
     * 刷新触发事件
     * @en Callback when refreshing
     */
    onRefresh?: () => Promise<void>;
    /**
     * 惯性滑动时隐藏展示元素
     * @en Whether to hide the display element during inertial sliding
     * @default true
     */
    useHideAsNestedScroll?: boolean;
    /**
     * 释放可刷线的最小距离(px)
     * @en Minimum distance to release brushable lines (px)
     * @default loosingText 的高度
     * @default_en loosingText Height
     */
    loosingMinHeight?: number;
    /**
     * 未滚到顶部时向下滑动也允许触发下拉刷新，可能影响ios回弹动画效果
     * @en Swiping down when not scrolling to the top also allows a pull-down refresh to be triggered, which may affect the ios bounce animation effect
     * @default false
     */
    allowPullWhenNotTop?: boolean;
}
