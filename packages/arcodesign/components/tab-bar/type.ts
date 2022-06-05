import React, { ReactNode } from 'react';
import { SimpleBaseProps } from '../_helpers';

export interface TabBarProps<T extends TabBarItemProps = TabBarItemProps> {
    /**
     * 自定义类名
     * @en Custom classname
     * @default ""
     */
    className?: string;
    /**
     * 自定义样式
     * @en Custom style
     * @default {}
     */
    style?: React.CSSProperties;
    /**
     * 内部标签内容
     * @en Inner Content
     * @default null
     */
    children?: React.ReactNode;
    /**
     * 选中标签的索引值
     * @en The index value of the selected label
     */
    activeIndex?: number;
    /**
     * 默认选中的索引值
     * @en The index value of the default selected label
     * @default 0
     */
    defaultActiveIndex?: number;
    /**
     * 切换标签时的回调函数
     * @en Callback when switching tabs
     */
    onChange?: (index: number) => void;
    /**
     * 数据源，传了 dataSource 则 TabBar.TabBarItem 失效
     * @en Data source, if it is passed, TabBar.TabBarItem will be invalid
     */
    dataSource?: T[];
    /**
     * 当前选中标签的样式
     * @en The style of the currently selected label
     */
    activeCustomStyle?: React.CSSProperties;
    /**
     * 是否固定在底部
     * @en Whether it is fixed at the bottom
     * @default true
     */
    fixed?: boolean;
}

export interface TabBarItemProps extends SimpleBaseProps {
    /**
     * 标题
     * @en Title
     */
    title?: ReactNode | ((active: boolean) => ReactNode);
    /**
     * 附加元素 (如徽标)
     * @en Additional elements (such as badge)
     */
    extra?: ReactNode | ((active: boolean) => ReactNode);
    /**
     * 图标
     * @en Icon
     */
    icon?: ReactNode | ((active: boolean) => ReactNode);
    /**
     * 自定义内容
     * @en Custom content
     */
    child?: ReactNode | ((active: boolean) => ReactNode);
    /**
     * 点击事件
     * @en Click event
     */
    onClick?: (e: React.MouseEvent) => void;
}

export interface TabBarRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
}
export interface TabBarItemRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
}
