import { nextTick } from '@arco-design/mobile-utils';
import React, { useEffect, useState } from 'react';

interface CancelButtonProps {
    className: string;
    onCancel?: () => void;
    focusing: boolean;
    currentInputValue: string;
    text?: string;
}

export function CancelButton(props: CancelButtonProps) {
    const { className, onCancel, focusing, currentInputValue, text } = props;
    const [visible, setVisible] = useState(focusing || Boolean(currentInputValue));

    const handleClick = () => {
        onCancel?.();
        // 如果不延迟，在聚焦切输入框有值的情况下，点击取消按钮会造成闪烁
        // @en If there is no delay, when the focus cut input box has a value, clicking the cancel button will cause flickering
        nextTick(() => {
            setVisible(false);
        });
    };

    useEffect(() => {
        setVisible(focusing || Boolean(currentInputValue));
    }, [focusing, currentInputValue]);

    return visible ? (
        <span className={className} onClick={handleClick}>
            {text}
        </span>
    ) : null;
}
