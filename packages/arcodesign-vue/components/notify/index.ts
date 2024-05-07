import type { App } from 'vue';
import { componentWrapper } from '@arco-design/mobile-utils';
import _Notify from './Notify.vue';
import { ContextInstallOptions, getComponentPrefix } from '../context-provider';
import { makeNotify } from './methods';

const install = (app: App, options?: ContextInstallOptions) => {
    const componentPrefix = getComponentPrefix(options);
    app.component(componentPrefix + _Notify.__name, _Notify);
    app.config.globalProperties.$notifyInfo = makeNotify('info', app._context);
    app.config.globalProperties.$notifySuccess = makeNotify('success', app._context);
    app.config.globalProperties.$notifyWarning = makeNotify('warning', app._context);
    app.config.globalProperties.$notifyError = makeNotify('error', app._context);
};

const Notify = componentWrapper(_Notify, {
    info: makeNotify('info'),
    success: makeNotify('success'),
    warning: makeNotify('warning'),
    error: makeNotify('error'),
});

export { Notify };

export default {
    install,
};
