import { cls } from '@arco-design/mobile-utils';
import React, { useRef, forwardRef, Ref, useImperativeHandle, useState, ReactNode } from 'react';
import { ContextLayout } from '../context-provider';
import useButtonClick from './hooks/useButtonClick';
import useInputEvent from './hooks/useInputEvent';
import { IconAdd, IconMinus } from '../icon';
import useValue from './hooks/useValue';

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
     */
    defaultValue?: number;
    /**
     * 是否允许内容为空
     * @en Whether the content is allowed to be empty
     */
    allowEmpty?: boolean;
    /**
     * 格式化到小数点后固定位数，设置为 0 表示格式化到整数
     * @en Formatted to a decimal point after a fixed number of digits, set to 0 indicates formatting to an integer
     */
    digits?: number;
    /**
     * 是否禁用步进器
     * @en Whether to disable the stepper
     */
    disabled?: boolean;
    /**
     * 输入框只读状态
     * @en Input read only status
     */
    inputReadonly?: boolean;
    /**
     * 最大值
     * @en Max value
     */
    max?: number;
    /**
     * 最小值
     * @en Min value
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
     */
    step?: number;
    /**
     * 边框风格
     * @en Border style
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

/**
 * 步进器组件，支持受控模式
 * @en Stepper component, provide controlled mode
 * @type 数据录入
 * @type_en Data input
 * @name 步进器
 * @name_en Stepper
 */
const Stepper = forwardRef((props: StepperProps, ref: Ref<StepperRef>) => {
    const {
        className = '',
        style,
        inputStyle,
        inputClass = '',
        value,
        defaultValue = 1,
        allowEmpty = false,
        digits = 0,
        disabled = false,
        inputReadonly = false,
        max = Infinity,
        min = 1,
        equalLimitDisabled = false,
        step = 1,
        theme = 'default',
        formatter,
        addButton,
        minusButton,
        renderContent,
        onBlur = () => {},
        onChange = () => {},
        onFocus = () => {},
        onAddButtonClick = () => {},
        onMinusButtonClick = () => {},
        onClick = () => {},
        onInput = () => {},
    } = props;

    // 值的相关逻辑
    // @en The logic is that handle value
    const { updateValue, actualInputValue, showValue } = useValue({
        defaultValue,
        formatter,
        min,
        max,
        value,
        digits,
    });

    // 按钮点击的相关逻辑
    // @en The logic is that handle button click
    const { minusButtonDisable, addButtonDisable, handleAddButtonClick, handleMinusButtonClick } =
        useButtonClick({
            actualInputValue,
            min,
            max,
            step,
            disabled,
            digits,
            equalLimitDisabled,
            updateValue,
            onAddButtonClick,
            onMinusButtonClick,
        });

    // 输入框操作的相关逻辑
    // @en The logic is that handle input operation
    const { handleInput, handleBlur } = useInputEvent({
        defaultValue,
        min,
        max,
        digits,
        actualInputValue,
        allowEmpty,
        updateValue,
        onBlur,
        onChange,
        onInput,
    });

    const domRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
        input: inputRef.current,
        changeValue: (newValue: number | null) => {
            let tempValue = newValue != null ? newValue : defaultValue;
            tempValue = Math.min(max, Math.max(tempValue, min));
            updateValue(tempValue);
        },
    }));

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <div
                    className={cls(`${prefixCls}-stepper`, `${prefixCls}-${theme}`, className)}
                    style={style}
                    ref={domRef}
                    onClick={onClick}
                >
                    <div onClick={handleMinusButtonClick}>
                        {minusButton || (
                            <div className={cls(`${prefixCls}-stepper-minus-button`)}>
                                <IconMinus
                                    className={cls(`${prefixCls}-stepper-minus-button-icon`, {
                                        disabled: minusButtonDisable,
                                    })}
                                />
                            </div>
                        )}
                    </div>

                    {renderContent ? (
                        renderContent(actualInputValue)
                    ) : (
                        <input
                            style={inputStyle}
                            className={cls(`${prefixCls}-stepper-input`, inputClass)}
                            onFocus={onFocus}
                            onInput={handleInput}
                            onBlur={handleBlur}
                            disabled={disabled}
                            value={showValue}
                            readOnly={inputReadonly}
                            ref={inputRef}
                            type="number"
                        />
                    )}

                    <div onClick={handleAddButtonClick}>
                        {addButton || (
                            <div className={cls(`${prefixCls}-stepper-add-button`)}>
                                <IconAdd
                                    className={cls(`${prefixCls}-stepper-add-button-icon`, {
                                        disabled: addButtonDisable,
                                    })}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </ContextLayout>
    );
});

export default Stepper;
