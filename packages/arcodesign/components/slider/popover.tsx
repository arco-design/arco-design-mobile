import React, { useContext, ReactNode, useRef } from 'react';
import Transition from '../transition';
import { GlobalContext } from '../context-provider';

export function Popover({
    visible,
    content,
    children,
}: {
    visible: boolean;
    content: ReactNode;
    children: ReactNode;
}) {
    const { prefixCls = '' } = useContext(GlobalContext);
    const domRef = useRef<HTMLDivElement | null>(null);

    return (
        <div className={`${prefixCls}-slider-popover-wrapper`}>
            <Transition
                in={visible}
                timeout={300}
                type="fade"
                mountOnEnter
                unmountOnExit
                nodeRef={domRef}
            >
                <div
                    className={`${prefixCls}-slider-popover${content ? '' : ' no-content'}`}
                    ref={domRef}
                >
                    <div className={`${prefixCls}-slider-popover-content`}>{content}</div>
                    <div className={`${prefixCls}-slider-popover-arrow`} />
                </div>
            </Transition>
            {children}
        </div>
    );
}
