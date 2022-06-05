import React, { useContext } from 'react';
import { Popover } from 'Arco';
import { LanguageSupport } from '../../../utils/language';
import { getUrlParams } from '../../../utils/getUrlParam';
import toQuery from '../../../utils/toQuery';
import MenuIcon from '../components/menu-icon';
import { GlobalContext, LanguageLocaleMap, LanguageNameMap } from '../setting';
import { localeMap } from '../../../utils/locale';
import './index.less';
import Img from '../components/img';
import { getUrlsByLanguage } from '../../../utils/url';

export interface NavProps {
    gotoComponentBase: () => void;
    gotoResource: () => void;
    setLanguage: (value: LanguageSupport) => void;
}

export default function Nav({ gotoComponentBase, gotoResource }: NavProps) {
    const { language } = useContext(GlobalContext);

    const gotoHomePageWithLanguage = lang => {
        const params = getUrlParams();
        if (lang === LanguageSupport.CH) {
            delete params.locale;
        } else {
            params.locale = LanguageLocaleMap[lang];
        }
        window.location.href = `${window.location.origin}${window.location.pathname}${
            Object.keys(params).length ? '?' : ''
        }${toQuery(params)}`;
    };
    const languageDropList = (
        <ul className="nav-bar-menu-list">
            {Object.keys(LanguageNameMap).map(key => (
                <li
                    key={key}
                    className="nav-bar-menu-item"
                    onClick={() => gotoHomePageWithLanguage(key)}
                >
                    {LanguageNameMap[key]}
                </li>
            ))}
        </ul>
    );
    const menuList = (
        <ul className="nav-bar-menu-list">
            <li key="1" className="nav-bar-menu-item" onClick={gotoComponentBase}>
                {localeMap.Components[language]}
            </li>
            <li key="2" className="nav-bar-menu-item" onClick={gotoResource}>
                {localeMap.DesignResource[language]}
            </li>
            $extraNavMenu$
        </ul>
    );

    return (
        <nav className="arco-design-nav-bar">
            <div className="nav-bar-inner">
                <div
                    className="nav-bar-logo"
                    onClick={() => (window.location.href = getUrlsByLanguage(language).HOME)}
                >
                    <Img className="nav-bar-logo-img" name="logo_arco.png" />
                </div>
                <div className="nav-bar-menu">
                    <div className="link" onClick={gotoComponentBase}>
                        {localeMap.Components[language]}
                    </div>
                    <div className="link" onClick={gotoResource}>
                        {localeMap.DesignResource[language]}
                    </div>
                    $extraNavLink$
                    <div className="nav-bar-language">
                        <Popover
                            className="nav-bar-menu-popover"
                            content={languageDropList}
                            direction="bottomRight"
                        >
                            <div className="link">{LanguageNameMap[language]}</div>
                        </Popover>
                    </div>
                </div>
                <div className="nav-bar-dropdown">
                    <Popover
                        className="nav-bar-menu-popover"
                        content={menuList}
                        direction="bottomRight"
                    >
                        <div className="menu-icon">
                            <MenuIcon />
                        </div>
                    </Popover>
                </div>
            </div>
        </nav>
    );
}
