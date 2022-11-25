import { ReactNode } from 'react';

export interface StepperProps {
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 自定义样式
     * @en Custom stylesheet
     * */
    style?: React.CSSProperties;
    /**
     * input样式
     * @en Input stylesheet
     */
    inputStyle?: React.CSSProperties;
    /**
     * input类名
     * @en Input class
     */
    inputClass?: string;
    /**
     * 绑定值，传入即受控
     * @en Bundled value (Controlled)
     */
    value?: number;
    /**
     * 默认值
     * @en Default value
     * @default 1
     */
    defaultValue?: number;
    /**
     * 是否允许内容为空
     * @en Whether the content is allowed to be empty
     * @default false
     */
    allowEmpty?: boolean;
    /**
     * 格式化到小数点后固定位数，设置为 0 表示格式化到整数
     * @en Formatted to a decimal point after a fixed number of digits, set to 0 indicates formatting to an integer
     * @default 0
     */
    digits?: number;
    /**
     * 是否禁用步进器
     * @en Whether to disable the stepper
     * @default false
     */
    disabled?: boolean;
    /**
     * 输入框只读状态
     * @en Input read only status
     * @default false
     */
    inputReadonly?: boolean;
    /**
     * 最大值
     * @en Max value
     * @default Infinity
     */
    max?: number;
    /**
     * 最小值
     * @en Min value
     * @default 1
     */
    min?: number;
    /**
     * 是否允许操作大于/小于极限值时，操作结果等于极限值
     * @en If an operation is allowed to be greater more/less than the limit value, the result of the operation is equal to the limit value
     */
    equalLimitDisabled?: boolean;
    /**
     * 递增/减值
     * @en Incremental/Impairment value
     * @default 1
     */
    step?: number;
    /**
     * 边框风格
     * @en Border style
     * @default "default"
     */
    theme?: 'square' | 'round' | 'default';
    /**
     * 格式化内部值（优先级最高）
     * @en Format the inner value
     */
    formatter?: (innerValue: number) => number | Promise<number>;
    /**
     * 增加按钮
     * @en Add button
     */
    addButton?: ReactNode;
    /**
     * 删除按钮
     * @en Delete button
     */
    minusButton?: ReactNode;
    /**
     * 自定义输入框函数
     * @en The function of customizing the input
     */
    renderContent?: (innerValue: number) => ReactNode;
    /**
     * 输入框失去焦点时触发
     * @en Triggers when the input loses focus
     */
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    /**
     * 数据变化时的触发
     * @en Triggers when the data change
     */
    onChange?: (value: number | null) => void;
    /**
     * 输入框获得焦点时触发
     * @en Triggers when the input gets focus
     */
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    /**
     * 点击增加按钮时触发
     * @en Triggers when the add button is clicked
     */
    onAddButtonClick?: (e: React.MouseEvent) => void;
    /**
     * 点击减少按钮时触发
     * @en Triggers when the minus button is clicked
     */
    onMinusButtonClick?: (e: React.MouseEvent) => void;
    /**
     * 点击最外侧dom时触发
     * @en Triggers when the most out dom is clicked
     */
    onClick?: (e: React.MouseEvent) => void;
    /**
     * 输入框输入时触发
     * @en Triggers when the input is inputting
     */
    onInput?: (e: React.ChangeEvent) => void;
}

export interface StepperRef {
    /**
     * 最外层元素 DOM
     * @en The most out element dom
     */
    dom: HTMLDivElement | null;
    /**
     * 输入框 DOM
     * @en Input dom
     */
    input: HTMLInputElement | null;
    /**
     * 改变内部值的方法
     * @en The function of changing inner value
     */
    changeValue: (newValue: number | null) => void;
}
