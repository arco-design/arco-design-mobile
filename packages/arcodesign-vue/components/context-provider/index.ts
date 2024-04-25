import ContextProvider from './ContextProvider.vue';
import { installFactory } from '../_helpers/install';

export type * from './type';
export * from './utils';

const install = installFactory(ContextProvider);

export { ContextProvider };

export default {
    install,
};
