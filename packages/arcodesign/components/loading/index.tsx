import React, { useState, useEffect, useRef, forwardRef, Ref, useImperativeHandle } from 'react';
import { cls, isOneOf } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import { getStyleWithVendor, useGenSvgKey } from '../_helpers';

export type LoadingType = 'spin' | 'circle' | 'arc' | 'dot';

export interface LoadingProps {
    /**
     * 自定义样式
     * @en Custom stylesheet
     */
    style?: React.CSSProperties;
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 主颜色，如果想使用 css 控制主颜色，可使用公共 mixin `.set-loading-color(@color)`
     * @en The main color, if you want to use css to control the main color, you can use the public mixin `.set-loading-color(@color)`
     */
    color?: string;
    /**
     * loading类型
     * @en Loading type
     * @default "dot"
     */
    type?: LoadingType;
    /**
     * 当类型为`dot`或`spin`时有效，定义内部各元素的透明度
     * @en Valid when the type is `dot` or `spin`, defines the transparency of each element inside
     */
    list?: number[];
    /**
     * 一次loading周期的毫秒数
     * @en A loading cycle in millisecond
     * @default 1000
     */
    duration?: number;
    /**
     * 区分不同loading组件间的`<def>`内容
     * @en Distinguish the `<def>` content of different svg
     */
    svgKey?: string;
    /**
     * 圆圈半径，类型为`circle`或`arc`时可用
     * @en Circle radius, available when type is `circle` or `arc`
     * @default 9
     */
    radius?: number;
    /**
     * 圆圈描边宽度，类型为`circle`或`arc`或`spin`时可用
     * @en Circle stroke width, available when type is `circle` or `arc` or `spin`
     * @default 2
     */
    stroke?: number;
    /**
     * 边缘是否为圆角
     * @en Whether the edges are rounded
     * @default true
     */
    filleted?: boolean;
}

export interface LoadingRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
}

/**
 * 加载中组件，分为四种类型，`circle`为环形，`arc`为弧线，`spin`为旋转，`dot`为圆点。所有类型均可定制颜色，环形和弧线类型可定制线圈半径及粗细，旋转和圆点类型可定制内部元素透明度。
 * @en Loading component, divided into four types, `circle` is a ring, `arc` is an arc `spin` is a rotation, and `dot` is a dot. All types can be customized in color, ring and arc types can be customized with coil radius and thickness, and rotation and dot types can be customized with internal element transparency.
 * @type 反馈
 * @type_en Feedback
 * @name 加载
 * @name_en Loading
 */
const Loading = forwardRef((props: LoadingProps, ref: Ref<LoadingRef>) => {
    const {
        style,
        className = '',
        color,
        type = 'dot',
        list,
        duration = 1000,
        svgKey: userSetSvgKey = '',
        radius = 9,
        stroke = 2,
        filleted = true,
    } = props;
    const [statusList, setStatusList] = useState<number[]>([]);
    const timerId = useRef(-1);
    const halfCircle = Math.PI * radius;
    const circlePos = 0.5 * stroke + radius;
    const circleSize = radius * 2 + stroke;
    const domRef = useRef<HTMLDivElement | null>(null);
    const { svgKey } = useGenSvgKey(userSetSvgKey);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    useEffect(() => {
        if (type === 'dot' && statusList.length) {
            const interval = duration / statusList.length;
            timerId.current = setInterval(
                (() => {
                    const newList = [...statusList];
                    const item = newList.pop();
                    item && newList.unshift(item);
                    setStatusList(newList);
                }) as TimerHandler,
                interval,
            );
        }
        return () => {
            if (timerId.current >= 0) {
                clearInterval(timerId.current);
            }
        };
    }, [type, statusList, duration]);

    useEffect(() => {
        let newList;
        if (list && list.length) {
            newList = list;
        } else {
            switch (type) {
                case 'spin':
                    newList = [1, 0.1, 0.2286, 0.3572, 0.4858, 0.6144, 0.743, 0.8716];
                    break;
                case 'dot':
                    newList = [0.2, 0.6, 1];
                    break;
                default:
                    newList = [];
                    break;
            }
        }
        setStatusList(newList);
    }, [list, type]);

    function renderSpin() {
        const len = statusList.length;
        return statusList.map((opacity, index) => (
            <span
                key={index}
                className="spin-cell"
                style={getStyleWithVendor({
                    opacity,
                    transform: `rotate(${index / len}turn)`,
                    width: stroke,
                })}
            >
                <span
                    className="spin-cell-inner bg-color-with-config"
                    style={{
                        backgroundColor: color,
                        ...(filleted ? { borderRadius: stroke } : {}),
                    }}
                />
            </span>
        ));
    }

    function renderDot() {
        return statusList.map((opacity, index) => (
            <span
                key={index}
                className={cls('dot-cell', 'bg-color-with-config', { filleted })}
                style={{ opacity, backgroundColor: color }}
            />
        ));
    }

    function renderCircle() {
        return (
            <svg viewBox={`0 0 ${circleSize} ${circleSize}`}>
                <defs>
                    <linearGradient id={`grad1-${svgKey}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop
                            offset="0%"
                            className="loading-circle-middle stop-color-with-config"
                            style={{ stopColor: color }}
                        />
                        <stop
                            offset="100%"
                            className="loading-circle-start stop-color-with-config"
                            style={{ stopColor: color }}
                        />
                    </linearGradient>
                    <linearGradient id={`grad2-${svgKey}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop
                            offset="0%"
                            className="loading-circle-middle stop-color-with-config"
                            style={{ stopColor: color }}
                        />
                        <stop
                            offset="100%"
                            className="loading-circle-end stop-color-with-config"
                            style={{ stopColor: color }}
                        />
                    </linearGradient>
                </defs>
                <circle
                    cx={circlePos}
                    cy={circlePos}
                    r={radius}
                    stroke={`url(#grad1-${svgKey})`}
                    strokeWidth={stroke}
                    strokeDasharray={halfCircle}
                    strokeDashoffset={halfCircle}
                    fill="none"
                />
                <circle
                    cx={circlePos}
                    cy={circlePos}
                    r={radius}
                    stroke={`url(#grad2-${svgKey})`}
                    strokeWidth={stroke}
                    strokeDasharray={halfCircle}
                    fill="none"
                />
                {filleted ? (
                    <circle
                        cx={circlePos * 2 - stroke / 2}
                        cy={circlePos}
                        r={stroke / 2}
                        className="loading-circle-filleted fill-color-with-config"
                        style={{ fill: color }}
                    />
                ) : null}
            </svg>
        );
    }

    function renderArc() {
        return (
            <svg viewBox={`0 0 ${circleSize} ${circleSize}`}>
                <circle
                    className="arc-bg"
                    cx={circlePos}
                    cy={circlePos}
                    r={radius}
                    strokeWidth={stroke}
                    fill="none"
                />
                <circle
                    className="arc-line stroke-color-with-config"
                    cx={circlePos}
                    cy={circlePos}
                    r={radius}
                    style={{ stroke: color }}
                    strokeWidth={stroke}
                    strokeDashoffset={halfCircle * 0.5}
                    strokeDasharray={`${halfCircle * 0.5} ${halfCircle * 1.5}`}
                    fill="none"
                    {...(filleted ? { strokeLinecap: 'round' } : {})}
                />
            </svg>
        );
    }

    function renderLoadingByType() {
        switch (type) {
            case 'spin':
                return renderSpin();
            case 'dot':
                return renderDot();
            case 'circle':
                return renderCircle();
            case 'arc':
                return renderArc();
            default:
                return null;
        }
    }

    function getLoadingStyle(): React.CSSProperties {
        const circleStyle = isOneOf(type, ['circle', 'arc'])
            ? {
                  width: circleSize,
                  height: circleSize,
              }
            : {};
        return getStyleWithVendor({
            animationDuration: `${duration}ms`,
            ...circleStyle,
            ...(style || {}),
        });
    }

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <div
                    className={cls(`${prefixCls}-loading all-border-box`, type, className)}
                    style={getLoadingStyle()}
                    ref={domRef}
                >
                    {renderLoadingByType()}
                </div>
            )}
        </ContextLayout>
    );
});

export default Loading;
