import { LanguageSupport, LanguageLocaleMap } from './language';

const DOC_PAGE =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:8823/#/'
        : 'https://arco.design/mobile/react/arco-design/pc/#/';
const HOME_PAGE =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:8824'
        : 'https://arco.design/mobile/react';
const MOBILE_PAGE =
    process.env.NODE_ENV === 'development'
        ? 'http://localhost:8822/#/'
        : 'https://arco.design/mobile/react/arco-design/mobile/#/';

export const FIGMA_RESOURCE =
    'https://www.figma.com/file/hXylPuOK09Lm2GpS8IsTrh/Arco-Design-Mobile?node-id=1%3A21603';

export const getUrlsByLanguage = (language: LanguageSupport) => {
    const languageVal = language === LanguageSupport.CH ? '' : LanguageLocaleMap[language];
    return languageVal
        ? {
              HOME: `${HOME_PAGE}?locale=${languageVal}`,
              DOC_PREFIX: `${DOC_PAGE}#/${languageVal}/`,
              MOBILE_DOC_PREFIX: `${MOBILE_PAGE}${languageVal}/`,
              DOC_SITE: `${DOC_PAGE}#/${languageVal}/`,
              MOBILE_DOC_SITE: `${MOBILE_PAGE}#/${languageVal}/`,
          }
        : {
              HOME: HOME_PAGE,
              DOC_PREFIX: DOC_PAGE,
              MOBILE_DOC_PREFIX: MOBILE_PAGE,
              DOC_SITE: DOC_PAGE,
              MOBILE_DOC_SITE: MOBILE_PAGE,
          };
};
