import { LanguageSupport, LanguageLocaleMap } from './language';

const DOC_PAGE =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:8823/#/'
        : 'https://$siteDomain$/mobile/react/arco-design/pc/#/';
const HOME_PAGE =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:8824'
        : 'https://$siteDomain$/mobile/react';
const RESOURCE_PAGE =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:8823/#/resource/'
        : 'https://$siteDomain$/mobile/react/arco-design/pc/#/resource/';
const MOBILE_PAGE =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:8822/#/'
        : 'https://$siteDomain$/mobile/react/arco-design/mobile/#/';
export const FIGMA_RESOURCE = 'https://www.figma.com/community/file/1143750379727993941';

const DOC_PAGE_VUE =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:8826/vite/pc-vue/#/'
        : 'https://$siteDomain$/mobile/vue/arco-design/pc/#/';
const MOBILE_PAGE_VUE =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:8825/vite/mobile-vue/#/'
        : 'https://$siteDomain$/mobile/vue/arco-design/mobile/#/';

export const getUrlsByLanguage = (language: LanguageSupport, isVue?: boolean) => {
    const languageVal = language === LanguageSupport.CH ? '' : LanguageLocaleMap[language];
    const docPage = isVue ? DOC_PAGE_VUE : DOC_PAGE;
    const mobilePage = isVue ? MOBILE_PAGE_VUE : MOBILE_PAGE;
    return languageVal
        ? {
              HOME: `${HOME_PAGE}?locale=${languageVal}`,
              RESOURCE_PAGE: `${RESOURCE_PAGE}?locale=${languageVal}`,
              DOC_PREFIX: `${docPage}#/${languageVal}/`,
              MOBILE_DOC_PREFIX: `${mobilePage}${languageVal}/`,
              DOC_SITE: `${docPage}#/${languageVal}/`,
              MOBILE_DOC_SITE: `${mobilePage}#/${languageVal}/`,
          }
        : {
              HOME: HOME_PAGE,
              RESOURCE_PAGE,
              DOC_PREFIX: docPage,
              MOBILE_DOC_PREFIX: mobilePage,
              DOC_SITE: docPage,
              MOBILE_DOC_SITE: mobilePage,
          };
};

export const getPathname = (pathname: string) => {
    if (pathname.indexOf('/resource') === 0) {
        return 'resource';
    }
    return '/';
};
