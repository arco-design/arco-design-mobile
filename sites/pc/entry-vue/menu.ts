import chCompRoutes from '../pages-vue/components/index.json';
import enCompRoutes from '../pages-vue/components/index-en-US.json';
import chReadmeRoutes from '../pages-vue/guide/index.json';
import enReadmeRoutes from '../pages-vue/guide/index-en-US.json';
import { LanguageSupport } from '../../utils/language';

export const menuItemsMap = {
    [LanguageSupport.CH]: {
        compRoutes: chCompRoutes,
        readmeRoutes: chReadmeRoutes,
    },
    [LanguageSupport.EN]: {
        compRoutes: enCompRoutes,
        readmeRoutes: enReadmeRoutes,
    },
};
