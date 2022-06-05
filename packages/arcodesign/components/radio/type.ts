import { CheckboxCommonProps, CheckboxProps, CheckboxRef, ValueType } from '../checkbox';
import { BaseRef } from '../_helpers';
export type { ValueType } from '../checkbox';

export interface RadioGroupProps<
    T extends ValueType = ValueType,
    P extends RadioProps<T> = RadioProps<T>,
> extends CheckboxCommonProps {
    /**
     * 可选项, 传入children后此值无效
     * @en Optional, this value is invalid after inputing children
     */
    options?: P[];
    /**
     * 受控模式，选中的选项
     * @en Checked option, controlled mode
     */
    value?: T;
    /**
     * 默认选中项
     * @en Default checked value
     */
    defaultValue?: T;
    /**
     * 单选项组选中状态变化回调函数
     * @en Callback when checked state of the radio group  changes
     */
    onChange?: (value: T) => void;
}

export interface RadioGroupRef extends BaseRef {}

export interface RadioProps<T extends ValueType = ValueType> extends CheckboxProps<T> {}
export interface RadioRef extends CheckboxRef {}
