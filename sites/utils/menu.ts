import { LanguageSupport, commonLocaleMap } from './language';

export const menuOrderKey = [
    'General',
    'Layout',
    'DataDisplay',
    'DataEntry',
    'FeedBack',
    'Navigation',
];

export const getMenuOrder = (
    routes: Record<string, { name: string; key: string }[]>,
    language: LanguageSupport = LanguageSupport.CH,
    langCompositeRoutes?: any[],
) => {
    const othersKey = commonLocaleMap.Others[language];
    const newRoutes: Record<string, { name: string; key: string }[]> = {};
    menuOrderKey.map(key => {
        const curKey = commonLocaleMap[key][language];
        if (curKey in routes) {
            newRoutes[curKey] = routes[curKey];
        }
    });
    Object.keys(routes).map(key => {
        if (!(key in newRoutes)) {
            newRoutes[key] = routes[key];
        }
    });
    if (othersKey in newRoutes) {
        // 将[其他]类型组件放到最后
        const other = newRoutes[othersKey];
        delete newRoutes[othersKey];
        newRoutes[othersKey] = other;
    }
    // 渲染【复合组件】部分
    if (langCompositeRoutes) {
        const compositeKey = commonLocaleMap.CompositeComp[language];
        newRoutes[compositeKey] = langCompositeRoutes;
    }
    return newRoutes;
};
