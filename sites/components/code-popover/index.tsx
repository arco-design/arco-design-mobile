import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { QRCodeCanvas } from 'qrcode.react';
import './index.less';

export interface CodePopoverProps {
    url: string;
    text?: React.ReactNode;
    className?: string;
    popoverClass?: string;
}

export default function CodePopover(props: PropsWithChildren<CodePopoverProps>) {
    const { url, text, children, className = '', popoverClass = '' } = props;
    const domRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState<[number, number]>([0, 0]);
    const [visible, setVisible] = useState(false);

    const updatePosition = useCallback(() => {
        const rect = domRef.current?.getBoundingClientRect();
        const { left = 0, width = 0, bottom = 0 } = rect || {};
        setPosition([left + width / 2, bottom]);
    }, []);

    useEffect(() => {
        if (visible) {
            updatePosition();
            window.addEventListener('scroll', updatePosition);
        }
        return () => {
            if (visible) {
                window.removeEventListener('scroll', updatePosition);
            }
        };
    }, [visible]);

    function renderPopover() {
        return ReactDOM.createPortal(
            visible ? (
                <div
                    className={`home-code-popover ${popoverClass}`}
                    style={{ left: position[0], top: position[1] }}
                >
                    <div className="home-code-popover-content">
                        {text}
                        {url && <QRCodeCanvas value={url} className="code" />}
                    </div>
                </div>
            ) : null,
            document.body,
        );
    }
    return (
        <div
            className={`home-code-popover-inner ${className}`}
            ref={domRef}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            {children}
            {renderPopover()}
        </div>
    );
}
