import React, { CSSProperties, ReactElement, ReactNode } from 'react';
import { StickyRef } from '../sticky';
import { BaseRef } from '../_helpers';

export type IndexBarIndexType = string | number;

export interface IndexBarBaseData {
    /**
     * 内容
     * @en content
     */
    content: ReactNode;
}

interface IndexBarGroupItem<Data extends IndexBarBaseData = IndexBarBaseData> {
    /**
     * IndexBarGroup对应的索引
     * @en Index corresponding to IndexBarGroup
     */
    index: IndexBarIndexType;
    /**
     * IndexBarGroup中要渲染的列表数据，如果已经传递了children这个属性，则list这个属性不会生效
     * @en The list data to be rendered in IndexBarGroup, if the children attribute has been passed, the list attribute will not take effect
     */
    list?: Data[];
}

export type IndexBarTipType = 'none' | 'sweat' | 'toast';
export type IndexBarChangeTrigger = 'swipe' | 'manual' | 'sidebar';

export interface IndexBarScrollParams {
    index: IndexBarIndexType;
    type: IndexBarChangeTrigger;
    rightNow?: boolean;
}

export interface IndexBarSideBarProps {
    tipType: IndexBarTipType;
    indexes: IndexBarIndexType[];
    prefixCls?: string;
    onTouching: (isTouching: boolean) => void;
    onClick: (index: IndexBarIndexType) => void;
    activeIndex?: IndexBarIndexType;
    renderSideBarItem?: (index: IndexBarIndexType) => ReactNode;
    renderSideBar?: (Content: ReactNode) => ReactElement;
    renderTip?: (index: IndexBarIndexType) => ReactNode;
}

export interface IndexBarGroupProps<Data extends IndexBarBaseData = IndexBarBaseData>
    extends IndexBarGroupItem<Data> {
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
    /**
     * 自定义内容的渲染，有自定义内容优先渲染自定义内容，否则渲染list传递的数据
     * @en Rendering of custom content, if there is custom content, the custom content is rendered first, otherwise the data passed by the list is rendered
     */
    children?: ReactNode;
    /**
     * 自定义提取List的key作为列表渲染的key，默认选取listItem的所在数组位置
     * @en Customize the extracted key of the List as the key for list rendering, and select the array position where the listItem is located by default
     */
    listKey?: (data: Data, listItemIndex: number) => IndexBarIndexType;
    /**
     * IndexBar.Group中某个子项被点击时的回调
     * @en Callback when a child item in IndexBar.Group is clicked
     */
    onGroupItemClick?: (index: IndexBarIndexType, itemData: Data, itemIndex: number) => void;
    /**
     * 自定义IndexBar.Group的索引标题内容渲染
     * @en Customize IndexBar.Group's index title content rendering
     */
    renderStickyItem?: (index: IndexBarIndexType) => ReactNode;
    /**
     * 自定义IndexBar.Group的子项内容渲染
     * @en Customize the rendering of sub-items of IndexBar.Group
     */
    renderGroupItem?: (index: IndexBarIndexType, itemData: Data, itemIndex: number) => ReactNode;
}

export interface IndexBarGroupRef extends BaseRef {}

export interface IndexBarProps<Data extends IndexBarBaseData = IndexBarBaseData> {
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 自定义样式
     * @en Custom stylesheet
     */
    style?: React.CSSProperties;
    /**
     * 默认要激活的索引
     * @en Index to activate by default
     */
    defaultIndex?: IndexBarIndexType;
    /**
     * 是否开启侧边栏功能
     * @en Whether to enable the sidebar function
     * @default false
     */
    disableSidebar?: boolean;
    /**
     * 是否开启索引的自动吸顶效果
     * @en Whether to enable the automatic ceiling effect of the index
     * @default true
     */
    sticky?: boolean;
    /**
     * 索引栏内容
     * @en IndexBar contents
     */
    groups?: IndexBarGroupItem<Data>[];
    /**
     * 自定义内容的渲染，内容必须是IndexBar.Group组件
     * @en Rendering of custom content, the content must be an IndexBar.Group component
     */
    children?: ReactNode;
    /**
     * 侧边栏索引提示的样式类型 - sweat 水滴形 - toast 轻提示 - none 关闭提示
     * @en Style type of sidebar index hint - sweat: teardrop - toast: light hint - none: turn off hint
     * @default "toast"
     */
    tipType?: IndexBarTipType;
    /**
     * 手动调用scrollToIndex时，滚动动画的执行时间
     * @en Execution time of scrolling animation when scrollToIndex is called manually
     * @default 0
     */
    scrollDuration?: number;
    /**
     * 手动调用scrollToIndex时，滚动的动画曲线
     * @en When scrollToIndex is called manually, the scrolling animation curve
     */
    scrollBezier?: [number, number, number, number];
    /**
     * 激活的索引改变时的回调，第一个参数是新的索引，第二个参数是改变方式：- swipe 手动滑动页面触发变化 - sidebar 侧边栏点击触发变化 - manual 手动调用scrollToIndex触发
     * @en Callback when the active index changes, the first parameter is the new index, and the second parameter is the change method: - swipe: triggers the change by manually sliding the page - sidebar: triggers the change by clicking on the sidebar - manual: triggers by manually calling scrollToIndex
     */
    onChange?: (index: IndexBarIndexType, trigger: IndexBarChangeTrigger) => void;
    /**
     * IndexBar.Group中某个子项被点击时的回调，使用JSX的写法时该回调不会生效，请在IndexBar.Group上绑定对应属性
     * @en The callback when a sub-item in IndexBar.Group is clicked, the callback will not take effect when using JSX writing, please bind the corresponding property on IndexBar.Group
     */
    onGroupItemClick?: (index: IndexBarIndexType, itemData: Data, itemIndex: number) => void;
    /**
     * 自定义侧边栏每个子项的内容渲染
     * @en Customize the content rendering of each sub-item in the sidebar
     */
    renderSideBarItem?: (index: IndexBarIndexType) => ReactNode;
    /**
     * 自定义侧边栏渲染
     * @en Custom sidebar rendering
     */
    renderSideBar?: (Content: ReactNode) => ReactElement;
    /**
     * 自定义使用侧边栏改变索引时，渲染提示的内容
     * @en Customize the content of the rendering prompt when changing the index using the sidebar
     */
    renderTip?: (index: IndexBarIndexType) => ReactNode;
    /**
     * 自定义IndexBar.Group的索引标题内容渲染，使用JSX的写法时该回调不会生效，请在IndexBar.Group上绑定对应属性
     * @en Customize the rendering of the index title content of IndexBar.Group. When using JSX writing, the callback will not take effect. Please bind the corresponding property on IndexBar.Group
     */
    renderStickyItem?: (index: IndexBarIndexType) => ReactNode;
    /**
     * 自定义IndexBar.Group的子项内容渲染，使用JSX的写法时该回调不会生效，请在IndexBar.Group上绑定对应属性
     * @en Customize the rendering of sub-items of IndexBar.Group. This callback will not take effect when using JSX. Please bind the corresponding properties on IndexBar.Group
     */
    renderGroupItem?: (index: IndexBarIndexType, itemData: Data, itemIndex: number) => ReactNode;
}

export interface IndexBarRef {
    /**
     * 最外层 DOM 元素
     * @en The outer DOM element of the component
     */
    dom: HTMLDivElement | null;
    /**
     * 手动滚动到指定的索引位置
     * @en Manually scroll to the specified index position
     */
    scrollToIndex: (index?: IndexBarIndexType, rightNow?: boolean) => void;
    /**
     * 局部滚动模式下，如果容器外部还有嵌套滚动，可主动调用此方法，让 sticky 的元素主动更新 fixed 位置
     * @en In the local scrolling mode, if there is nested scrolling outside the container, this method can be actively called to make the sticky element actively update the fixed position
     */
    recalculatePosition: (index?: IndexBarIndexType) => void;
}

export interface IndexBarContext {
    sticky: boolean;
    getScrollContainer: () => HTMLDivElement | null;
    activeIndex?: IndexBarIndexType;
    updateRef: (index: IndexBarIndexType, ref: StickyRef) => void;
}
