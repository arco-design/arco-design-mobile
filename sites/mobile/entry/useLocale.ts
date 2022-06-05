import { useState, useEffect } from 'react';
import enUSLocale from '../../../packages/common-widgets/utils/locale/en-US';
import { ILocale } from '../../../packages/common-widgets/utils/locale/type';
import { LanguageLocaleMap, LanguageSupport } from '../../utils/language';

export default function useLocale() {
    const [locale, setLocale] = useState<ILocale | undefined>();

    useEffect(() => {
        const getURLChange = (event: any) => {
            const isEnUS = event.newURL
                .toLowerCase()
                .includes(`/${LanguageLocaleMap[LanguageSupport.EN].toLocaleLowerCase()}`);
            setLocale(isEnUS ? enUSLocale : undefined);
        };
        getURLChange({ newURL: window.location.href });
        window.addEventListener('hashchange', getURLChange);
        return () => {
            window.removeEventListener('hashchange', getURLChange);
        };
    }, []);

    return {
        locale,
        setLocale,
    };
}
