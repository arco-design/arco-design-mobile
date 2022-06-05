import { useState, useEffect } from 'react';

export default function useTheme() {
    const [customTheme, setCustomTheme] = useState<Record<string, string>>({});

    useEffect(() => {
        const handler = e => {
            if (e.data && e.data.theme) {
                setCustomTheme(e.data.theme);
            }
        };
        window.addEventListener('message', handler);
        return () => {
            window.removeEventListener('message', handler);
        };
    }, []);

    return {
        customTheme,
        setCustomTheme,
    };
}