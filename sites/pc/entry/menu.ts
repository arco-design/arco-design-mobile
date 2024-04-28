import chCompRoutes from '../pages/components/index.json';
import enCompRoutes from '../pages/components/index-en-US.json';
import chReadmeRoutes from '../pages/guide/index.json';
import enReadmeRoutes from '../pages/guide/index-en-US.json';
import enCompositeCompRoutes from '../pages/composite-comp/index.json';
import chResRoutes from '../pages/resource/index.json';
import { LanguageSupport } from '../../utils/language';

export const menuItemsMap = {
    [LanguageSupport.CH]: {
        compRoutes: chCompRoutes,
        readmeRoutes: chReadmeRoutes,
        resRoutes: chResRoutes,
        compositeCompRoutes: enCompositeCompRoutes,
    },
    [LanguageSupport.EN]: {
        compRoutes: enCompRoutes,
        readmeRoutes: enReadmeRoutes,
        resRoutes: chResRoutes,
        compositeCompRoutes: enCompositeCompRoutes,
    },
};
