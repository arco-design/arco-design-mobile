import React, {
    useState,
    useRef,
    forwardRef,
    Ref,
    useImperativeHandle,
    useMemo,
    ReactNode,
} from 'react';
import { cls, componentWrapper } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import IconStarFill from '../icon/IconStarFill';
import IconStarHalf from '../icon/IconStarHalf';
import { useUpdateEffect } from '../_helpers';

export type RateIconType = ReactNode | ((index: number) => ReactNode);

export interface RateProps {
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
     * 默认评分
     * @en Default value
     * @default 0
     */
    defaultValue?: number;
    /**
     * 当前评分(受控)
     * @en Current value (Controlled)
     */
    value?: number;
    /**
     * 图标数量
     * @en Number of icons
     * @default 5
     */
    count?: number;
    /**
     * 每个图标的分值
     * @en Points for each icon
     * @default 1
     */
    step?: number;
    /**
     * 选中时颜色
     * @en Color when selected
     */
    color?: string;
    /**
     * 未选中时颜色
     * @en Color when unselected
     */
    normalColor?: string;
    /**
     * 禁用时颜色
     * @en Color when disabled
     */
    disabledColor?: string;
    /**
     * 是否允许半选
     * @en Whether to allow semi-selection
     * @default false
     */
    allowHalf?: boolean;
    /**
     * 是否为禁用状态
     * @en Whether to be disable
     * @default false
     */
    disabled?: boolean;
    /**
     * 自定义图标大小
     * @en Custom icon size
     */
    size?: number | string;
    /**
     * 自定义图标间距(点击热区包含间距)
     * @en Custom icon spacing (click hotspot includes spacing)
     */
    offset?: number | string;
    /**
     * 自定义图标
     * @en Custom icons
     */
    icons?: {
        normal: RateIconType;
        active: RateIconType;
        halfActive?: RateIconType;
    };
    /**
     * 当前分值变化触发的事件
     * @en Callback when the current value changes
     * @default (value) => void
     */
    onChange?: (value: number) => void;
}

export interface RateRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
}

const Rate = forwardRef((props: RateProps, ref: Ref<RateRef>) => {
    const {
        className,
        style,
        defaultValue = 0,
        value,
        count = 5,
        step = 1,
        color,
        normalColor,
        disabledColor,
        allowHalf = false,
        disabled = false,
        size,
        offset,
        icons,
        onChange,
    } = props;
    const [innerValue, setInnerValue] = useState(defaultValue);
    const starIndex = useMemo(() => {
        const actualValue = value !== void 0 ? value : innerValue;
        return actualValue / step || 0;
    }, [value, innerValue, step]);
    const domRef = useRef<HTMLDivElement | null>(null);
    const helpArray = useMemo(() => Array(count).fill(''), [count]);

    useUpdateEffect(() => {
        handleStarIndexChange(starIndex);
    }, [step]);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    function handleStarIndexChange(newIndex: number) {
        if (disabled) {
            return;
        }
        const newValue = newIndex * step;
        setInnerValue(newValue);
        onChange && onChange(newValue);
    }

    function renderIconByAttr(defaultNode: ReactNode, index: number, attr?: RateIconType) {
        if (!attr) {
            return defaultNode;
        }
        if (typeof attr === 'function') {
            // 对外的index从0开始
            // @en External index starts from 0
            return attr(index - 1);
        }
        return attr;
    }

    function getIconStatus(index: number) {
        if (starIndex >= index) {
            return 'active';
        }
        if (starIndex >= index - 0.5 && allowHalf) {
            return 'half-active';
        }
        return 'normal';
    }

    function renderRateIcon(
        prefix: string,
        status: 'active' | 'half-active' | 'normal',
        index: number,
    ) {
        if (status === 'active') {
            return renderIconByAttr(
                <IconStarFill
                    className={cls(`${prefix}-icon active`, { disabled })}
                    style={{ fontSize: size, color: disabled ? disabledColor : color }}
                />,
                index,
                icons?.active,
            );
        }
        if (status === 'half-active') {
            const { active, halfActive } = icons || {};
            const customIcon = halfActive || active;
            return renderIconByAttr(
                <>
                    <IconStarFill
                        className={cls(`${prefix}-icon normal`, { disabled })}
                        style={{ fontSize: size, color: normalColor }}
                    />
                    <IconStarHalf
                        className={cls(`${prefix}-icon half-active`, { disabled })}
                        style={{
                            fontSize: size,
                            color: disabled ? disabledColor : color,
                        }}
                    />
                </>,
                index,
                customIcon,
            );
        }
        return renderIconByAttr(
            <IconStarFill
                className={cls(`${prefix}-icon normal`, { disabled })}
                style={{ fontSize: size, color: normalColor }}
            />,
            index,
            icons?.normal,
        );
    }

    return (
        <ContextLayout>
            {({ prefixCls, useRtl }) => (
                <div
                    role="slider"
                    aria-valuemin={0}
                    aria-valuemax={count}
                    aria-valuenow={innerValue}
                    aria-disabled={disabled}
                    className={cls(`${prefixCls}-rate`, className, { disabled })}
                    style={style}
                    ref={domRef}
                >
                    {helpArray.map((_, i) => {
                        // 对内的index从1开始，方便计算
                        // @en The index of the pair starts from 1, which is convenient for calculation
                        const index = i + 1;
                        const halfIndex = allowHalf ? index - 0.5 : index;
                        const status = getIconStatus(index);
                        return (
                            <div
                                key={index}
                                style={{ padding: offset }}
                                className={`${prefixCls}-rate-icon-wrap ${status}`}
                            >
                                {renderRateIcon(`${prefixCls}-rate`, status, index)}
                                <div
                                    className={`${prefixCls}-rate-icon-click-half left`}
                                    onClick={() =>
                                        handleStarIndexChange(useRtl ? index : halfIndex)
                                    }
                                />
                                <div
                                    className={`${prefixCls}-rate-icon-click-half right`}
                                    onClick={() =>
                                        handleStarIndexChange(useRtl ? halfIndex : index)
                                    }
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </ContextLayout>
    );
});

/**
 * 评分组件，支持受控模式
 * @en Rate component, supports controlled mode
 * @type 数据录入
 * @type_en Data Entry
 * @name 评分
 * @name_en Rate
 * @displayName Rate
 */
export default componentWrapper(Rate, 'Rate');
