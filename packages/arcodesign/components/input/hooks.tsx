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
        preventEventWhenClearing = true,
        onClear,
        autoFocus,
        blockChangeWhenCompositing,
    } = props;
    const [inputValue, setInputValue] = useState(value || defaultValue || '');
    const [showClear, toggleClear] = useState(
        () =>
            clearShowType === 'always' ||
            (clearShowType === 'value' && Boolean(value || defaultValue)),
    );
    const compositingRef = useRef(false);
    /**
     * clear相关问题背景
     * 如果点击clear按钮之前已经是focusing状态了，那么在点完clear按钮之后会手动聚焦一下
     * 该行为将导致onClear事件触发时，也会触发一次onBlur和onFocus事件，可能影响一些组件外的代码逻辑
     *
     * e.g. 假设input按钮右侧有一个按钮仅在聚焦时展示
     * 实现代码大致是：onBlur设置其visible为false，onFocus设置其visible为true
     * 那么这个按钮就会因为clear的点击造成一瞬的闪烁
     *
     * 解决思路
     * 先来看一下，在输入框已激活的状态时，点击清除按钮后，组件的一些事件的触发顺序
     * handleBlur -> handleClear -> handleFocus -> onBlur(外部回调) -> onFocus(外部回调)
     * 可以看到外部的onBlur和onFocus回调都是在handleClear函数之后被调用
     * 因此可以在handleClear中设置一个shouldPreventEvent的boolean标志
     * 如果这个标志为true，则跳过调用外部的onBlur和onFocus，并在最后再将标志置回false
     *
     */
    const [isFocusing, setIsFocusing] = useState(false);
    const shouldPreventEvent = useRef(false);
    const actualInputValue = value !== void 0 ? value : inputValue;
    const system = useSystem();
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const needComposition = system === 'ios' && blockChangeWhenCompositing;

    useEffect(() => {
        if (autoFocus) {
            setTimeout(() => {
                inputRef.current && inputRef.current.focus();
            }, 200);
        }
    }, []);

    useEffect(() => {
        const handleCompositionStart = () => {
            compositingRef.current = true;
        };
        const handleCompositionEnd = e => {
            compositingRef.current = false;
            handleChange(e);
        };
        if (inputRef.current && needComposition) {
            inputRef.current.addEventListener('compositionstart', handleCompositionStart);
            inputRef.current.addEventListener('compositionend', handleCompositionEnd);
        }
        return () => {
            if (inputRef.current && needComposition) {
                inputRef.current.removeEventListener('compositionstart', handleCompositionStart);
                inputRef.current.removeEventListener('compositionend', handleCompositionEnd);
            }
        };
    }, [needComposition]);

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
        if (needComposition && compositingRef.current) {
            return;
        }
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
            if (preventEventWhenClearing && shouldPreventEvent.current) {
                shouldPreventEvent.current = false;
                return;
            }
            setIsFocusing(true);
            clearShowType === 'focus' && toggleClear(true);
            onFocus && onFocus(e);
        });
    }

    function handleBlur(e: React.FocusEvent<InputEleType>) {
        nextTick(() => {
            if (preventEventWhenClearing && shouldPreventEvent.current) {
                return;
            }
            setIsFocusing(false);
            clearShowType === 'focus' && toggleClear(false);
            onBlur && onBlur(e);
        });
    }

    function handleClick(e: React.MouseEvent<InputEleType>) {
        // 安卓才会有键盘切换不过来的问题，ios不开启此项，因为blur之后不能再自动focus
        // @en Android will have the problem that the keyboard cannot be switched. iOS does not enable this, because it can no longer automatically focus after blur.
        if (blurBeforeFocus && system === 'android' && !isFocusing) {
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
            if (isFocusing) {
                if (preventEventWhenClearing) {
                    shouldPreventEvent.current = true;
                }
                inputRef.current && inputRef.current.focus();
            }
        });
    }

    function renderPendNode(
        pend?: ReactNode | ((focusing: boolean, keyword: string) => ReactNode),
    ) {
        return typeof pend === 'function' ? pend(isFocusing, actualInputValue) : pend;
    }

    function renderWrapper(prefixCls: string, type: string, children: ReactNode) {
        return (
            <div
                role="search"
                className={`${prefixCls}-container all-border-box ${className || ''}`}
                style={style}
                ref={wrapRef}
            >
                {renderPendNode(prepend)}
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
                {renderPendNode(append)}
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
