import { App } from 'vue';
import ConfigProvider from './ContextProvider.vue';
import type { ContextInstallOptions } from './type';
import { getComponentPrefix } from './utils';

export type * from './type';
export * from './utils';

const install = (app: App, options?: ContextInstallOptions) => {
    const componentPrefix = getComponentPrefix(options);
    app.component(componentPrefix + ConfigProvider.__name, ConfigProvider);
};

export { ConfigProvider };

export default {
    install,
};
