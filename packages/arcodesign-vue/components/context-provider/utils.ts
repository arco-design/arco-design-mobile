import { InjectionKey, inject } from 'vue';
import { ContextInstallOptions, GlobalContextParams } from './type';

export const defaultInstallOptions: Required<ContextInstallOptions> = {
    componentPrefix: 'Arco',
};

export const defaultContext: Required<GlobalContextParams> = {
    prefixCls: 'arco',
};

export const configProviderInjectionKey: InjectionKey<GlobalContextParams> =
    Symbol('ArcoContextProvider');

export function getComponentPrefix(options?: ContextInstallOptions) {
    return options?.componentPrefix || defaultInstallOptions.componentPrefix;
}

export function getPrefixCls(componentName?: string) {
    const contextProvider = inject(configProviderInjectionKey, defaultContext);
    const prefix = contextProvider.prefixCls;
    if (componentName) {
        return `${prefix}-${componentName}`;
    }
    return prefix;
}
