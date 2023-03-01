import React, {
    useRef,
    forwardRef,
    Ref,
    useImperativeHandle,
    useContext,
    useState,
    useMemo,
    useCallback,
    ReactNode,
} from 'react';
import { cls, componentWrapper } from '@arco-design/mobile-utils';
import { GlobalContext } from '../context-provider';
import {
    useSliderStyle,
    useSliderIcon,
    SliderContext,
    baseRenderThumb,
    useSliderInit,
    useSliderEvents,
} from './hooks';
import Thumb from './thumb';
import Marks from './marks';

export interface SliderProps {
    /**
     * 自定义类名
     * @en Custom classname
     * @default ""
     */
    className?: string;
    /**
     * 自定义样式
     * @en Custom stylesheet
     * @default {}
     */
    style?: React.CSSProperties;
    /**
     * 是否禁用
     * @en Disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * 使用范围选择
     * @en Use range selection
     * @default 根据 传入初始参数判断，没有则为 false
     * @default_en Judging by the incoming initial parameters, false if not
     */
    useRange?: boolean;
    /**
     * 非点击状态使用动画
     * @en Use animation for non-click state
     * @default true
     */
    useAnimation?: boolean;
    /**
     * 最小值
     * @en Minimum value
     * @default 0
     */
    min?: number;
    /**
     * 最大值
     * @en Maximum value
     * @default 100
     */
    max?: number;
    /**
     * 默认初始值
     * @en Default initial value
     */
    defaultValue?: number | [number, number];
    /**
     * 基础值，组件受控
     * @en Value, component will be controlled
     */
    value?: number | [number, number];
    /**
     * 最小单位
     * @en Step
     * @default 1
     */
    step?: number;
    /**
     * 组件方向
     * @en Component direction
     * @default "horizontal"
     */
    type?: 'horizontal' | 'vertical';
    /**
     * 是否展示气泡
     * @en Whether to show tooltips
     * @default "auto"
     */
    showTooltip?: 'auto' | 'always' | 'never';
    /**
     * 滑动条节点配置
     * @en Slider node configuration
     */
    marks?: number | number[] | Record<string, ReactNode>;
    /**
     * 是否展示标签底部文案
     * @en Whether to display the bottom mark text
     * @default false
     */
    showMarks?: boolean;
    /**
     * 是否只可用标志的值，覆盖 step
     * @en Whether only the value of the mark is available, overriding step
     * @default false
     */
    useMarkOnly?: boolean;
    /**
     * 前缀 icon 或者 文案
     * @en prefix icon or label
     */
    prefixLabel?: boolean | ((value: number | [number, number]) => ReactNode) | ReactNode;
    /**
     * 后缀 icon 或者 文案
     * @en Suffix icon or label
     */
    suffixLabel?: boolean | ((value: number | [number, number]) => ReactNode) | ReactNode;
    /**
     * 组件横条粗细，单位 px
     * @en Slider bar thickness (unit: px)
     * @default 2
     */
    size?: number | string;
    /**
     * 只允许拖动滑块 默认 false
     * @en Only allow dragging of sliders,  the default is false
     * @default false
     */
    draggableTrackOnly?: boolean;
    /**
     * 自定义气泡内容
     * @en Custom tooltip content
     */
    formatTooltip?: (value: number) => string | ReactNode;
    /**
     * 修改后事件，时机同 touchend
     * @en Callback after value changes, the timing is the same as touchend
     */
    onAfterChange?: (value: number | [number, number]) => void;
    /**
     * 实时修改事件
     * @en Callback when value changes in real time
     */
    onChange?: (value: number | [number, number]) => void;
    /**
     * 自定义滑块
     * @en Custom slider
     */
    renderThumb?: (value: number) => ReactNode;
}

export interface SliderRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
}

const Slider = forwardRef((_, ref: Ref<SliderRef>) => {
    const { prefixCls = '' } = useContext(GlobalContext);
    const { className, style, disabled, min, max, type, showTooltip, showMarks } =
        useContext(SliderContext);
    const domRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    // 拖动滑块的 index 为当前的 isTouching
    // @en The index of the slider is the current isTouching
    const [commonIsTouching, setCommonIsTouching] = useState<number>(-1);
    const isHorizontal = /^horizontal/g.test(type);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    const { firstRender, valueGroup, setValueGroup, runTimeConfig, isMultiThumb } = useSliderInit({
        commonIsTouching,
    });

    // 最长线 div 位置
    const getLinePosition = useCallback(() => {
        const { width, left, top, height } = lineRef.current?.getBoundingClientRect() ?? {
            width: 0,
            left: 0,
            top: 0,
            height: 0,
        };
        return {
            length: isHorizontal ? width : height,
            start: isHorizontal ? left : top,
        };
    }, [isHorizontal, firstRender]);

    const { heightStyle, transitionClass, activeLineStyle } = useSliderStyle({
        getLinePosition,
        commonIsTouching,
        valueGroup,
    });

    useSliderEvents({
        lineRef,
        valueGroup,
        setValueGroup,
        getLinePosition,
        setCommonIsTouching,
    });
    const { renderPrefixLabel, renderSuffixLabel } = useSliderIcon({ valueGroup });

    /**
     * 为了减少 dom 元素计算，只改变激活 line 的样式，让对应的 thumb 附着在两边，所以需要实时调整 className
     * @en In order to reduce the calculation of dom elements, only the style of the active line is changed, so that the corresponding thumb is attached to both sides, so the className needs to be adjusted in real time
     */
    const thumbConfig = useMemo(() => {
        if (isMultiThumb) {
            const classNames = ['is-end', 'is-start'];
            return Array(2)
                .fill('')
                .map((_, index) => {
                    let childClassName = classNames[index];
                    if (valueGroup[index] > valueGroup[1 - index]) {
                        [childClassName] = classNames;
                    } else if (valueGroup[index] < valueGroup[1 - index]) {
                        [, childClassName] = classNames;
                    }
                    return {
                        className: childClassName,
                    };
                });
        }
        return [
            {
                className: 'is-end',
            },
        ];
        /**
         * 只有 range 状态才监听 valueGroup
         * @en Only listen to valueGroup in the range state
         */
    }, [isMultiThumb && valueGroup]);

    return (
        <div
            className={cls(`${prefixCls}-slider ${className}`, `is-${type}`, {
                'is-disabled': disabled,
                'show-tooltip': showTooltip !== 'never' && !disabled,
                'show-marks': showMarks,
            })}
            style={style}
            ref={domRef}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={Array.isArray(valueGroup) ? valueGroup[0] : valueGroup}
            aria-disabled={disabled}
        >
            {isHorizontal ? renderPrefixLabel : renderSuffixLabel}
            <div className={`${prefixCls}-slider-wrapper`}>
                <Marks runTimeConfig={runTimeConfig} className={transitionClass} />
                <div className={`${prefixCls}-slider-line`} style={heightStyle} ref={lineRef}>
                    <div
                        className={`${prefixCls}-slider-line is-activated ${transitionClass}`}
                        style={{ ...heightStyle, ...activeLineStyle }}
                    >
                        {thumbConfig.map((cfg, idx) => (
                            <Thumb
                                key={idx}
                                {...{
                                    value: Array.isArray(valueGroup) ? valueGroup[idx] : valueGroup,
                                    min,
                                    max,
                                    isTouching: commonIsTouching === idx,
                                    ...cfg,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {isHorizontal ? renderSuffixLabel : renderPrefixLabel}
        </div>
    );
});

const SliderWrapper = forwardRef((props: SliderProps, ref: Ref<SliderRef>) => {
    const { prefixCls = '' } = useContext(GlobalContext);
    const defaultProps = useContext(SliderContext);
    const newProps = {
        ...defaultProps,
        renderThumb: baseRenderThumb(prefixCls),
        ...props,
    };

    return (
        <SliderContext.Provider value={newProps}>
            <Slider ref={ref} />
        </SliderContext.Provider>
    );
});

/**
 * 滑动型输入器，展示当前值和可选范围。
 * @en Slide input component, displays the current value and optional range.
 * @name 滑动输入条
 * @name_en Slider
 * @type 数据录入
 * @type_en Data Entry
 * @displayName Slider
 */
export default componentWrapper(SliderWrapper, 'Slider');
