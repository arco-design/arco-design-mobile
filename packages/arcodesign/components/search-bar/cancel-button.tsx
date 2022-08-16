import { nextTick } from '@arco-design/mobile-utils';
import React, { useEffect, useState } from 'react';
import { SEARCH_BAR_CANCEL_BTN_TEXT } from './constant';

interface CancelButtonProps {
    className: string;
    onCancel?: () => void;
    focusing: boolean;
    currentInputValue: string;
}

export function CancelButton(props: CancelButtonProps) {
    const { className, onCancel, focusing, currentInputValue } = props;
    const [visible, setVisible] = useState(focusing || Boolean(currentInputValue));

    const handleClick = () => {
        onCancel?.();
        // 不延迟，在聚焦切输入框有值的情况下，点击取消按钮会造成闪烁
        nextTick(() => {
            setVisible(false);
        });
    };

    useEffect(() => {
        setVisible(focusing || Boolean(currentInputValue));
    }, [focusing, currentInputValue]);

    return visible ? (
        <span className={className} onClick={handleClick}>
            {SEARCH_BAR_CANCEL_BTN_TEXT}
        </span>
    ) : null;
}
