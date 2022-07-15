import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import QRCode from 'qrcode';
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
    const [codeUrl, setCodeUrl] = useState('');

    const updatePosition = useCallback(() => {
        const rect = domRef.current?.getBoundingClientRect();
        const { left = 0, width = 0, bottom = 0 } = rect || {};
        setPosition([left + width / 2, bottom]);
    }, []);

    useEffect(() => {
        if (url) {
            QRCode.toDataURL(url, { margin: 1 }, (err, newUrl) => {
                err && console.error(err);
                setCodeUrl(newUrl || '');
            });
        }
    }, [url]);

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
                        {codeUrl ? <img className="code" src={codeUrl} /> : null}
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
