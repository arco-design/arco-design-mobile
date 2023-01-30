import React, { useEffect, useState } from 'react';
import { Button } from 'arco';
import Header from '../header';
import Nav from '../nav';
import Footer from '../footer';
import chCompRoutes from '../../pages/components/index.json';
import enCompRoutes from '../../pages/components/index-en-US.json';
import chReadmeRoutes from '../../pages/guide/index.json';
import enReadmeRoutes from '../../pages/guide/index-en-US.json';
import enCompositeCompRoutes from '../../pages/composite-comp/index.json';
// import commonResRoutes from '../../pages/resource/index.json';
import { LanguageSupport } from '../../../utils/language';
import { getMenuOrder } from '../../../utils/menu';
import { localeMap } from '../../../utils/locale';
import './index.less';

type Items = {
    name: string;
    key: string;
}[];

type CompChildren = {
    [key: string]: Items;
};

type ResChildren = {
    [key: string]: Items;
};

export interface IMenu {
    doc: {
        name: string;
        key: string;
        items: Items;
    };
    components: {
        name: string;
        key: string;
        children: CompChildren;
    };
    resource?: {
        name: string;
        key: string;
        children: ResChildren;
    };
    compositeComp: {
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
}
const menuItemsMap = {
    [LanguageSupport.CH]: {
        compRoutes: chCompRoutes,
        readmeRoutes: chReadmeRoutes,
        // resRoutes: commonResRoutes,
        compositeCompRoutes: enCompositeCompRoutes,
    },
    [LanguageSupport.EN]: {
        compRoutes: enCompRoutes,
        readmeRoutes: enReadmeRoutes,
        // resRoutes: commonResRoutes,
        compositeCompRoutes: enCompositeCompRoutes,
    },
};
function initMenu(language: LanguageSupport) {
    const { compRoutes, readmeRoutes, compositeCompRoutes } =
        menuItemsMap[language === LanguageSupport.EN ? LanguageSupport.EN : LanguageSupport.CH];
    const newCompRoutes = getMenuOrder(compRoutes, language);
    // if (language !== LanguageSupport.CH) {
    //     // 公共hooks转换为英文
    //     resRoutes.hooks.map(
    //         (_, index) => (resRoutes.hooks[index].name = localeMap.GeneralHooks[language]),
    //     );
    // }
    const menu: IMenu = {
        doc: {
            name: localeMap.DevelopmentGuide[language],
            key: 'doc',
            items: readmeRoutes as Items,
        },
        components: {
            name: localeMap.Components[language],
            key: 'components',
            children: newCompRoutes as CompChildren,
        },
        // resource: {
        //     name: localeMap.DevelopmentResource[language],
        //     key: 'resource',
        //     children: resRoutes as ResChildren,
        // },
        compositeComp: {
            name: localeMap.CompositeComp[language],
            key: 'compositeComp',
            items: compositeCompRoutes as Items,
        },
    };
    return menu;
}
export default function Layout(props: ILayoutProps) {
    const { children, name, type, language: defaultLanguage = LanguageSupport.CH } = props;
    const [menuCollapse, setMenuCollapse] = useState(false);
    const [navHeight, setNavHeight] = useState(241);
    const [language, setLanguage] = useState(defaultLanguage);
    const [menu, setMenu] = useState(initMenu(defaultLanguage));

    useEffect(() => {
        setMenu(initMenu(language));
    }, [language]);
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
        <div className="arcodesign-pc-site">
            <div className="arcodesign-pc-site-header">
                <Header menu={menu} language={language} setLanguage={setLanguage} />
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
                <div className={`arcodesign-pc-site-content ${type === 'readme' ? 'readme' : ''}`}>
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
                                        fill="#1d2129"
                                    />
                                </g>
                            </svg>
                        }
                        onClick={() => {
                            setMenuCollapse(!menuCollapse);
                        }}
                    />
                    {children}
                    <Footer />
                </div>
            </div>
        </div>
    );
}
