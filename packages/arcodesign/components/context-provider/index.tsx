import React, { createContext, useState, useEffect, useCallback } from 'react';
import { addCssRules, removeCssStyleDom, defaultLocale, ILocale } from '@arco-design/mobile-utils';

export interface GlobalContextParams {
    /**
     * 组件类名前缀
     * @en Component classname prefix
     * @default "arco"
     */
    prefixCls?: string;
    /**
     * 手动控制当前所在系统，传入后将直接使用传入的值，ssr场景需指定系统初始值时适用
     * @en Manually control the current system, and the incoming value will be used directly after being passed in. It is applicable when the initial value of the system needs to be specified in the ssr scenario.
     * @default ""
     */
    system?: 'pc' | 'android' | 'ios' | '';
    /**
     * 是否使用暗黑模式
     * @en Whether to use dark mode
     * @default false
     */
    useDarkMode?: boolean;
    /**
     * 是否处于暗黑模式，指定后以指定的值为准
     * @en Whether it is in dark mode
     * @default false
     */
    isDarkMode?: boolean;
    /**
     * 主题变量，传入后将在线替换css变量，需设置less变量 @use-css-vars: 1
     * @en Theme variable. The css variable will be replaced online after input. The less variable needs to be set @use-css-vars: 1
     */
    theme?: Record<string, string>;
    /**
     * 国际化语言包配置
     * @en Internationalized language configuration
     */
    locale?: ILocale;
    /**
     * 是否使用Rtl模式
     * @en Whether to use rtl
     * @default false
     */
    useRtl?: boolean;
}

export const defaultContext: GlobalContextParams = {
    prefixCls: 'arco',
    system: '',
    useDarkMode: false,
    isDarkMode: false,
    locale: defaultLocale,
    useRtl: false,
};

export const GlobalContext = createContext<GlobalContextParams>(defaultContext);

export interface ContextProviderProps extends GlobalContextParams {
    children: React.ReactNode;
}

export type WithGlobalContext<T> = T & { context?: GlobalContextParams };

/**
 * 全局数据控制组件，用于替换全局数据。
 * @en Global data control component, used to replace global data.
 * @type 其他
 * @type_en Others
 * @name 全局配置
 * @name_en ContextProvider
 */
export default function ContextProvider(props: ContextProviderProps) {
    const {
        children,
        useDarkMode,
        isDarkMode,
        theme,
        locale = defaultLocale,
        ...restProps
    } = props;
    const [isDarkModeState, setIsDarkModeState] = useState<boolean>();
    const changeDarkMode = useCallback(
        (res: MediaQueryListEvent) => setIsDarkModeState(res.matches),
        [],
    );

    useEffect(() => {
        const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
        if (useDarkMode) {
            const dark = matchMedia.matches;
            setIsDarkModeState(dark);
            if (typeof matchMedia.addEventListener === 'function') {
                matchMedia.addEventListener('change', changeDarkMode);
            } else if (typeof matchMedia.addListener === 'function') {
                matchMedia.addListener(changeDarkMode);
            }
        }
        return () => {
            if (useDarkMode) {
                if (typeof matchMedia.removeEventListener === 'function') {
                    matchMedia.removeEventListener('change', changeDarkMode);
                } else if (typeof matchMedia.removeListener === 'function') {
                    matchMedia.removeListener(changeDarkMode);
                }
            }
        };
    }, [useDarkMode]);

    useEffect(() => {
        if (!theme) {
            return;
        }
        addCssRules('arcoCustomTheme', theme);
        return () => {
            removeCssStyleDom('arcoCustomTheme');
        };
    }, [theme]);

    return (
        <GlobalContext.Provider
            value={{
                ...defaultContext,
                ...restProps,
                isDarkMode: isDarkMode === void 0 ? isDarkModeState : isDarkMode,
                useDarkMode,
                locale: locale || defaultLocale,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export const ContextLayout = GlobalContext.Consumer;

export function CompWithGlobalContext<P extends JSX.IntrinsicAttributes>(
    Component: React.FunctionComponent<P>,
) {
    return function (props: WithGlobalContext<P>) {
        const { context: propsContext, ...others } = props;
        return (
            <ContextLayout>
                {context => (
                    <ContextProvider {...{ ...context, ...propsContext }}>
                        <Component {...(others as P)} />
                    </ContextProvider>
                )}
            </ContextLayout>
        );
    };
}
