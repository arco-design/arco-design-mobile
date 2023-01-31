import React, { forwardRef, Ref, useImperativeHandle, useRef } from 'react';
import { cls, componentWrapper } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import { BasicInputProps } from './props';
import { useInputLogic } from './hooks';

export interface InputProps extends BasicInputProps {
    /**
     * 输入框类型
     * @en Input box type
     * @default "text"
     */
    type?: string;
    /**
     * 检查控件值的正则表达式
     * @en Regular expression to check the value of input box
     */
    pattern?: string;
    /**
     * 输入框dom自定义类名
     * @en Custom classname for input DOM
     */
    inputClass?: string;
    /**
     * 输入框dom自定义样式
     * @en Custom style for input DOM
     */
    inputStyle?: React.CSSProperties;
    /**
     * 其他未列出的原生属性，优先级低于已列出的组件属性
     *  @en Other unlisted native properties have lower priority than listed component properties
     */
    nativeProps?: React.InputHTMLAttributes<HTMLInputElement>;
    /**
     * 无障碍label
     * @en accessible label
     */
    ariaLabel?: string;
}

export interface InputRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
    /**
     * 原生输入框 DOM
     * @en Native input DOM
     */
    input: HTMLInputElement | null;
}

const Input = forwardRef((props: InputProps, ref: Ref<InputRef>) => {
    const {
        id,
        name,
        maxLength,
        placeholder,
        readOnly,
        onKeyUp,
        onKeyPress,
        type = 'text',
        disabled,
        pattern,
        inputClass,
        inputStyle,
        nativeProps = {},
        ariaLabel = '',
    } = props;
    const inputRef = useRef<HTMLInputElement | null>(null);
    const {
        inputValue,
        handleChange,
        handleInput,
        handleKeyDown,
        handleFocus,
        handleBlur,
        handleClick,
        renderWrapper,
        wrapRef,
    } = useInputLogic(props, inputRef);

    useImperativeHandle(ref, () => ({
        dom: wrapRef.current,
        input: inputRef.current,
    }));

    function renderInput({ prefixCls }) {
        const prefix = `${prefixCls}-input`;
        return renderWrapper(
            prefix,
            type,
            <input
                {...nativeProps}
                id={id}
                name={name}
                maxLength={maxLength}
                placeholder={placeholder}
                readOnly={readOnly}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyUp={onKeyUp}
                onKeyPress={onKeyPress}
                ref={inputRef}
                className={cls(prefix, inputClass)}
                style={inputStyle}
                value={inputValue}
                type={type}
                disabled={disabled}
                pattern={pattern}
                onChange={handleChange}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                onClick={handleClick}
                aria-disabled={disabled}
                aria-label={ariaLabel}
            />,
        );
    }

    return <ContextLayout>{renderInput}</ContextLayout>;
});

/**
 * 输入框组件，支持添加前后缀。
 * @en The input box, supports adding prefixes and suffixes.
 * @type 数据录入
 * @type_en Data Entry
 * @name 输入框
 * @name_en Input
 * @displayName Input
 */
export default componentWrapper(Input, 'Input');
