import { createContext, useEffect, useRef, useState } from "react";
import { LanguageSupport } from "../../utils/language";

export function useRefState<T>(
    initialValue: T | (() => T),
): [T, React.MutableRefObject<T>, React.Dispatch<React.SetStateAction<T>>] {
    const [state, setState] = useState<T>(initialValue);
    const stateRef = useRef<T>(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);
    return [state, stateRef, setState];
}

export function isMobileBrowser() {
    return !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/);
}
interface GlobalContextParams {
    language: LanguageSupport;
    isMobile: boolean;
}

const defaultContext = {
    language: LanguageSupport.CH,
    isMobile: false
};

export const GlobalContext = createContext<GlobalContextParams>(defaultContext);


export const LanguageNameMap = {
    [LanguageSupport.CH]: '简体中文',
    [LanguageSupport.EN]: 'English'
}
export const LanguageLocaleMap = {
    [LanguageSupport.CH]: 'zh-CN',
    [LanguageSupport.EN]: 'en-US'
}
