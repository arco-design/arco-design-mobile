import React from 'react';
import { BaseRef, BaseProps } from '../_helpers/type';

export type ValueType = string | number;

/**
 * 图标状态枚举
 * @en Icon status enum
 *  */
export enum IconStatus {
    /**
     * 未选中
     * @en unselected
     */
    NORMAL = 'normal',
    /**
     * 禁用态
     * @en disabled
     */
    DISABLED = 'disabled',
    /**
     * 选中态
     * @en active
     */
    ACTIVE = 'active',
    /**
     * 禁用选中态
     * @en active but disabled
     */
    ACTIVE_DISABLED = 'activeDisabled',
}

export interface IconType {
    /**
     * 未选中
     * @en unselected
     */
    normal?: React.ReactNode;
    /**
     * 选中态
     * @en selected
     */
    active?: React.ReactNode;
    /**
     * 禁用态
     * @en disabled
     */
    disabled?: React.ReactNode;
    /**
     * 禁用选中态
     * @en active but disabled
     */
    activeDisabled?: React.ReactNode;
}

export interface CheckboxCommonProps extends BaseProps {
    /**
     * 图标的形状
     * @en Icon shape
     * @default 'circle'
     */
    shape?: 'circle' | 'square';
    /**
     * 排版样式(内联|块级|图标靠右两端对齐)
     * @en Typography style (inline | block level | justified with right icon)
     * @default 'inline'
     */
    layout?: 'inline' | 'block' | 'justify';
    /**
     * 是否禁用
     * @en Whether to disable
     * @default false
     */
    disabled?: boolean;
    /**
     * 自定义图标合集，传 null 表示无图标
     * @en Custom icon collection, input null to indicate no icon
     * @default Default icon
     */
    icons?: IconType | null;
    /**
     * 是否为Radio组件，不推荐使用，仅用于支持Radio组件
     * @en Whether it is a Radio component. It is deprecated, only used to support Radio component
     * @default false
     */
    isRadio?: boolean;
}

export interface CheckboxProps<T extends ValueType = ValueType> extends CheckboxCommonProps {
    /**
     * 选项的文字说明，传入children时此属性无效
     * @en The text description of the option, invalid when the component has children
     * @default ""
     */
    label?: string;
    /**
     * Checkbox的值
     * @en Checkbox value
     */
    value: T;
    /**
     * 默认选中状态
     * @en Default selected status
     * @default false
     */
    defaultCheck?: boolean;
    /**
     * 是否选中，传值即为受控模式
     * @en Whether it is selected or not, the component is in the controlled mode when the property is set
     */
    checked?: boolean;
    /**
     * 复选框选中状态回调函数
     * @en Callback when the checkbox status changes
     * @default () => {}
     */
    onChange?: (checked: boolean, value: T, e: React.MouseEvent) => void;
}

export interface CheckboxRef extends BaseRef {}

export interface CheckboxGroupProps<
    T extends ValueType = ValueType,
    P extends CheckboxProps<T> = CheckboxProps<T>,
> extends CheckboxCommonProps {
    /**
     * 复选框组可选项, 传入children后此值无效
     * @en Checkbox group options, invalid after inputing children
     */
    options?: P[];
    /**
     * 受控模式，复选框选中的选项值
     * @en Checkbox value in controlled mode
     */
    value?: T[];
    /**
     * 默认选中项
     * Default selected option
     * @default []
     */
    defaultValue?: T[];
    /**
     * 最小可选值数量
     * @en Minimum number of options
     * @default 0
     */
    min?: number;
    /**
     * 最大可选值数量，0表示没有限制
     * @en Maximum number of options, 0 means no limit
     * @default 0
     */
    max?: number;
    /**
     * 点击复选框值变化回调
     * @en  Callback when the checkbox value changes
     * @default () => {}
     */
    onChange?: (value: T[]) => void;
}

export interface CheckboxGroupRef extends BaseRef {}

export interface GroupContextParams<T extends ValueType> {
    isGroup: boolean;
    shape: 'circle' | 'square';
    layout: 'inline' | 'block' | 'justify';
    disabled: boolean;
    icons?: IconType | null;
    value: T[];
    onChange: (checked: boolean, value: T, e: React.MouseEvent) => void;
}
