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

export const getUrlsByLanguage = (language: LanguageSupport) => {
    const languageVal = language === LanguageSupport.CH ? '' : LanguageLocaleMap[language];
    return languageVal
        ? {
              HOME: `${HOME_PAGE}?locale=${languageVal}`,
              RESOURCE_PAGE: `${RESOURCE_PAGE}?locale=${languageVal}`,
              DOC_PREFIX: `${DOC_PAGE}#/${languageVal}/`,
              MOBILE_DOC_PREFIX: `${MOBILE_PAGE}${languageVal}/`,
              DOC_SITE: `${DOC_PAGE}#/${languageVal}/`,
              MOBILE_DOC_SITE: `${MOBILE_PAGE}#/${languageVal}/`,
          }
        : {
              HOME: HOME_PAGE,
              RESOURCE_PAGE,
              DOC_PREFIX: DOC_PAGE,
              MOBILE_DOC_PREFIX: MOBILE_PAGE,
              DOC_SITE: DOC_PAGE,
              MOBILE_DOC_SITE: MOBILE_PAGE,
          };
};

export const getPathname = (pathname: string) => {
    if (pathname.indexOf('/resource') === 0) {
        return 'resource';
    }
    return '/';
};
