import React from 'react';
import CSSTransition, { CSSTransitionProps } from 'react-transition-group/CSSTransition';
import { ContextLayout } from '../context-provider';

export type TransitionProps = Omit<CSSTransitionProps, 'timeout'> & {
    /**
     * 待执行动画内容
     * @en Animation content to be executed
     */
    children?: React.ReactNode;
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
};

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
        timeout = 300,
        mountOnEnter = true,
        unmountOnExit = true,
        ...restProps
    } = props;

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <CSSTransition
                    in={transIn}
                    timeout={timeout}
                    classNames={`${prefixCls}-${type}`}
                    mountOnEnter={mountOnEnter}
                    unmountOnExit={unmountOnExit}
                    {...restProps}
                >
                    {children}
                </CSSTransition>
            )}
        </ContextLayout>
    );
}
