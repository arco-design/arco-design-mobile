import React from 'react';
import { cls } from '@arco-design/mobile-utils';
import { Action } from './type';

interface IProps {
    action: Action;
    prefixCls: string;
    index: number;
    type: 'left' | 'right';
    close: () => void;
}

export default function renderAction({ action, prefixCls, index, type, close }: IProps) {
    const { text, style: actionStyle, className, onClick, icon, children } = action;
    function click() {
        const result = onClick?.() || null;
        if (!result || typeof result === 'boolean') {
            !result && close();
        } else if (result && result.then) {
            result.then(res => !res && close());
        }
    }
    return (
        <div
            className={cls(`${prefixCls}-${type} ${prefixCls}-info-container`, className)}
            style={{
                zIndex: index,
                ...actionStyle,
            }}
            onClick={click}
        >
            {children || (
                <div className={`${prefixCls}-info`}>
                    {icon ? <div className={`${prefixCls}-info-icon`}>{icon}</div> : null}
                    {text ? <div className={`${prefixCls}-info-text`}>{text}</div> : null}
                </div>
            )}
        </div>
    );
}
