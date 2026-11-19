import type { Ref } from 'react';
import React, { useRef, forwardRef, useImperativeHandle, useState } from 'react';
import { cls } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import Arrow from './arrow';
import { GroupContext } from './group';
import type { CellProps, CellRef } from './type';

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
        clickable = false,
    } = props;
    const domRef = useRef<HTMLDivElement | null>(null);
    const [isPressed, setIsPressed] = useState(false);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));

    const handleTouchStart = () => {
        if (clickable) {
            setIsPressed(true);
        }
    };

    const handleTouchEnd = () => {
        if (clickable) {
            setIsPressed(false);
        }
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (onClick) {
            onClick(e);
        }
    };

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <GroupContext.Consumer>
                    {({ isFromGroup }) => (
                        <div
                            className={cls(
                                `${prefixCls}-cell`,
                                'all-border-box',
                                { bordered },
                                { 'without-group': !isFromGroup },
                                { [`${prefixCls}-cell-without-group`]: !isFromGroup },
                                { [`${prefixCls}-cell-clickable`]: clickable },
                                { [`${prefixCls}-cell-pressed`]: isPressed },
                                className,
                            )}
                            style={style}
                            ref={domRef}
                            onClick={handleClick}
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                            onTouchCancel={handleTouchEnd}
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
