import React, {
    forwardRef,
    Ref,
    useImperativeHandle,
    useRef,
    useEffect,
    useMemo,
    ReactNode,
} from 'react';
import { cls, componentWrapper } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import { BasicInputProps } from '../input/props';
import { useInputLogic } from '../input/hooks';

export interface TextareaProps extends BasicInputProps<HTMLTextAreaElement> {
    /**
     * 文本域默认行数
     * @en Default number of lines in the text field
     */
    rows?: number;
    /**
     * 自适应内容高度
     * @en Adaptive content height
     */
    autosize?: boolean;
    /**
     * 文本域dom自定义类名
     * @en Custom classname of text field dom
     */
    textareaClass?: string;
    /**
     * 文本域dom自定义样式
     * @en Custom stylesheet of text field dom
     */
    textareaStyle?: React.CSSProperties;
    /**
     * autosize=true 时，是否通过 cloneNode 计算新高度
     * @en When autosize=true, whether to calculate the new height through cloneNode
     * @default false
     */
    cloneNodeWhenAutosize?: boolean;
    /**
     * 是否展示字数统计
     * @en Whether to display word count
     * @default true
     */
    showStatistics?: boolean;
    /**
     * 字数统计时的最大输入长度
     * @en Maximum input length for word count
     */
    statisticsMaxlength?: number;
    /**
     * 自定义统计字数方法
     * @en Customize word count method
     */
    statisticsLengthCaculator?: (value: string) => number;
    /**
     * 字数统计错误状态切换回调，仅当状态发生改变时触发
     * @en Callback when the error state of word count switches, triggered only when the state changes
     */
    onErrStatusChange?: (hasError: boolean) => void;
    /**
     * 字数统计错误状态回调，当值有改变时就会触发
     * @en Callback when word count is in error status, triggered when the value changes
     */
    onErrValueChange?: (hasError: boolean, currentLength: number, maxLength?: number) => void;
    /**
     * 自定义字数统计内容
     * @en Custom word count content
     */
    renderStatistics?: (currentLength: number, maxLength: number) => ReactNode;
    /**
     * 其他未列出的原生属性，优先级低于已列出的组件属性
     * @en Other unlisted native properties, lower priority than listed component properties
     */
    nativeProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export interface TextareaRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
    /**
     * 原生文本框 DOM
     * @en Native textarea DOM
     */
    textarea: HTMLTextAreaElement | null;
    /**
     * 手动 resize 输入框，autosize=true 时生效
     * @en Manually resize the input box, it takes effect when autosize=true
     */
    resize: () => void;
}

const Textarea = forwardRef((props: TextareaProps, ref: Ref<TextareaRef>) => {
    const {
        id,
        name,
        rows,
        placeholder,
        readOnly,
        onKeyUp,
        onKeyPress,
        disabled,
        autosize,
        cloneNodeWhenAutosize,
        showStatistics = true,
        statisticsMaxlength,
        statisticsLengthCaculator,
        onErrStatusChange,
        onErrValueChange,
        renderStatistics,
        maxLength,
        textareaClass,
        textareaStyle,
        nativeProps = {},
    } = props;
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const cloneNodeRef = useRef<HTMLTextAreaElement | null>(null);
    const {
        inputValue,
        handleClick,
        handleChange,
        handleInput,
        handleKeyDown,
        handleFocus,
        handleBlur,
        renderWrapper,
        wrapRef,
    } = useInputLogic(props, textareaRef);
    const maxValueLength = statisticsMaxlength || maxLength;
    const currentValueLength = useMemo(() => {
        if (statisticsLengthCaculator) {
            return statisticsLengthCaculator(inputValue);
        }
        // 默认为过滤换行后的字符长度
        // @en The default is the character length after filtering newlines
        const validValue = (inputValue || '').replace(/\n/g, '');
        return validValue ? String(validValue).length : 0;
    }, [inputValue, statisticsLengthCaculator]);
    const exceed = maxValueLength ? currentValueLength > maxValueLength : false;

    useImperativeHandle(
        ref,
        () => ({
            dom: wrapRef.current,
            textarea: textareaRef.current,
            resize: resizeTextarea,
        }),
        [resizeTextarea],
    );

    useEffect(() => {
        return () => {
            cloneNodeRef.current && document.body.removeChild(cloneNodeRef.current);
        };
    }, []);

    useEffect(() => {
        resizeTextarea();
    }, [inputValue, placeholder]);

    useEffect(() => {
        onErrStatusChange && onErrStatusChange(exceed);
    }, [exceed]);

    useEffect(() => {
        onErrValueChange && onErrValueChange(exceed, currentValueLength, maxValueLength);
    }, [maxValueLength, currentValueLength]);

    function resizeTextarea() {
        if (!autosize || !textareaRef.current) {
            return;
        }
        let currentRef = textareaRef.current;
        if (cloneNodeWhenAutosize) {
            const cloneNode = textareaRef.current.cloneNode(true) as HTMLTextAreaElement;
            if (cloneNodeRef.current) {
                document.body.replaceChild(cloneNode, cloneNodeRef.current);
            } else {
                document.body.appendChild(cloneNode);
            }
            const computedStyle = window.getComputedStyle(textareaRef.current);
            // 影响布局的css属性复制
            // @en Copy css properties which affect layout
            ['width', 'fontSize', 'lineHeight', 'letterSpacing', 'wordSpacing'].forEach(
                styleKey => {
                    cloneNode.style[styleKey] = computedStyle[styleKey];
                },
            );
            cloneNode.classList.add('fake-textarea');
            cloneNodeRef.current = cloneNode;
            currentRef = cloneNode;
        }
        currentRef.style.height = 'auto';
        const maxHeight = Math.max(currentRef.clientHeight, currentRef.scrollHeight);
        textareaRef.current.style.height = `${maxHeight}px`;
    }

    function renderTextarea({ prefixCls }) {
        const prefix = `${prefixCls}-input`;
        return renderWrapper(
            prefix,
            `textarea ${showStatistics ? 'has-stat' : ''}`,
            <>
                <textarea
                    {...nativeProps}
                    id={id}
                    name={name}
                    rows={rows}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyUp={onKeyUp}
                    onKeyPress={onKeyPress}
                    ref={textareaRef}
                    className={cls(`${prefixCls}-textarea`, textareaClass)}
                    style={textareaStyle}
                    value={inputValue}
                    maxLength={maxLength}
                    disabled={disabled}
                    onChange={handleChange}
                    onInput={handleInput}
                    onKeyDown={handleKeyDown}
                    onClick={handleClick}
                />
                {showStatistics && maxValueLength ? (
                    <span
                        className={cls('statistic-text', {
                            exceed,
                        })}
                    >
                        {renderStatistics
                            ? renderStatistics(currentValueLength, maxValueLength)
                            : `${currentValueLength}/${maxValueLength}`}
                    </span>
                ) : null}
            </>,
        );
    }

    return <ContextLayout>{renderTextarea}</ContextLayout>;
});

/**
 * 多行文本输入框组件，支持自适应内容高度。
 * @en A multi-line textarea, supports adaptive content height.
 * @type 数据录入
 * @type_en Data Entry
 * @name 多行文本框
 * @name_en Textarea
 * @displayName Textarea
 */
export default componentWrapper(Textarea, 'Textarea');
