import type { App } from 'vue';
import { ContextInstallOptions, getComponentPrefix } from '../context-provider';

export function installFactory<T extends { __name?: string }>(Comp: T) {
    return (app: App, options?: ContextInstallOptions) => {
        const componentPrefix = getComponentPrefix(options);
        app.component(componentPrefix + Comp.__name, Comp);
    };
}
