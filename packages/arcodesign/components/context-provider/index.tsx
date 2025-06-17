import React, {
    createContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
    useRef,
    Attributes,
} from 'react';
import { addCssRules, removeCssStyleDom, defaultLocale, ILocale } from '@arco-design/mobile-utils';
import { CreateRootFnType } from '../_helpers';

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
     * 是否监听系统原生的暗黑模式变化(prefers-color-scheme: dark)以判断是否切为暗黑模式
     * @en Whether to monitor the system's native dark mode changes (prefers-color-scheme: dark) to determine whether to switch to dark mode
     * @default false
     */
    useDarkMode?: boolean;
    /**
     * 是否处于暗黑模式，指定后以指定的值为准
     * @en Whether it is in dark mode, the value shall prevail after being specified
     * @default false
     */
    isDarkMode?: boolean;
    /**
     * 当处于暗黑模式时，body上挂载的类名，为空值时不挂载类名
     * @en When in dark mode, the class name mounted on the body, if it is empty, the class name will not be mounted
     * @default "arco-theme-dark"
     */
    darkModeSelector?: string;
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
    /**
     * 当系统原生暗黑模式发生变化时触发，useDarkMode=true 时有效
     * @en Triggered when the system's native dark mode changes, valid when useDarkMode=true
     */
    onDarkModeChange?: (isDark: boolean) => void;
    /**
     * React19 修改了 createRoot 的引入路径，导致组件内部无法直接引入（低react版本会找不到模块）。因此使用 react 19 的用户需从外部传入 createRoot 方法
     * @en Users using react 19 need to pass in the createRoot method from outside
     */
    createRoot?: CreateRootFnType;
}

const DEFAULT_DARK_MODE_SELECTOR = 'arco-theme-dark';

export const defaultContext: GlobalContextParams = {
    prefixCls: 'arco',
    system: '',
    useDarkMode: false,
    darkModeSelector: DEFAULT_DARK_MODE_SELECTOR,
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
        isDarkMode: userSetIsDarkMode,
        darkModeSelector = DEFAULT_DARK_MODE_SELECTOR,
        theme,
        locale = defaultLocale,
        onDarkModeChange,
        ...restProps
    } = props;

    const [isDarkModeState, setIsDarkModeState] = useState<boolean>(() => {
        if (typeof window !== 'undefined' && useDarkMode) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });
    const mountedRef = useRef(false);

    const setDarkModeState = (isDark: boolean, needChange = true) => {
        setIsDarkModeState(isDark);
        needChange && onDarkModeChange && onDarkModeChange(isDark);
    };

    const isDarkMode = useMemo(() => {
        // 如果未开启暗黑模式则不对body做操作
        // @en If dark mode is not turned on, no operation will be performed on the body
        if (userSetIsDarkMode === void 0 && !useDarkMode) {
            return false;
        }
        const value = Boolean(userSetIsDarkMode !== void 0 ? userSetIsDarkMode : isDarkModeState);
        const needUpdateBody = darkModeSelector && typeof document !== 'undefined';
        if (value) {
            needUpdateBody && document.body.classList.add(darkModeSelector);
        } else {
            needUpdateBody && document.body.classList.remove(darkModeSelector);
        }
        return value;
    }, [userSetIsDarkMode, isDarkModeState, darkModeSelector, useDarkMode]);

    const changeDarkMode = useCallback(
        (res: MediaQueryListEvent) => setDarkModeState(res.matches),
        [],
    );

    useEffect(() => {
        const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
        if (useDarkMode) {
            const dark = matchMedia.matches;
            setDarkModeState(dark, mountedRef.current);
            if (typeof matchMedia.addEventListener === 'function') {
                matchMedia.addEventListener('change', changeDarkMode);
            } else if (typeof matchMedia.addListener === 'function') {
                matchMedia.addListener(changeDarkMode);
            }
        }
        mountedRef.current = true;
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
                isDarkMode,
                useDarkMode,
                locale: locale || defaultLocale,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export const ContextLayout = GlobalContext.Consumer;

export function CompWithGlobalContext<P extends Attributes>(Component: React.FunctionComponent<P>) {
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
