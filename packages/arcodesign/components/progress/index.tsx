import { cls } from '@arco-design/mobile-utils';
import React, { useRef, forwardRef, Ref, useImperativeHandle } from 'react';
import { ContextLayout } from '../context-provider';
import { getStyleWithVendor, useProgress } from '../_helpers';

type PercentPosition = 'left' | 'innerLeft' | 'right' | 'follow';
export type BezierType = [number, number, number, number];
export interface ProgressProps {
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
     * 文字显示位置
     * @en Text display position
     * @default "center"
     */
    percentPosition?: PercentPosition;
    /**
     * 是否显示进度条内部文字
     * @en Whether to display the text inside the progress bar
     * @default true
     */
    showPercent?: boolean;
    /**
     * 进度环百分比
     * @en Progress percentage
     */
    percentage: number;
    /**
     * 进度条内部文字显示（一个函数，返回ReactNode类型，回调参数为当前进度百分比）
     * @en The text display inside the progress bar (a function that returns the ReactNode type, and the callback parameter is the current progress percentage)
     */
    renderPercent?: (percentage: number) => React.ReactNode;
    /**
     * 轨道颜色
     * @en Track color
     */
    trackColor?: string;
    /**
     * 进度条颜色
     * @en Progress bar color
     */
    progressColor?: string;
    /**
     * 是否置灰
     * @en Whether to be disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * 轨道粗细
     * @en Track thickness
     * @default 一般默认为4，percentPosition=innerLeft 时为18，mode=nav时为2
     * @default_en Generally the default is 4, when percentPosition=innerLeft is 18, when mode=nav is 2
     */
    trackStroke?: number;
    /**
     * 进度条粗细
     * @en progress bar thickness
     * @default 继承 trackStroke 值
     * @default_en Inherit trackStroke value
     */
    progressStroke?: number;
    /**
     * 每增加step步长所需的毫秒数
     * @en The number of milliseconds required to increase the step size
     * @default 300
     */
    duration?: number;
    /**
     * 步长（增加步长，以step增长）
     * @en Step size (increase the step size, grow by step)
     * @default 1
     */
    step?: number;
    /**
     * 进度条是否两端圆角
     * @en Whether the progress bar has rounded corners at both ends
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
     * 初始化时动画的贝塞尔曲线
     * @en Animated bezier curves at initialization
     * @default [0.34, 0.69, 0.1, 1]
     */
    mountedBezier?: BezierType;
    /**
     * 模式可选为nav或者base模式
     * @en The mode can be selected as nav or base mode
     * @default "base"
     */
    mode?: 'nav' | 'base';
    /**
     * 距离屏幕顶部的距离（只有当mode为"nav"才有效）
     * @en The distance from the top of the screen (only valid when mode is "nav")
     * @default 0
     */
    top?: number;
}

export interface ProgressRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
}

/**
 * 进度条组件，可根据外界传递进来的百分比进行进度展示
 * @en Progress bar, which can display progress according to the percentage passed in from the outside
 * @type 反馈
 * @type_en Feedback
 * @name 进度条
 * @name_en Progress
 */
const Progress = forwardRef((props: ProgressProps, ref: Ref<ProgressRef>) => {
    const { mode = 'base' } = props;
    const percentage = Math.min(100, Math.max(props.percentage, 0));
    const {
        top,
        percentPosition = 'right',
        className = '',
        style,
        showPercent = mode === 'base',
        renderPercent,
        trackColor,
        progressColor,
        disabled = false,
        trackStroke,
        progressStroke,
        duration = 300,
        step = 1,
        filleted = true,
        mountedTransition = true,
        mountedBezier = [0.34, 0.69, 0.1, 1],
    } = props;
    const domRef = useRef<HTMLDivElement | null>(null);
    const [currentPercentage, transitionControl] = useProgress(
        mountedTransition,
        percentage,
        duration,
        mountedBezier,
        step,
    );
    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));
    function renderText(position?: PercentPosition) {
        if (!showPercent) {
            return null;
        }
        if (position === 'follow') {
            return renderPercent !== void 0 ? (
                renderPercent(currentPercentage)
            ) : (
                <div
                    className={cls('text-follow', {
                        'inner-disabled inner-block-disabled': disabled,
                    })}
                    style={{ background: progressColor }}
                >
                    {currentPercentage}%
                </div>
            );
        }
        if (position === percentPosition) {
            return (
                <div
                    style={{ color: progressColor }}
                    className={cls('text', `text-${percentPosition}`, {
                        'text-disabled':
                            disabled && (percentPosition === 'left' || percentPosition === 'right'),
                    })}
                >
                    {renderPercent !== void 0
                        ? renderPercent(currentPercentage)
                        : `${currentPercentage}%`}
                </div>
            );
        }
        return null;
    }
    function renderBarProgress({ prefixCls }) {
        return (
            <div
                role="progressbar"
                aria-valuenow={percentage}
                aria-valuemax={100}
                aria-valuemin={0}
                className={cls(
                    `${prefixCls}-progress`,
                    { 'progress-fixed': mode === 'nav' },
                    { 'progress-disabled': disabled },
                    className,
                )}
                style={{
                    top,
                    ...style,
                }}
                ref={domRef}
            >
                <div className="progress-wrapper">
                    {renderText('left')}
                    <div
                        style={{
                            background: trackColor,
                            height: trackStroke,
                        }}
                        className={cls(
                            'progress-track',
                            `position-${percentPosition}`,
                            { filleted },
                            { 'nav-mode': mode === 'nav' },
                        )}
                    >
                        <div
                            style={getStyleWithVendor({
                                background: progressColor,
                                width: `${currentPercentage}%`,
                                height: progressStroke,
                                transition: transitionControl
                                    ? `width linear ${duration / 1000}s`
                                    : '',
                            })}
                            className={cls('progress-bar', { 'bar-disabled': disabled, filleted })}
                        >
                            {percentPosition === 'follow' ? (
                                <div className="wrapper">{renderText('follow')}</div>
                            ) : null}
                        </div>
                    </div>
                    {renderText('right')}
                    {renderText('innerLeft')}
                </div>
            </div>
        );
    }
    return <ContextLayout>{renderBarProgress}</ContextLayout>;
});

export default Progress;
