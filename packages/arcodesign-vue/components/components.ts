import badgeDefault from './badge';
import cellDefault from './cell';
import contextProviderDefault from './context-provider';
import notifyDefault from './notify';
import transitionDefault from './transition';

export * from './badge';
export * from './cell';
export * from './context-provider';
export * from './notify';
export * from './transition';

export const allCompInstall = [
    badgeDefault.install,
    cellDefault.install,
    contextProviderDefault.install,
    notifyDefault.install,
    transitionDefault.install,
];
