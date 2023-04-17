import { cls } from '@arco-design/mobile-utils';
import React, { useRef, forwardRef, Ref, useImperativeHandle, useMemo } from 'react';
import { ContextLayout } from '../context-provider';
import { getStyleWithVendor, useGenSvgKey, useProgress } from '../_helpers';

export interface CircleProgressProps {
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
    /** 文字显示位置
     * @en Text display position
     * @default "center"
     */
    percentPosition?: 'center' | 'bottom';
    /**
     * 是否显示圆环内部文字
     * @en Whether to display the text inside the ring
     * @default true
     */
    showPercent?: boolean;
    /**
     * 进度环百分比
     * @en Progress ring Percentage
     */
    percentage: number;
    /**
     * 圆环内部文字显示（一个函数，返回ReactNode类型，回调参数为当前进度百分比）
     * @en The text inside the ring (a function that returns the ReactNode type, and the callback parameter is the current progress percentage)
     */
    renderPercent?: (percentage: number) => React.ReactNode;
    /**
     * 轨道颜色
     * @en Track color
     */
    trackColor?: string;
    /**
     * 进度环颜色
     * @en progress ring color
     */
    progressColor?: string;
    /**
     * 是否置灰
     * @en Whether to disable
     * @default false
     */
    disabled?: boolean;
    /**
     * 轨道宽度
     * @en Track width
     * @default 10
     */
    trackStroke?: number;
    /**
     * 进度环宽度
     * @en Progress ring width
     * @default 12
     */
    progressStroke?: number;
    /**
     * 进度环渐变开始的颜色(当设置progressColorStart和progressColorEnd其中一个时，颜色会覆盖掉progressColor的颜色)
     * @en The start gradient color of the progress ring (when one of progressColorStart and progressColorEnd is set, the color will override the color of progressColor)
     */
    progressColorStart?: string;
    /**
     * 进度环渐变结束的颜色
     * @en The end gradient color of the progress ring
     */
    progressColorEnd?: string;
    /**
     * 每增加step步长所需的毫秒数
     * @en The number of milliseconds required to increase the step size
     * @default 30
     */
    duration?: number;
    /**
     * 步长（增加步长，以step增长）
     * @en Step size (increase the step size, grow by step)
     * @default 1
     */
    step?: number;
    /**
     * 是否逆时针增加
     * @en Whether to increase counterclockwise
     * @default false
     */
    clockwise?: boolean;
    /**
     * 圆环半径
     * @en Ring radius
     */
    radius?: number;
    /**
     * 进度条两端是否圆角
     * @en Whether the ends of the progress bar are rounded
     * @default true
     */
    filleted?: boolean;
    /**
     * 初始化percentage时是否以动画形式过渡到目的值
     * @en Whether to animate the transition to the destination value when initializing percentage
     * @default true
     */
    mountedTransition?: boolean;
    /**
     * 进度环尺寸
     * @en Progress ring size
     * @default "default"
     */
    size?: 'mini' | 'default';
    /**
     * 初始化时动画的贝塞尔曲线
     * @en Bezier curve of animation at initialization
     * @default [0.34, 0.69, 0.1, 1]
     */
    mountedBezier?: [number, number, number, number];
    /**
     * 区分不同svg的`<def>`内容
     * @en Distinguish `<def>` content of different svg
     */
    svgKey?: string;
}

export interface CircleProgressRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
}

/**
 * 环形进度条组件，以圆环形式表示百分比进度
 * @en Annular progress bar component, representing percentage progress in the form of a circle
 * @type 反馈
 * @type_en Feedback
 * @name 环形进度条
 * @name_en CircleProgress
 */
const CircleProgress = forwardRef((props: CircleProgressProps, ref: Ref<CircleProgressRef>) => {
    const { size = 'default' } = props;
    const {
        className = '',
        style,
        percentPosition = 'center',
        showPercent = size !== 'mini',
        renderPercent,
        trackColor,
        progressColor,
        disabled = false,
        trackStroke = size === 'mini' ? 4 : 2,
        progressStroke = 4,
        progressColorStart,
        progressColorEnd,
        duration = 300,
        step = 1,
        clockwise = false,
        radius = size === 'mini' ? 9 : 30,
        filleted = size !== 'mini',
        mountedTransition = true,
        mountedBezier = [0.34, 0.69, 0.1, 1],
        svgKey: userSetSvgKey = '',
    } = props;
    const domRef = useRef<HTMLDivElement | null>(null);
    const maxStroke = Math.max(progressStroke, trackStroke);
    const circlePos = maxStroke + radius;
    const circleSize = (radius + maxStroke) * 2;
    const circleLen = 2 * Math.PI * radius;
    const percentage = Math.min(100, Math.max(props.percentage, 0));
    const { svgKey } = useGenSvgKey(userSetSvgKey);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    const isRenderNormal = !(Boolean(progressColorStart) && Boolean(progressColorEnd));
    const [currentPercentage, transitionControl] = useProgress(
        mountedTransition,
        percentage,
        duration,
        mountedBezier,
        step,
    );
    const color = useMemo(() => {
        if (isRenderNormal) {
            if (progressColorStart) {
                return progressColorStart;
            }
            if (progressColorEnd) {
                return progressColorEnd;
            }
            return progressColor;
        }
    }, [progressColorStart, progressColorEnd, progressColor]);
    function renderNormalProgress() {
        return (
            <circle
                cx={circlePos}
                cy={circlePos}
                r={radius}
                strokeWidth={progressStroke}
                className={cls('color', { disabled })}
                strokeDashoffset={circleLen - (currentPercentage / 100) * circleLen || 0}
                strokeDasharray={circleLen}
                strokeLinecap={filleted ? 'round' : 'square'}
                style={getStyleWithVendor({
                    transition: transitionControl
                        ? `stroke-dashoffset ${duration / 1000}s linear`
                        : '',
                    stroke: color,
                })}
                fill="none"
            />
        );
    }
    function renderLinearGradient() {
        return (
            <>
                <defs>
                    <linearGradient
                        id={`${svgKey}-grad-circle-progress`}
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                    >
                        <stop
                            offset="0%"
                            style={{ stopColor: progressColorEnd }}
                            className="linear-gradient-end"
                        />
                        <stop
                            offset="100%"
                            style={{ stopColor: progressColorStart }}
                            className="linear-gradient-start"
                        />
                    </linearGradient>
                </defs>
                <circle
                    cx={circlePos}
                    cy={circlePos}
                    r={radius}
                    strokeDashoffset={circleLen - (currentPercentage / 100) * circleLen || 0}
                    strokeDasharray={circleLen}
                    strokeWidth={progressStroke}
                    strokeLinecap={filleted ? 'round' : 'square'}
                    style={getStyleWithVendor({
                        transition: transitionControl
                            ? `stroke-dashoffset ${duration / 1000}s linear`
                            : '',
                    })}
                    className={cls({ disabled })}
                    stroke={`url(#${svgKey}-grad-circle-progress)`}
                    fill="none"
                />
            </>
        );
    }

    function renderProgress() {
        return isRenderNormal ? renderNormalProgress() : renderLinearGradient();
    }

    function renderCircleProgress({ prefixCls }) {
        return (
            <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percentage}
                className={cls(
                    `${prefixCls}-circle-progress`,
                    disabled ? `${prefixCls}-circle-progress-disabled` : '',
                    `${className}`,
                )}
                style={{ width: circleSize, height: circleSize, ...style }}
                ref={domRef}
            >
                <svg
                    style={getStyleWithVendor({
                        transform: `rotateY(${clockwise ? 180 : 0}deg) rotateZ(-90deg)`,
                    })}
                    viewBox={`0 0 ${circleSize} ${circleSize}`}
                >
                    <circle
                        cx={circlePos}
                        cy={circlePos}
                        r={radius}
                        style={{ stroke: trackColor }}
                        className={`${size === 'mini' ? 'mini' : 'track-color'}`}
                        strokeWidth={trackStroke}
                        fill="none"
                    />
                    {renderProgress()}
                </svg>
                {showPercent ? (
                    <div
                        className={cls(
                            `${prefixCls}-circle-progress-text`,
                            `${isRenderNormal ? 'color' : 'linear-gradient-text'}`,
                            `${prefixCls}-circle-progress-text-${percentPosition}`,
                            { disabled },
                        )}
                        style={{ color }}
                    >
                        {renderPercent !== void 0
                            ? renderPercent(currentPercentage)
                            : `${currentPercentage}%`}
                    </div>
                ) : null}
            </div>
        );
    }
    return <ContextLayout>{renderCircleProgress}</ContextLayout>;
});

export default CircleProgress;
