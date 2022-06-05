import React, { useState, ReactNode, useEffect, useRef } from 'react';
import { cls, nextTick } from '@arco-design/mobile-utils';
import { BasicInputProps } from './props';
import IconClear from '../icon/IconClear';
import { useSystem } from '../_helpers';

export type InputEleType = HTMLInputElement | HTMLTextAreaElement;

export function useInputLogic(
    props: BasicInputProps<InputEleType>,
    inputRef: React.MutableRefObject<InputEleType | null>,
) {
    const {
        value,
        defaultValue,
        validator,
        onChange,
        onInput,
        className,
        style,
        label,
        required,
        prepend,
        append,
        blurBeforeFocus,
        onKeyDown,
        onPressEnter,
        onFocus,
        onBlur,
        onClick,
        disabled,
        border = 'half',
        prefix,
        suffix,
        clearable,
        clearShowType = 'focus',
        clearIcon = <IconClear />,
        onClear,
        autoFocus,
    } = props;
    const [inputValue, setInputValue] = useState(value || defaultValue || '');
    const [showClear, toggleClear] = useState(
        () =>
            clearShowType === 'always' ||
            (clearShowType === 'value' && Boolean(value || defaultValue)),
    );
    const focusingRef = useRef(false);
    const actualInputValue = value !== void 0 ? value : inputValue;
    const system = useSystem();
    const wrapRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (autoFocus) {
            setTimeout(() => {
                inputRef.current && inputRef.current.focus();
            }, 200);
        }
    }, []);

    useEffect(() => {
        // 处理受控模式下的showClear
        // @en Handling showClear in controlled mode
        if (clearShowType === 'value' && value !== void 0) {
            toggleClear(Boolean(value));
        }
    }, [value]);

    function changeValue(nowValue: string, callback = () => {}) {
        if (nowValue && validator) {
            if (typeof validator === 'function') {
                if (!validator(nowValue)) {
                    return;
                }
            } else if (!validator.test(nowValue)) {
                return;
            }
        }
        // 处理非受控模式下的showClear
        // @en Handling showClear in uncontrolled mode
        if (clearShowType === 'value' && value === void 0) {
            toggleClear(Boolean(nowValue));
        }
        setInputValue(nowValue);
        callback();
    }

    function handleChange(e: React.ChangeEvent<InputEleType>) {
        const newValue = e.target.value;
        changeValue(newValue, () => {
            onChange && onChange(e, newValue);
        });
    }

    function handleInput(e: any) {
        const newValue = e.target.value;
        changeValue(newValue, () => {
            onInput && onInput(e, newValue);
        });
    }

    function handleKeyDown(e: React.KeyboardEvent<InputEleType>) {
        if (e.keyCode === 13) {
            onPressEnter && onPressEnter(e);
        }
        onKeyDown && onKeyDown(e);
    }

    function handleFocus(e: React.FocusEvent<InputEleType>) {
        nextTick(() => {
            focusingRef.current = true;
            clearShowType === 'focus' && toggleClear(true);
            onFocus && onFocus(e);
        });
    }

    function handleBlur(e: React.FocusEvent<InputEleType>) {
        nextTick(() => {
            focusingRef.current = false;
            clearShowType === 'focus' && toggleClear(false);
            onBlur && onBlur(e);
        });
    }

    function handleClick(e: React.MouseEvent<InputEleType>) {
        // 安卓才会有键盘切换不过来的问题，ios不开启此项，因为blur之后不能再自动focus
        // @en Android will have the problem that the keyboard cannot be switched. iOS does not enable this, because it can no longer automatically focus after blur.
        if (blurBeforeFocus && system === 'android' && !focusingRef.current) {
            inputRef.current && inputRef.current.blur();
            nextTick(() => {
                inputRef.current && inputRef.current.focus();
            });
        } else {
            inputRef.current && inputRef.current.focus();
        }
        onClick && onClick(e);
    }

    function handleClear(e: React.MouseEvent<HTMLElement, MouseEvent>) {
        // 不展示清除按钮时不触发事件
        // @en No event fired when clear button is not displayed
        if (!clearable || !showClear) {
            return;
        }
        changeValue('', () => {
            onClear && onClear(e);
            // 当点击clear前是focus时强制执行focus
            // @en Enforce focus when focus is before clicking clear
            if (focusingRef.current) {
                inputRef.current && inputRef.current.focus();
            }
        });
    }

    function renderWrapper(prefixCls: string, type: string, children: ReactNode) {
        return (
            <div
                className={`${prefixCls}-container all-border-box ${className || ''}`}
                style={style}
                ref={wrapRef}
            >
                {prepend}
                <div
                    className={cls(
                        `${prefixCls}-wrap`,
                        type,
                        `border-${border}`,
                        system,
                        { disabled },
                        { prefix },
                        { suffix },
                    )}
                >
                    {label || prefix ? (
                        <div className={`${prefixCls}-prefix`}>
                            {label ? (
                                <div className={cls(`${prefixCls}-label`, { required })}>
                                    {label}
                                </div>
                            ) : (
                                prefix
                            )}
                        </div>
                    ) : null}
                    {children}
                    {clearable && showClear ? (
                        <div className={`${prefixCls}-clear`} onClick={handleClear}>
                            {clearIcon}
                        </div>
                    ) : null}
                    {suffix ? <div className={`${prefixCls}-suffix`}>{suffix}</div> : null}
                </div>
                {append}
            </div>
        );
    }

    return {
        inputValue: actualInputValue,
        handleChange,
        handleInput,
        handleKeyDown,
        handleFocus,
        handleBlur,
        handleClick,
        renderWrapper,
        wrapRef,
    };
}
