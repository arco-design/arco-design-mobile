import React from 'react';

export interface BasicInputProps<T = HTMLInputElement> {
    /**
     * 输入框的id
     * @en Input id
     */
    id?: string;
    /**
     * 输入框的name
     * @en Input name
     */
    name?: string;
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
     * 绑定值，传入即受控
     * @en Binding value, if input, the component is controlled
     */
    value?: string;
    /**
     * 默认值
     * @en Default value
     */
    defaultValue?: string;
    /**
     * 最大输入长度
     * @en Maximum input length
     */
    maxLength?: number;
    /**
     * 边框展示类型
     * @en Border display type
     * @default "half"
     */
    border?: 'all' | 'half' | 'bottom' | 'none';
    /**
     * 占位文本
     * @en Placeholder text
     */
    placeholder?: string;
    /**
     * 输入框是否禁用
     * @en Whether the input box is disabled
     */
    disabled?: boolean;
    /**
     * 是否只读
     * @en Read-only
     */
    readOnly?: boolean;
    /**
     * 是否自动获取焦点
     * @en Whether to automatically get the focus
     */
    autoFocus?: boolean;
    /**
     * 当 ios 输入中文时，输拼音的过程不触发onChange，仅确认选择后触发
     * @en When inputting Chinese on ios, onChange is not triggered during pinyin input, but only after confirming the selection
     * @default false
     */
    blockChangeWhenCompositing?: boolean;
    /**
     * 输入框左侧文本
     * @en text to the left of the input box
     */
    label?: string | React.ReactNode;
    /**
     * 是否必填项
     * @en Whether it is required
     */
    required?: boolean;
    /**
     * 正则验证，不符合验证的不允许输入
     * @en Regular validation, input is not allowed if it does not meet the validation
     */
    validator?: RegExp | ((value: string) => boolean);
    /**
     * 输入框头部内容，在输入框外部
     * @en The content of the header of the input box, outside the input box
     */
    prepend?: React.ReactNode | ((focusing: boolean, inputValue: string) => React.ReactNode);
    /**
     * 输入框尾部内容，在输入框外部
     * @en The content at the end of the input box, outside the input box
     */
    append?: React.ReactNode | ((focusing: boolean, inputValue: string) => React.ReactNode);
    /**
     * 在聚焦之前blur掉，即切换不同input时会重新弹起键盘，常用于input type切换时重新加载键盘，安卓上有效
     * @en Blur before focusing, that is, the keyboard will be re-bounced when switching between different inputs. It is often used to reload the keyboard when the input type is switched. It is valid on Android.
     */
    blurBeforeFocus?: boolean;
    /**
     * 是否有清除按钮
     * @en whether there is a clear button
     */
    clearable?: boolean;
    /**
     * 清除按钮展示时机：focus - 聚焦时展示 value - 有值则展示 always - 始终展示
     * @en Clear button display timing: focus - display when focused, value - display when there is value, always - always display
     * @default "focus"
     */
    clearShowType?: 'focus' | 'value' | 'always';
    /**
     * 在聚焦模式下点击清除按钮时，是否要屏蔽对应产生的onBlur和onFocus事件
     * @en Whether to block the onBlur and onFocus events generated when the clear button is clicked in focus mode
     * @default true
     */
    preventEventWhenClearing?: boolean;
    /**
     * 清除按钮类型，也可自定义
     * @en Clear button type, also customizable
     * @default \<IconClear className="clear-icon" /\>
     */
    clearIcon?: React.ReactNode;
    /**
     * 按下清除按钮回调
     * @en Callback when clear button is pressed
     */
    onClear?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    /**
     * 输入框前置内容，在输入框内部，也可自定义
     * @en The prefix of the input box, inside the input box, can also be customized
     */
    prefix?: React.ReactNode;
    /**
     * 输入框后置内容，在输入框内部，也可自定义
     * @en The suffix content of the input box, inside the input box, can also be customized
     */
    suffix?: React.ReactNode;
    /**
     * 数据改变时触发（失去焦点时）
     * @en Fired when the data changes (when bluring the focus)
     */
    onChange?: (e: React.ChangeEvent<T>, value: string) => void;
    /**
     * 数据改变时触发
     * @en Callback when data changes
     */
    onInput?: (e: React.ChangeEvent<T>, value: string) => void;
    /**
     * 输入框聚焦时触发
     * @en Callback when the input box is focused
     */
    onFocus?: (e: React.FocusEvent<T>) => void;
    /**
     * 输入框失去焦点时触发
     * @en Callback when the input box is blured
     */
    onBlur?: (e: React.FocusEvent<T>) => void;
    /**
     * 点击输入框事件
     * @en Callback when clicking the input box
     */
    onClick?: (e: React.MouseEvent<T>) => void;
    /**
     * 原生的keyup事件
     * @en Native keyup event
     */
    onKeyUp?: (e: React.KeyboardEvent<T>) => void;
    /** 原生的keydown事件
     * @en Native keydown event
     */
    onKeyDown?: (e: React.KeyboardEvent<T>) => void;
    /**
     * 原生的keypress事件
     * @en Native keypress event
     */
    onKeyPress?: (e: React.KeyboardEvent<T>) => void;
    /**
     * 按下回车键时触发
     * @en Callback when the enter key is pressed
     */
    onPressEnter?: (e: React.KeyboardEvent<T>) => void;
}
