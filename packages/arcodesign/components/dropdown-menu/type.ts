import { CSSProperties, ReactNode } from 'react';
import { OptionsItem, DropdownCommonProps, OptionValueType } from '../dropdown';

export type { OptionsItem, DropdownCommonProps };

export interface CascadeOptions extends OptionsItem {
    /**
     * 级联选择的下一级内容
     * @en The next level content of the cascade selection
     */
    children?: OptionsItem[];
}

export interface DropdownMenuBasicProps {
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
     * 初始被选择的选择器的序号
     * @en The number of the selector that is initially selected
     */
    defaultSelectIndex?: number;
    /**
     * (受控) 被选择的选择器的序号
     * @en The selected number of selector (controlled)
     */
    selectIndex?: number;
    /**
     * 选择器禁用状态
     * @en Selector disabled state
     */
    disabled?: boolean[];
    /**
     * 选择器的说明
     * @en Description of selectors
     */
    selectTips?: string[];
    /**
     * 当选中的选择器改变的时候触发的回调函数
     * @en Callback when the selected selector changes
     */
    onSelectChange?: (selectIndex: number) => void;
    /**
     * 选择器右侧的图标
     * @en Icon to the right of the selector
     */
    icon?: ReactNode;
    /**
     * 初始状态,下拉框状态
     * @en Initial dropdown state
     */
    defaultShowDropdown?: boolean;
    /**
     * 可选受控，组件挂载时下拉框的状态
     * @en Optionally controlled, the state of the dropdown box when the component is mounted
     */
    showDropdown?: boolean;
    /**
     * 下拉框展示状态改变时触发的回调函数
     * @en Callback when displayed status of drop-down box changes
     */
    onDropdownChange?: (dropdown: boolean, selectIndex?: number) => void;
    /**
     * 获得下拉框的容器
     * @en Get the dropdown box's container
     */
    getContainer?: () => HTMLDivElement;
    /**
     * 选择后是否收起面板，仅单选有效
     * @en Whether to close the panel after selection, only single selection is valid
     * @default true
     */
    chooseAndClose?: boolean;
    /**
     * 取消选择
     * @en Callback for cancelling selection
     */
    onCancel?: () => void;
    /**
     * 自定义下拉框元素
     * @en Custom dropdown element
     */
    children?: ReactNode;
    /**
     * dropdown参数
     * @en Dropdown parameter
     */
    extraForDropdown?: DropdownCommonProps;
}

export interface SingleOptionProps {
    /**
     * 是否支持多选
     * @en Whether to support multiple selection
     * @default false
     */
    multiple?: false;
    /**
     * 下拉框展示的选择项，其中级联选项仅单选支持
     * @en The options displayed in the dropdown box, in which the cascade option only supports single selection
     *  */
    options: string[] | OptionsItem[][] | CascadeOptions[];
    /**
     * 初始选择项
     * @en initial selection item
     *  */
    defaultValues?: OptionValueType[];
    /**
     * (受控) 每个选择器选中的项
     * @en (Controlled) The item selected by each selector
     *  */
    values?: OptionValueType[];
    /**
     * 自定义选择器
     * @en Custom selector
     */
    renderSelectLabel?: (op: OptionsItem, index: number) => ReactNode;
    /**
     * 点击选项时触发的回调函数
     * @en Callback when clicking option
     *  */
    onOptionClick?: (value: OptionValueType, item: OptionsItem, selectIndex?: number) => void;
    /**
     * 选项改变时触发的回调函数
     * @en Callback when options change
     *  */
    onOptionChange?: (value: OptionValueType, item: OptionsItem, selectIndex?: number) => void;
    /**
     * 所有选择器选项总值改变时的回调函数
     * @en Callback when the total value of all selector options changes
     *  */
    onValuesChange?: (values: OptionValueType[]) => void;
    /**
     * 格式化传入的options
     * @en Format the input options
     *  */
    getFormattedOptions?: (
        options: SingleOptionProps['options'],
        values?: OptionValueType[],
    ) => {
        formattedOptions: OptionsItem[][];
        formattedValue: OptionValueType[];
    };
}

export interface MultipleOptionProps {
    multiple: true;
    options: string[] | OptionsItem[][];
    defaultValues?: OptionValueType[][];
    values?: OptionValueType[][];
    renderSelectLabel?: (op: OptionsItem[], index: number) => ReactNode;
    onOptionClick?: (
        selected: boolean,
        val: OptionValueType,
        item: OptionsItem,
        selectIndex?: number,
    ) => void;
    onOptionChange?: (vals: OptionValueType[], item: OptionsItem, selectIndex?: number) => void;
    onValuesChange?: (values: OptionValueType[][]) => void;
    getFormattedOptions?: (
        options: SingleOptionProps['options'],
        values?: OptionValueType[][],
    ) => {
        formattedOptions: OptionsItem[][];
        formattedValue: OptionValueType[][];
    };
}

export type OptionProps = SingleOptionProps | MultipleOptionProps;

export type DropdownMenuProps = DropdownMenuBasicProps & OptionProps;

export type ValueType = NonNullable<OptionProps['values']>;

export interface DropdownMenuRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
}
