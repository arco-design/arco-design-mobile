import type { App } from 'vue';
import { ContextInstallOptions, getComponentPrefix } from '../context-provider';

export function installFactory<T extends { __name?: string }>(...comps: T[]) {
    return (app: App, options?: ContextInstallOptions) => {
        const componentPrefix = getComponentPrefix(options);
        comps.forEach(Comp => {
            app.component(componentPrefix + Comp.__name, Comp);
        });
    };
}
