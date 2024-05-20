import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'arco';
import { useLocation } from 'react-router-dom';
import Nav from '../nav';
import { LanguageSupport } from '../../../utils/language';
import { getMenuOrder } from '../../../utils/menu';
import { localeMap } from '../../../utils/locale';
import './index.less';
import { ContextProvider } from '../../../../packages/arcodesign/components';
import { getPathname } from '../../../utils/url';

type Items = {
    name: string;
    key: string;
}[];

type CompChildren = {
    [key: string]: Items;
};

// todo export抽成文件
export type ResChildren = {
    [key: string]: {
        [key: string]: Items;
    };
};

export type IMenuItemMap = Record<
    LanguageSupport,
    {
        compRoutes?: Record<string, Items>;
        readmeRoutes?: Items;
        resRoutes?: {
            function?: Record<string, Items>;
            mixin?: Record<string, Items>;
        };
        compositeCompRoutes?: Items;
    }
>;

export interface IMenu {
    doc?: {
        name: string;
        key: string;
        items: Items;
    };
    components?: {
        name: string;
        key: string;
        children: CompChildren;
    };
    resource?: {
        name: string;
        key: string;
        children: ResChildren;
    };
    compositeComp?: {
        name: string;
        key: string;
        items: Items;
    };
}

export interface ILayoutProps {
    children: React.ReactNode;
    name: string;
    type: 'readme' | 'doc';
    language?: LanguageSupport;
    mode: 'light' | 'dark';
    setMode: (mode: 'light' | 'dark') => void;
    menuItemsMap: IMenuItemMap;
    Header: any;
}

const getPcMenu = (language: LanguageSupport, menuItemsMap: IMenuItemMap) => {
    const { compRoutes, readmeRoutes, compositeCompRoutes } =
        menuItemsMap[language === LanguageSupport.EN ? LanguageSupport.EN : LanguageSupport.CH];
    const menu: IMenu = {
        ...(readmeRoutes
            ? {
                  doc: {
                      name: localeMap.DevelopmentGuide[language],
                      key: 'doc',
                      items: readmeRoutes as Items,
                  },
              }
            : {}),
        ...(compRoutes
            ? {
                  components: {
                      name: localeMap.Components[language],
                      key: 'components',
                      children: getMenuOrder(compRoutes, language) as CompChildren,
                  },
              }
            : {}),
        ...(compositeCompRoutes
            ? {
                  compositeComp: {
                      name: localeMap.CompositeComp[language],
                      key: 'compositeComp',
                      items: compositeCompRoutes as Items,
                  },
              }
            : {}),
    };

    return menu;
};

const getResourceMenu = (language: LanguageSupport, menuItemsMap: IMenuItemMap) => {
    const { resRoutes } =
        menuItemsMap[language === LanguageSupport.EN ? LanguageSupport.EN : LanguageSupport.CH];
    if (!resRoutes) {
        return {};
    }
    const menu: IMenu = {
        resource: {
            name: localeMap.DevelopmentResource[language],
            key: 'resource',
            children: resRoutes as ResChildren,
        },
    };
    return menu;
};

function initMenu(language: LanguageSupport, pathname: string, menuItemsMap: IMenuItemMap) {
    switch (getPathname(pathname)) {
        case 'resource':
            return getResourceMenu(language, menuItemsMap);
        default:
            return getPcMenu(language, menuItemsMap);
    }
}

export default function Layout(props: ILayoutProps) {
    const {
        children,
        name,
        type,
        language: defaultLanguage = LanguageSupport.CH,
        mode,
        setMode,
        menuItemsMap,
        Header,
    } = props;
    const [menuCollapse, setMenuCollapse] = useState(false);
    const [navHeight, setNavHeight] = useState(241);
    const [language, setLanguage] = useState(defaultLanguage);
    const { pathname } = useLocation();
    const [menu, setMenu] = useState(() => initMenu(defaultLanguage, pathname, menuItemsMap));
    const siteContentRef = useRef<HTMLDivElement | null>(null);
    const getSiteContentRef = () => {
        return siteContentRef.current;
    };

    useEffect(() => {
        setMenu(initMenu(language, pathname, menuItemsMap));
    }, [language, pathname, menuItemsMap]);
    useEffect(() => {
        if (language === defaultLanguage) {
            return;
        }
        setLanguage(defaultLanguage);
    }, [defaultLanguage]);

    useEffect(() => {
        const el =
            document.querySelector('.demo-nav-intro') || document.querySelector('.demo-doc-intro');
        setNavHeight(el?.clientHeight ? el.clientHeight + 47 : 241);
    }, [children]);
    return (
        <ContextProvider
            useDarkMode
            isDarkMode={mode === 'dark'}
            onDarkModeChange={isDark => setMode(isDark ? 'dark' : 'light')}
        >
            <div className="arcodesign-pc-site">
                <div className="arcodesign-pc-site-header">
                    <Header
                        getSiteContentRef={getSiteContentRef}
                        menu={menu}
                        language={language}
                        setLanguage={setLanguage}
                        mode={mode}
                        setMode={setMode}
                    />
                </div>
                <div className="arcodesign-pc-site-content-wrap">
                    <div
                        className="arcodesign-pc-menu"
                        style={{
                            width: menuCollapse ? 0 : 260,
                            opacity: menuCollapse ? 0 : 1,
                        }}
                    >
                        <Nav
                            menu={menu}
                            name={name}
                            language={language}
                            style={menuCollapse ? { display: 'none' } : {}}
                        />
                    </div>
                    <div
                        ref={siteContentRef}
                        className={`arcodesign-pc-site-content ${
                            type === 'readme' ? 'readme' : ''
                        }`}
                    >
                        {menuCollapse && <div className="arcodesign-pc-menu-holder" />}
                        <Button
                            shape="circle"
                            size="mini"
                            className={`arcodesign-pc-menu-collapse-btn ${
                                menuCollapse ? 'arcodesign-pc-menu-collapse-btn-close' : ''
                            }`}
                            style={{ top: `${navHeight}px` }}
                            icon={
                                <svg width="13" height="12">
                                    <g fill="none" fillRule="evenodd">
                                        <path d="M.19 0h12v12h-12z" />
                                        <path
                                            d="M7.797 2.243l.536.536L5.11 6l3.222 3.222-.536.536-3.75-3.75.007-.008-.007-.006 3.75-3.75z"
                                            fill="currentColor"
                                        />
                                    </g>
                                </svg>
                            }
                            onClick={() => {
                                setMenuCollapse(!menuCollapse);
                            }}
                        />
                        {children}
                    </div>
                </div>
            </div>
        </ContextProvider>
    );
}
