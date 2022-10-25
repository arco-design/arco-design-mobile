import { CSSProperties, ReactNode } from 'react';

export type OptionValueType = number | string;

export interface OptionsItem {
    /**
     * 选项名称
     * @en option label
     *  */
    label: ReactNode;
    /**
     * 选项标识
     * @en option value
     * */
    value: OptionValueType;
    /**
     * 选项是否可用，默认false表示可用
     * @en Whether the option is available, the default false means available
     *  */
    disabled?: boolean;
}
/**
 * 暴露给DropdownMenu组件的使用方
 * @en Expose to the consumer of the DropdownMenu component
 */
export interface DropdownCommonProps {
    /**
     * 自定义类名
     * @en Custom classname
     * */
    className?: string;
    /**
     * 自定义样式
     * @en Custom stylesheet
     */
    style?: CSSProperties;
    /**
     * 下拉框底部元素
     * @en Dropdown bottom element
     * */
    extraNode?: ReactNode;
    /**
     * 定位下拉框出现的位置
     * @en Position where the dropDown box appears
     * */
    top?: number;
    /**
     * 向上展开时下拉框出现的位置
     * @en Position Where the drop-down box appears when expanding upwards
     * */
    bottom?: number;
    /**
     * 展开方向
     * @en Expand direction
     * @default "down"
     */
    direction?: 'up' | 'down';
    /**
     * 受控模式，下拉框高度
     * @en Dropdown box height in controlled mode
     * */
    height?: number;
    /**
     * 下拉框最大的高度
     * @en The maximum height of the dropdown
     * @default 500
     */
    maxHeight?: number;
    /**
     * 点击其他区域是否取消选择
     * @en Click on other areas to cancel the selection
     * @default true
     */
    clickOtherToClose?: boolean;
    /**
     * 是否在触发touchstart时就取消选择，否则在click之后再取消选择
     * @en Whether to cancel the selection when touchstart is triggered, otherwise cancel the selection after the click
     * @default true
     */
    touchToClose?: boolean;
    /**
     * 展开收起动画的时间
     * @en Expand and collapse animation duration
     * @default 300
     */
    dropdownAnimationTimeout?: number;
    /**
     * 展开收起动画曲线函数
     * @en Expand and collapse animation curve function
     * @default "cubic-bezier(0.32, 0.96, 0.6, 1)"
     */
    dropdownAnimationFunction?: string;
    /**
     * 是否展示遮罩层
     * @en Whether to show the mask layer
     * @default true
     */
    showMask?: boolean;
    /**
     * 蒙层动画时长
     * @en Mask animation duration
     * @default 500
     */
    maskAnimationTimeout?: number;
    /**
     * 蒙层动画函数
     * @en Mask animation function
     * @default "cubic-bezier(0.32, 0.96, 0.6, 1)"
     */
    maskAnimationFunction?: string;
    /**
     * 使用多列标签样式，传 true 为 4 列，传数字为指定 n 列
     * @en Use multi-column label style, input true, it's 4 columns, and input number n, it will be n columns
     * @default false
     */
    useColumn?: boolean | number;
    /**
     * 选项附带图标
     * @en Icon in each option
     */
    optionIcon?: ReactNode;
    /**
     * 是否在打开下拉框时再加载内容
     * @en Whether to reload the content when the dropdown box is opened
     * @default true
     */
    mountOnEnter?: boolean;
    /**
     * 是否在退出时卸载内容
     * @en Whether to unmount content on exit
     * @default true
     */
    unmountOnExit?: boolean;
    /**
     * 弹窗打开时是否禁止body的滚动
     * @en Whether to prohibit the scrolling of the body when the dropdown box is opened
     * @default true
     */
    preventBodyScroll?: boolean;
    /**
     * 页面初始 overflow 状态，即关闭弹窗时 overflow 应该还原的状态
     * @en The initial overflow state of the page, that is, the state in which overflow should be restored when the dropdown box is closed
     * @default 第一个全屏组件（弹窗、toast等）打开时页面overflow值
     * @default_en The page overflow value when the first fullscreen component (popup, toast, etc.) is opened
     */
    initialBodyOverflow?: string;
    /**
     * 用于定位的元素，优先级低于top/bottom
     * @en Element used for positioning, with lower priority than top/bottom
     * @default 当前DOM所在位置的父元素
     * @default_en The parent element of the current DOM
     */
    getAnchorElement?: () => HTMLElement;
    /**
     * 点击某元素时是否阻止关闭面板, 优先级高于`getStopTouchElement`，当 clickOtherToClose=true 时有效
     * @en Whether to prevent the panel from closing when an element is clicked, the priority is higher than `getStopTouchElement`, valid when clickOtherToClose=true
     * */
    isStopTouchEl?: (el: HTMLElement) => boolean;
    /**
     * 可阻止关闭面板的元素，当 clickOtherToClose=true 时有效
     * @en Element that prevents the panel from closing, valid when clickOtherToClose=true
     * @default 当前组件的父元素
     * @default_en The parent element of the current component
     */
    getStopTouchElements?: () => HTMLElement[];
    /**
     * 内容内部滚动区域容器，在该容器中未滚动到顶部或底部时会释放滚动
     * @en Content inner scroll container, scrolling will be releases when it is not scrolled to the top or bottom
     * */
    getScrollContainer?: () => HTMLElement[] | HTMLElement | null;
    /**
     * 获取挂载容器
     * @en Get mounted container
     * */
    getPortalContainer?: () => HTMLElement;
}

export interface SingleOptionProps {
    /**
     * 是否支持多选
     * @en Whether to support multiple selection
     * @default false
     */
    multiple?: false;
    /**
     * 默认选中值
     * @en Default checked value
     * */
    defaultSelectedValue?: OptionValueType;
    /**
     * 当前选择的选项标识
     * @en The currently selected option value
     * */
    selectedValue?: OptionValueType;
    /**
     * 点击选项时触发的回调函数
     * @en Callback when clicking option
     * */
    onOptionClick?: (val: OptionValueType, op: OptionsItem) => void;
    /**
     * 当选项改变时触发的回调函数
     * @en Callback when the option changes
     *  */
    onOptionChange?: (val: OptionValueType, op: OptionsItem) => void;
}

export interface MultipleOptionProps {
    multiple: true;
    defaultSelectedValue?: OptionValueType[];
    selectedValue?: OptionValueType[];
    onOptionClick?: (selected: boolean, val: OptionValueType, op: OptionsItem) => void;
    onOptionChange?: (vals: OptionValueType[], op: OptionsItem) => void;
}

export type OptionProps = SingleOptionProps | MultipleOptionProps;

export interface DropdownBasicProps extends DropdownCommonProps {
    /**
     * 是否展开下拉框
     * @en Whether to expand the dropdown box
     * @default false
     */
    showDropdown: boolean;
    /**
     * 展示的选项,优先级低于dropdownNode
     * @en Displayed options, lower priority than dropdownNode
     * @default []
     */
    options?: OptionsItem[];
    /**
     * 自定义下拉框元素
     * @en Custom dropdown element
     * */
    children?: ReactNode;
    /**
     * 取消选择
     * @en Cancel selection
     * */
    onCancel: () => void;
}

export type DropdownProps = DropdownBasicProps & OptionProps;

export type ValueType = NonNullable<OptionProps['selectedValue']>;

export interface DropdownRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
}

export interface DropdownOptionsBasicProps {
    /**
     * 展示的选项列表
     * @en Displayed list of options
     * */
    options: OptionsItem[];
    /**
     * 使用多列标签样式，传 true 为 4 列，传数字为指定 n 列
     * @en Use multi-column label style, input true, it's 4 columns, and input number n, it will be n columns
     * @default false
     */
    useColumn?: DropdownCommonProps['useColumn'];
    /**
     * 选项列表右侧图标
     * @en Icon on the right side of the options list
     */
    icon?: ReactNode;
}

export type DropdownOptionsProps = DropdownOptionsBasicProps & OptionProps;

export interface DropdownOptionsRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
}
