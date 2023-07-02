import React, { useRef, forwardRef, Ref, useImperativeHandle, ReactNode } from 'react';
import { cls } from '@arco-design/mobile-utils';
import Transition from '../transition';
import { ContextLayout } from '../context-provider';

export interface BadgeProps {
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
     * 是否展示徽标，visible切换时有动画过渡
     * @en Whether to display the badge, there is an animation transition when the visible status switch
     * @default true
     */
    visible?: boolean;
    /**
     * 徽标文案
     * @en badge text
     */
    text?: string | number;
    /**
     * 显示为一个小红点
     * @en show as a red dot
     * @default false
     */
    dot?: boolean;
    /**
     * 最大完整展示数字，超出后将展示 +
     * @en Maximum full impression number, it will be displayed "+" beyond the number
     * @default 99
     */
    maxCount?: number;
    /**
     * 内容
     * @en Badge content
     */
    children?: ReactNode;
    /**
     * 是否置于右上角
     * @en Whether the badge is placed in the upper right corner
     * @default false
     */
    absolute?: boolean;
    /**
     * 是否有白色边框
     * @en Whether the badge has a white border
     * @default false
     */
    bordered?: boolean;
    /**
     * 动画持续时间(ms)
     * @en Animation duration(ms)
     * @default 300
     */
    timeout?: number | { appear?: number; enter?: number; exit?: number };
}

export interface BadgeRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
}

/**
 * 在右上角展示徽标数字或小红点
 * @en Display the badge number or small red dot in the upper right corner
 * @type 信息展示
 * @type_en Data Display
 * @name 徽标
 * @name_en Badge
 */
const Badge = forwardRef((props: BadgeProps, ref: Ref<BadgeRef>) => {
    const {
        className = '',
        style = {},
        visible = true,
        text,
        dot = false,
        maxCount = 99,
        children = null,
        absolute = false,
        bordered = false,
        timeout = 300,
    } = props;
    const domRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));
    function renderInnerBadge(prefix: string) {
        return dot ? null : (
            <span className={`${prefix}-text badge-text`}>
                {Number(text) && Number(text) > maxCount ? `${maxCount}+` : text}
            </span>
        );
    }
    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <Transition in={visible} timeout={timeout} type="scale" nodeRef={domRef}>
                    <div
                        className={cls(`${prefixCls}-badge`, className, {
                            [`${prefixCls}-badge-dot dot`]: dot,
                            [`${prefixCls}-badge-bordered bordered`]: bordered,
                            [`${prefixCls}-badge-absolute absolute`]: absolute,
                        })}
                        style={style}
                        ref={domRef}
                    >
                        {children || renderInnerBadge(`${prefixCls}-badge`)}
                    </div>
                </Transition>
            )}
        </ContextLayout>
    );
});

export default Badge;
