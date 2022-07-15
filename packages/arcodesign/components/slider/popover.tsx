import React, { useContext, ReactNode } from 'react';
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

    return (
        <div className={`${prefixCls}-slider-popover-wrapper`}>
            <Transition in={visible} timeout={300} type="fade" mountOnEnter>
                <div className={`${prefixCls}-slider-popover${content ? '' : ' no-content'}`}>
                    <div className={`${prefixCls}-slider-popover-content`}>{content}</div>
                    <div className={`${prefixCls}-slider-popover-arrow`} />
                </div>
            </Transition>
            {children}
        </div>
    );
}
