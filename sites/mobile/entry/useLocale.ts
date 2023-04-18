import { useState, useEffect } from 'react';
import enUSLocale from '../../../packages/common-widgets/utils/locale/en-US';
import { ILocale } from '../../../packages/common-widgets/utils/locale/type';
import { showGA } from '../../utils/ga';
import { LanguageLocaleMap, LanguageSupport } from '../../utils/language';

export default function useLocale() {
    const [locale, setLocale] = useState<ILocale | undefined>();
    const getURLChange = (event: any) => {
        const isEnUS = event.newURL
            .toLowerCase()
            .includes(`/${LanguageLocaleMap[LanguageSupport.EN].toLocaleLowerCase()}`);
        setLocale(isEnUS ? enUSLocale : undefined);
    };
    useEffect(() => {
        getURLChange({ newURL: window.location.href });

        const onHashChange = () => {
            getURLChange({ newURL: window.location.href });
            showGA();
        };
        window.addEventListener('hashchange', onHashChange);
        return () => {
            window.removeEventListener('hashchange', onHashChange);
        };
    }, []);

    return {
        locale,
        setLocale,
    };
}
