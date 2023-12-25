import { useEffect, useState, useRef } from 'react';

export default function useMode(isMobile?: boolean) {
    const storageKey = 'arco_website_mode';
    const [mode, setMode] = useState<'light' | 'dark'>(
        () => (window.localStorage.getItem(storageKey) as 'light' | 'dark') || 'light',
    );
    const modeRef = useRef(mode);

    useEffect(() => {
        window.localStorage.setItem(storageKey, mode);
        modeRef.current = mode;
        if (!isMobile) {
            if (mode === 'dark') {
                document.body.setAttribute('arco-theme', 'dark');
            } else {
                document.body.removeAttribute('arco-theme');
            }
            const iframeDom = document.getElementById('mobile-iframe') as HTMLIFrameElement | null;
            if (iframeDom && iframeDom.contentWindow) {
                iframeDom.contentWindow.postMessage({ mode }, '*');
            }
        }
    }, [mode]);

    useEffect(() => {
        if (!isMobile) {
            return;
        }
        const handler = e => {
            if (e.data && e.data.mode) {
                setMode(e.data.mode);
            }
        };
        window.addEventListener('message', handler);
        return () => {
            window.removeEventListener('message', handler);
        };
    }, [isMobile]);

    return {
        mode,
        setMode,
        modeRef,
    };
}
