import React, { CSSProperties, ReactElement, ReactNode } from 'react';
import { StickyRef } from '../sticky';

export type IndexBarIndexType = string | number;

export interface IndexBarBaseData {
    content: ReactNode;
}

interface IndexBarGroupItem<Data extends IndexBarBaseData> {
    index: IndexBarIndexType;
    list?: Data[];
}

export type IndexBarTipType = 'none' | 'sweat' | 'toast';
export type IndexBarChangeTrigger = 'swipe' | 'manual' | 'sidebar';

export interface IndexBarScrollParams {
    index: IndexBarIndexType;
    type: IndexBarChangeTrigger;
    rightNow?: boolean;
    extraScrollOffset?: number;
}

export interface IndexBarSideBarProps {
    tipType: IndexBarTipType;
    indexes: IndexBarIndexType[];
    prefixCls?: string;
    onClick: (index: IndexBarIndexType) => void;
    activeIndex?: IndexBarIndexType;
    renderSideBarItem?: (index: IndexBarIndexType) => ReactNode;
    renderSideBar?: (Content: ReactNode) => ReactElement;
    renderTip?: (index: IndexBarIndexType) => ReactNode;
}

export interface IndexBarGroupProps<Data extends IndexBarBaseData> extends IndexBarGroupItem<Data> {
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
    listKey?: (data: Data, index: number) => IndexBarIndexType;
    onClick?: (index: IndexBarIndexType, itemData: Data, itemIndex: number) => void;
    renderStickyItem?: (index: IndexBarIndexType) => ReactNode;
    renderGroupItem?: (index: IndexBarIndexType, itemData: Data, itemIndex: number) => ReactNode;
}

export interface IndexBarProps<Data extends IndexBarBaseData> {
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
    defaultIndex?: IndexBarIndexType;
    disableSidebar?: boolean;
    sticky?: boolean;
    groups?: IndexBarGroupItem<Data>[];
    children?: ReactNode;
    tipType?: IndexBarTipType;
    scrollDuration?: number;
    scrollBezier?: [number, number, number, number];
    scrollStopPropagation?: boolean;
    onChange?: (index: IndexBarIndexType, trigger: IndexBarChangeTrigger) => void;
    onGroupItemClick?: (index: IndexBarIndexType, itemData: Data, itemIndex: number) => void;
    renderSideBarItem?: (index: IndexBarIndexType) => ReactNode;
    renderSideBar?: (Content: ReactNode) => ReactElement;
    renderTip?: (index: IndexBarIndexType) => ReactNode;
    renderStickyItem?: (index: IndexBarIndexType) => ReactNode;
    renderGroupItem?: (index: IndexBarIndexType, itemData: Data, itemIndex: number) => ReactNode;
}

export interface IndexBarRef {
    /**
     * 最外层 DOM 元素
     * @en The outer DOM element of the component
     */
    dom: HTMLDivElement | null;
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
