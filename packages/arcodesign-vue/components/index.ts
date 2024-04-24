import { App } from 'vue';
import { ContextInstallOptions, getComponentPrefix } from './context-provider';
import { components } from './components';

export * from './components';

const install = (app: App, options?: ContextInstallOptions) => {
    const componentPrefix = getComponentPrefix(options);
    const allComps = Object.values(components);
    allComps.forEach(comp => {
        app.component(componentPrefix + comp.__name, comp);
    });
};

export default {
    ...components,
    install,
};
