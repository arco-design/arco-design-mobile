import type { CSSProperties, ReactElement, ReactNode } from 'react';
import React, { cloneElement, useMemo } from 'react';
import type { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import CSSTransition from 'react-transition-group/CSSTransition';
import { ContextLayout } from '../context-provider';

export type TransitionProps = Omit<CSSTransitionProps, 'timeout'> & {
    /**
     * 待执行动画内容
     * @en Animation content to be executed
     */
    children?: ReactNode;
    /**
     * 待执行动画css类名
     * @en Css classname of the animation to be executed
     */
    type: string;
    /**
     * 内容是否可见
     * @en Whether the content is visible
     */
    in: boolean;
    /**
     * 执行动画时间
     * @en Execute animation time
     */
    timeout: number | { appear?: number; enter?: number; exit?: number };
    /**
     * 是否在打开时再加载内容
     * @en Whether to reload content when it is opened
     * @default true
     */
    mountOnEnter?: boolean;
    /**
     * 是否在退出时卸载内容
     * @en Whether to unmount content on exit
     * @default true
     */
    unmountOnExit?: boolean;
    /**
     * 动画时长变量标识
     * @en Animation duration variable identifier
     * @default type 属性值
     */
    transitionVarType?: string;
};

const DEFAULT_TIMEOUT = 300;

/**
 * react-transition-group/CSSTransition 的简单封装。
 * @en Simple wrapper for react-transition-group/CSSTransition.
 * @type 其他
 * @type_en Others
 * @name 动画过渡
 * @name_en Transition
 */
export default function Transition(props: TransitionProps) {
    const {
        children = <div />,
        type,
        in: transIn,
        timeout = DEFAULT_TIMEOUT,
        mountOnEnter = true,
        unmountOnExit = true,
        transitionVarType,
        ...restProps
    } = props;
    const varPrefix = `builtin-transition-${transitionVarType || type}`;

    // 计算动画时长，支持对象形式的 timeout
    const getDuration = (phase: 'appear' | 'enter' | 'exit') => {
        if (typeof timeout === 'number') {
            return timeout;
        }
        return timeout[phase] || DEFAULT_TIMEOUT;
    };

    // 生成 CSS 变量样式
    const cssVariables = useMemo(() => {
        const enterDuration = getDuration('enter');
        const exitDuration = getDuration('exit');
        const appearDuration = getDuration('appear');

        return {
            [`--${varPrefix}-enter-duration`]: `${enterDuration}ms`,
            [`--${varPrefix}-exit-duration`]: `${exitDuration}ms`,
            [`--${varPrefix}-appear-duration`]: `${appearDuration}ms`,
        } as CSSProperties;
    }, [timeout, varPrefix]);

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <CSSTransition
                    in={transIn}
                    timeout={timeout}
                    classNames={`${prefixCls}-${type}`}
                    mountOnEnter={mountOnEnter}
                    unmountOnExit={unmountOnExit}
                    style={cssVariables}
                    {...restProps}
                >
                    {cloneElement(children as ReactElement, {
                        style: {
                            ...cssVariables,
                            ...(children as ReactElement)?.props?.style,
                        },
                    })}
                </CSSTransition>
            )}
        </ContextLayout>
    );
}
