import { CSSProperties, ReactNode } from 'react';
import { InputProps } from '../input/index';

export type SearchBarShape = 'square' | 'round';

export type SearchAssociationShowType = 'focus' | 'value' | 'default' | 'always';

export type SearchActionBtnShowType = 'default' | 'always' | 'none' | 'value' | 'focus';

export type SearchAssociationHighlightMode =
    | 'prefix'
    | 'contain'
    | 'none'
    | ((content: string, keyword: string, defaultHighlightClassName: string) => ReactNode);

export interface SearchAssociationBaseItem {
    /**
     * 基础内容
     * @en basic content
     */
    content: string;
}

export type SearchAssociationItem<ExtraData = Record<string, any>> = SearchAssociationBaseItem &
    ExtraData;

export interface SearchBarAssociationProps<Data = Record<string, any>> {
    /**
     * 前缀class名
     * @en prefix class
     */
    prefixCls: string;
    /**
     * 搜索关键字
     * @en search value
     */
    keyword: string;
    /**
     * 是否显示搜索联想框
     * @en Whether to show the search prediction box
     */
    visible: boolean;
    /**
     * 每一项搜索内容
     * @en every search
     */
    associationItems?: SearchAssociationItem<Data>[];
    /**
     * 搜索结果高亮模式，可以是内置的两种模式，或者一个自定义的高亮函数(接受选项内容content、搜索关键字keyword、默认的高亮class，返回一个ReactNode) - prefix 高亮最长前缀匹配字符串 - contain 高亮所有搜索关键字 - none 关闭高亮
     * @en Search result highlighting mode, which can be two built-in modes, or a custom highlighting function(Accept option content content, search keyword keyword, default highlight class, return a ReactNode) - "prefix" to highlight the longest prefix matching string - "contain" to highlight all search keywords - "none" to turn off highlighting
     * @default "none"
     */
    highlightMode?: SearchAssociationHighlightMode;
    /**
     * 要为高亮结果添加的样式，仅非自定高亮模式下生效
     * @en The style to be added to the highlighted result, only available in non-custom highlight mode
     */
    highlightStyle?: CSSProperties;
    /**
     * 要为高亮结果添加的class，仅非自定义高亮模式下生效
     * @en The class to be added to the highlighting result, only valid in non-custom highlighting mode
     * @default "{color: #165dff;}"
     */
    highlightClassName?: string;
    /**
     * 右侧按钮的点击回调
     * @en Right button click callback
     */
    onActionBtnClick?: (inputValue: string) => void;
    /**
     * 每行搜索结果的点击回调
     * @en Click callback for each row of search results
     */
    onAssociationItemClick?: (item: SearchAssociationItem<Data>, index: number) => void;
    /**
     * 搜索联想框整体被点击的回调
     * @en The callback for the overall click of the search association box
     */
    onAssociationClick?: React.MouseEventHandler<HTMLDivElement>;
    /**
     * 自定义渲染每行搜索结果
     * @en Custom rendering of each row of search results
     */
    renderAssociationItem?: (
        item: SearchAssociationItem<Data>,
        index: number,
        node: ReactNode,
    ) => ReactNode;
    /**
     * 自定义渲染搜索联想框整体内容
     * @en Customize the rendering of the overall content of the search association box
     */
    renderAssociation?: (Content: ReactNode) => ReactNode;
}

export interface SearchBarProps<Data = Record<string, any>>
    extends Omit<SearchBarAssociationProps<Data>, 'keyword' | 'visible' | 'prefixCls'>,
        Omit<InputProps, 'label' | 'border' | 'required'> {
    /**
     * 输入框形状
     * @en input box shape
     * @default "square"
     */
    shape?: SearchBarShape;
    /**
     * 搜索框头部插入的内容
     * @en Content inserted in the header of the search box
     */
    prepend?: ReactNode | ((focusing: boolean, value: string) => ReactNode);
    /**
     * 搜索框尾部要插入的内容, 默认在搜索框激活态时会插入一个按钮
     * @en The content to be inserted at the end of the search box, a button will be inserted by default when the search box is activated
     * @default (focusing) => focusing ? (<span>取消</span>) : null
     */
    append?: ReactNode | ((focusing: boolean, value: string) => ReactNode);
    /**
     * 默认行为下，搜索框尾部插入的按钮文案
     * @en By default, the button text inserted at the end of the search box
     * @default "取消"
     */
    actionBtnText?: string;
    /**
     * 搜索框尾部插入的按钮展现时机 - focus 仅聚焦时 - value 搜索词不为空 - default 搜索框被聚焦或者搜索词不为空 - always 一直展示 - none 不展示
     * @en Display timing of the button inserted at the end of the search box - "focus" only when focused - "value" search term is not empty - "default" search bar is focused or search term is not empty - "always" always displayed - "none" do not show
     * @default "focus"
     */
    actionBtnShowType?: SearchActionBtnShowType;
    /**
     * 是否开启搜索联想框功能
     * @en Whether to enable the search association box function
     * @default false
     */
    enableAssociation?: boolean;
    /**
     * （受控模式）搜索联想框的可见态
     * @en (Controlled mode) Visible state of search association box
     */
    associationVisible?: boolean;
    /**
     * 非受控模式下，搜索联想框的展示时机 - focus 仅聚焦时 - value 搜索词不为空 - default 搜索框被聚焦或者搜索词不为空 - always 一直展示
     * @en In uncontrolled mode, the display timing of the search association box - "focus" only when focused - "value" search term is not empty - "default" search bar is focused or search term is not empty - "always" always displayed
     * @default "default"
     */
    associationShowType?: SearchAssociationShowType;
}

export interface SearchBarRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
    /**
     * 原生输入框 DOM
     * @en Native input box DOM
     */
    input: HTMLInputElement | null;
    /**
     * 仅非受控模式下生效，手动控制搜索联想框的显隐，如果没有传入值则默认将显隐状态反转
     * @en It only takes effect in uncontrolled mode. Manually control the display and hide of the search association box. If there is no incoming value, the display and hidden state will be reversed by default.
     */
    toggleAssociation: (newVisible?: boolean) => void;
}

export interface SearchBarAssociationHighlightConfig {
    /**
     * 要为高亮结果添加的样式，仅非自定高亮模式下生效
     * @en The style to be added to the highlighted result, only available in non-custom highlight mode
     */
    highlightStyle?: CSSProperties;
    /**
     * 要为高亮结果添加的class，仅非自定义高亮模式下生效
     * @en The class to be added to the highlighting result, only valid in non-custom highlighting mode
     * @default "{color: #165dff;}"
     */
    highlightClassName?: string;
    /**
     * 搜索关键字
     * @en search for the keyword
     */
    keyword: string;
    /**
     * 搜索候选项的内容
     * @en Contents of search candidates
     */
    content: string;
}
