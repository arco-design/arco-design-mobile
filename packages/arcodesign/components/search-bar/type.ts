import { CSSProperties, ReactNode } from 'react';
import { InputProps } from '../input/index';

export type SearchBarShape = 'square' | 'round';

export type SearchAssociationShowType = 'focus' | 'value' | 'default' | 'always';

export type SearchActionBtnShowType = 'default' | 'always' | 'none' | 'value' | 'focus';

export type SearchAssociationHighlightMode =
    | 'prefix'
    | 'contain'
    | 'none'
    | ((content: string, input: string) => ReactNode);

export type SearchAssociationItem<Data = Record<string, any>> = {
    content: string;
} & Data;

export interface SearchBarAssociationProps<Data = Record<string, any>> {
    /**
     * 前缀class名
     */
    prefixCls: string;
    /**
     * 搜索关键字
     */
    keyword: string;
    /**
     * 是否显示搜索联想框
     */
    visible: boolean;
    /**
     * 每一项搜索内容
     */
    searchAssociationItems?: SearchAssociationItem<Data>[];
    /**
     * 搜索结果高亮模式，可以是内置的两种模式，或者一个自定义的高亮函数
     * @default "none"
     */
    highlightMode?: SearchAssociationHighlightMode;
    /**
     * 要为高亮结果添加的样式，仅非自定高亮模式下生效
     */
    highlightStyle?: CSSProperties;
    /**
     * 要为高亮结果添加的class，仅非自定义高亮模式下生效
     * @default "{color: #165dff;}"
     */
    highlightClassName?: string;
    /**
     * 右侧按钮的点击回调
     */
    onActionBtnClick?: (inputValue: string) => void;
    /**
     * 每行搜索结果的点击回调
     */
    onAssociationItemClick?: (item: SearchAssociationItem<Data>, index: number) => void;
    /**
     * 搜索联想框整体被点击的回调
     */
    onAssociationClick?: React.MouseEventHandler<HTMLDivElement>;
    /**
     * 自定义渲染每行搜索结果
     */
    renderSearchAssociationItem?: (
        item: SearchAssociationItem<Data>,
        index: number,
        node: ReactNode,
    ) => ReactNode;
    /**
     * 自定义渲染搜索联想框整体内容
     */
    renderSearchAssociation?: (Content: ReactNode) => ReactNode;
}

export interface SearchBarProps<Data = Record<string, any>>
    extends Omit<SearchBarAssociationProps<Data>, 'keyword' | 'visible' | 'prefixCls'>,
        Omit<InputProps, 'label' | 'border' | 'required'> {
    /**
     * 输入框形状
     * @default "square"
     */
    shape?: SearchBarShape;
    /**
     * 搜索框头部插入的内容
     */
    prepend?: ReactNode | ((focusing: boolean) => ReactNode);
    /**
     * 搜索框尾部要插入的内容, 默认在搜索框激活态时会插入一个按钮
     * @default (focusing) => focusing ? (<span>取消</span>) : null
     */
    append?: ReactNode | ((focusing: boolean) => ReactNode);
    /**
     * 默认行为下，搜索框尾部插入的按钮文案
     * @default "取消"
     */
    actionBtnText?: string;
    /**
     * 搜索框尾部插入的按钮展现时机
     * @default "focus"
     */
    actionBtnShowType?: SearchActionBtnShowType;
    /**
     * 是否开启搜索联想框功能
     * @default false
     */
    showSearchAssociation?: boolean;
    /**
     * （受控模式）搜索联想框的可见态
     */
    searchAssociationVisible?: boolean;
    /**
     * 非受控模式下，搜索联想框的展示时机
     * @default "default"
     */
    searchAssociationShowType?: SearchAssociationShowType;
}

export interface SearchBarRef {
    /**
     * 最外层元素 DOM
     */
    dom: HTMLDivElement | null;
    /**
     * 原生输入框 DOM
     */
    input: HTMLInputElement | null;
    /**
     * 仅非受控模式下生效，手动控制搜索联想框的显隐，如果没有传入值则默认将显隐状态反转
     */
    toggleAssociation: (newVisible?: boolean) => void;
}

export interface SearchBarAssociationHighlightConfig {
    /**
     * 要为高亮结果添加的样式，仅非自定高亮模式下生效
     */
    highlightStyle?: CSSProperties;
    /**
     * 要为高亮结果添加的class，仅非自定义高亮模式下生效
     * @default "{color: #165dff;}"
     */
    highlightClassName?: string;
    /**
     * 搜索关键字
     */
    keyword: string;
    /**
     * 搜索候选项的内容
     */
    content: string;
}
