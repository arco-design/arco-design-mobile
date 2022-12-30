import { cls, componentWrapper } from '@arco-design/mobile-utils';
import React, { useRef, forwardRef, Ref, useImperativeHandle } from 'react';
import { ContextLayout } from '../context-provider';
import useButtonClick from './hooks/useButtonClick';
import useInputEvent from './hooks/useInputEvent';
import { IconAdd, IconMinus } from '../icon';
import useValue from './hooks/useValue';
import { StepperProps, StepperRef } from './type';

export * from './type';

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
        onBlur,
        onChange,
        onFocus,
        onAddButtonClick,
        onMinusButtonClick,
        onClick,
        onInput,
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
                    <div aria-label="decrease" onClick={handleMinusButtonClick}>
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
                            role="spinbutton"
                            aria-valuenow={Number(showValue)}
                            aria-valuemax={max}
                            aria-valuemin={min}
                        />
                    )}

                    <div aria-label="increase" onClick={handleAddButtonClick}>
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

/**
 * 步进器组件，支持受控模式
 * @en Stepper component, provide controlled mode
 * @type 数据录入
 * @type_en Data Entry
 * @name 步进器
 * @name_en Stepper
 * @displayName Stepper
 */
export default componentWrapper(Stepper, 'Stepper');
