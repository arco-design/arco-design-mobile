import { App } from 'vue';
import Badge from './Badge.vue';
import { getComponentPrefix, ContextInstallOptions } from '../context-provider';

const install = (app: App, options?: ContextInstallOptions) => {
    const componentPrefix = getComponentPrefix(options);
    app.component(componentPrefix + Badge.__name, Badge);
};

export { Badge };

export default {
    install,
};
