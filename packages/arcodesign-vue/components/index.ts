import { App } from 'vue';
import { ContextInstallOptions } from './context-provider';
import { allCompInstall } from './components';

export * from './components';

const install = (app: App, options?: ContextInstallOptions) => {
    allCompInstall.forEach(compInstall => {
        compInstall(app, options);
    });
};

export default {
    install,
};
