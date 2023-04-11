import { useState, useEffect, useMemo } from 'react';
import tokens from '../../../packages/arcodesign/tokens/app/arcodesign/default';

export default function useTheme() {
    const [customTheme, setCustomTheme] = useState<Record<string, string>>({});
    const actualTokens = useMemo(() => ({ ...tokens, ...customTheme }), [customTheme]);

    const theme = useMemo(
        () =>
            Object.keys(actualTokens).reduce(
                (acc, key) => ({
                    ...acc,
                    ...(key.startsWith('dark-') ? {} : { [key]: actualTokens[key] }),
                }),
                {},
            ),
        [actualTokens],
    );

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
        theme,
        setCustomTheme,
    };
}
