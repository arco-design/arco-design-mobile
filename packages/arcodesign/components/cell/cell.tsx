import React, { useRef, forwardRef, Ref, useImperativeHandle } from 'react';
import { cls } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import Arrow from './arrow';
import { GroupContext } from './group';
import { CellProps, CellRef } from './type';

export const Cell = forwardRef((props: CellProps, ref: Ref<CellRef>) => {
    const {
        className = '',
        style,
        icon,
        label,
        desc,
        text,
        children,
        showArrow,
        arrow,
        prepend,
        append,
        bordered = true,
        onClick,
    } = props;
    const domRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <GroupContext.Consumer>
                    {({ isFromGroup }) => (
                        <div
                            className={cls(
                                `${prefixCls}-cell`,
                                'all-border-box',
                                { 'without-group': !isFromGroup },
                                { bordered },
                                className,
                            )}
                            style={style}
                            ref={domRef}
                            onClick={e => onClick && onClick(e)}
                        >
                            {prepend}
                            <div className={cls(`${prefixCls}-cell-inner`, { 'has-desc': desc })}>
                                {icon ? <div className="cell-label-icon">{icon}</div> : null}
                                {label || desc ? (
                                    <div className="cell-label">
                                        <div className="cell-title">{label}</div>
                                        {desc ? <div className="cell-desc">{desc}</div> : null}
                                    </div>
                                ) : null}
                                <div className={`cell-content ${label || desc ? 'has-label' : ''}`}>
                                    {text ? <div className="cell-text">{text}</div> : null}
                                    {children}
                                </div>
                                {showArrow ? (
                                    <div className="cell-arrow-icon">{arrow || <Arrow />}</div>
                                ) : null}
                            </div>
                            {append}
                        </div>
                    )}
                </GroupContext.Consumer>
            )}
        </ContextLayout>
    );
});
