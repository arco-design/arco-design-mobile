import React, { forwardRef, Ref, useContext, useImperativeHandle, useRef } from 'react';
import { cls } from '@arco-design/mobile-utils';
import { TabBarItemProps, TabBarItemRef } from './type';
import { ContextLayout } from '../context-provider';
import { TabBarContext } from './tab-bar';

export const Item = forwardRef((props: TabBarItemProps, ref: Ref<TabBarItemRef>) => {
    const { active, changeIndex, index, activeCustomStyle } = useContext(TabBarContext);
    const { onClick, className, style } = props;
    const domRef = useRef<HTMLDivElement | null>(null);
    function renderContent(prefixCls: string | undefined) {
        const iconElm = props.icon ? (
            <div className={cls(`${prefixCls}-tab-bar-item-icon`)}>
                {typeof props.icon === 'function' ? props.icon(active) : props.icon}
            </div>
        ) : null;
        const titleElm = props.title ? (
            <div
                className={cls(`${prefixCls}-tab-bar-item-title`, {
                    [`${prefixCls}-tab-bar-item-only-title`]: !iconElm,
                })}
            >
                {typeof props.title === 'function' ? props.title(active) : props.title}
            </div>
        ) : null;
        const extraElm =
            props.extra && typeof props.extra === 'function' ? props.extra(active) : props.extra;
        const childElm = props.child && (
            <div className={cls(`${prefixCls}-tab-bar-item-children`)}>
                {typeof props.child === 'function' ? props.child(active) : props.child}
            </div>
        );
        const extraWrap =
            iconElm || extraElm ? (
                <div className={cls(`${prefixCls}-extra-wrap`)}>
                    {iconElm}
                    {extraElm}
                </div>
            ) : null;
        return (
            childElm || (
                <>
                    {extraWrap}
                    {titleElm}
                </>
            )
        );
    }
    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));
    const handleClick = e => {
        onClick?.(e);
        changeIndex(index);
    };
    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <div
                    className={cls(
                        `${prefixCls}-tab-bar-item`,
                        { [`${prefixCls}-tab-bar-item-active`]: active },
                        className,
                    )}
                    style={{ ...style, ...(active ? activeCustomStyle : {}) }}
                    ref={domRef}
                    onClick={e => handleClick(e)}
                >
                    {renderContent(prefixCls)}
                </div>
            )}
        </ContextLayout>
    );
});
