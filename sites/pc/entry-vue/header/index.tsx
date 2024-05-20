import React, { useRef, useState, useContext, useMemo, useEffect } from 'react';
import { Dropdown, Button, Menu, Tooltip } from 'arco';
import { useLocation } from 'react-router-dom';
import { LanguageSupport } from '../../../utils/language';
import { getPathname, getUrlsByLanguage } from '../../../utils/url';
import { HistoryContext } from '../../entry/context';
import { IMenu } from '../../entry/layout';
import { localeMap } from '../../../utils/locale';
import LogoPicture from '../../../components/logo-pic';
import '../../entry/header/index.less';

interface IHeaderProps {
    menu: IMenu;
    language: LanguageSupport;
    mode: 'light' | 'dark';
    setMode: (mode: 'light' | 'dark') => void;
    setLanguage: (language: LanguageSupport) => void;
    getSiteContentRef: () => HTMLDivElement | null;
}

const languageNameMap = {
    [LanguageSupport.CH]: { label: '简体中文', suffix: '' },
    [LanguageSupport.EN]: { label: 'English', suffix: 'en-US' },
};

export default function Header(props: IHeaderProps) {
    const history = useContext(HistoryContext);
    const { setLanguage, language, getSiteContentRef, mode, setMode } = props;
    const contentDom = useRef<HTMLDivElement | null>(null);
    const { pathname } = useLocation();
    const [currentFunctionName, setCurrentFunctionName] = useState('');
    useEffect(() => {
        if (!currentFunctionName) {
            return;
        }
        setTimeout(() => {
            const anchorTitleArray = document.getElementsByClassName('arco-anchor-link-title');
            const targetAnchor: HTMLElement = Array.prototype.find.call(
                anchorTitleArray,
                (item: HTMLElement) => item.innerHTML === currentFunctionName,
            );
            targetAnchor.click();
            setCurrentFunctionName('');
        }, 0);
    }, [pathname, currentFunctionName]);

    useEffect(() => {
        const siteContent = getSiteContentRef();
        if (siteContent) {
            siteContent.scroll({
                top: 0,
            });
        }
    }, [pathname]);

    const headerMenu = useMemo(() => {
        const header = [
            {
                text: localeMap.Home[language],
                url: getUrlsByLanguage(language, true).HOME,
            },
            {
                text: localeMap.Components[language],
                url: getUrlsByLanguage(language, true).DOC_SITE,
                active: true,
            },
            $githubLink$,
        ];
        const initHeaderActive = () => {
            header.forEach(item => {
                item.active = false;
            });
        };
        switch (getPathname(pathname)) {
            case 'resource':
                initHeaderActive();
                header[2].active = true;
                break;
            default:
                initHeaderActive();
                header[1].active = true;
                break;
        }
        return header;
    }, [language, pathname]);

    const onMenuClick = (lang: string) => {
        const locationHash = window.location.hash;
        const whichLang = Object.keys(languageNameMap).find(l =>
            locationHash.startsWith(`#/${languageNameMap[l].suffix}/`),
        );
        const curLang = whichLang || LanguageSupport.CH;
        if (curLang === lang) {
            return;
        }
        let newLocationHash = '';
        if (whichLang) {
            newLocationHash = locationHash.replace(
                lang === LanguageSupport.CH
                    ? `/${languageNameMap[whichLang].suffix}`
                    : languageNameMap[whichLang].suffix,
                languageNameMap[lang].suffix,
            );
        } else {
            newLocationHash = `#/${languageNameMap[lang].suffix}${locationHash.slice(1)}`;
        }
        history.push(newLocationHash.slice(1));
        setLanguage(lang as LanguageSupport);
    };

    const langDropList = (
        <Menu>
            {Object.keys(languageNameMap).map(lang => (
                <Menu.Item key={lang} onClick={() => onMenuClick(lang)}>
                    {languageNameMap[lang].label || ''}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <div className="arcodesign-pc-header">
            <div className="arcodesign-pc-header-logo">
                <a href={getUrlsByLanguage(language, true).HOME}>
                    <LogoPicture />
                </a>
            </div>
            <div className="arcodesign-pc-header-content" ref={contentDom}>
                <div className="arcodesign-pc-header-content-wrapper">
                    <div className="arcodesign-pc-header-search" />
                    <div className="arcodesign-pc-header-nav-bar">
                        <div className="arcodesign-pc-header-tabs">
                            {headerMenu.map((menuItem, key) => (
                                <div className="arcodesign-pc-header-tabs-item" key={key}>
                                    <div
                                        className={`arcodesign-pc-header-tabs-item-inner ${
                                            menuItem.active ? 'active' : ''
                                        }`}
                                        onClick={() => {
                                            if (menuItem.url) {
                                                if (menuItem.open) {
                                                    window.open(menuItem.url);
                                                } else {
                                                    window.location.href = menuItem.url;
                                                }
                                            }
                                        }}
                                    >
                                        {menuItem.text}
                                    </div>
                                </div>
                            ))}
                            <div className="arcodesign-pc-header-tabs-item">
                                <div
                                    className="arcodesign-pc-header-tabs-item-inner darkmode"
                                    onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
                                >
                                    <Tooltip
                                        content={
                                            mode === 'dark'
                                                ? localeMap.SwitchToLightMode[language]
                                                : localeMap.SwitchToDarkMode[language]
                                        }
                                        position="br"
                                    >
                                        {mode === 'dark' ? (
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                viewBox="0 0 48 48"
                                                width="1em"
                                                height="1em"
                                                className="arco-icon arco-icon-moon-fill"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    stroke="none"
                                                    d="M42.108 29.769c.124-.387-.258-.736-.645-.613A17.99 17.99 0 0 1 36 30c-9.941 0-18-8.059-18-18 0-1.904.296-3.74.844-5.463.123-.387-.226-.768-.613-.645C10.558 8.334 5 15.518 5 24c0 10.493 8.507 19 19 19 8.482 0 15.666-5.558 18.108-13.231z"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                                viewBox="0 0 48 48"
                                                width="1em"
                                                height="1em"
                                                className="arco-icon arco-icon-sun-fill"
                                            >
                                                <circle
                                                    cx="24"
                                                    cy="24"
                                                    r="9"
                                                    fill="currentColor"
                                                    stroke="none"
                                                />
                                                <path
                                                    fill="currentColor"
                                                    stroke="none"
                                                    d="M21 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-5zM21 37.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-5zM42.5 21a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5h5zM10.5 21a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5h5zM39.203 34.96a.5.5 0 0 1 0 .707l-3.536 3.536a.5.5 0 0 1-.707 0l-3.535-3.536a.5.5 0 0 1 0-.707l3.535-3.535a.5.5 0 0 1 .707 0l3.536 3.535zM16.575 12.333a.5.5 0 0 1 0 .707l-3.535 3.535a.5.5 0 0 1-.707 0L8.797 13.04a.5.5 0 0 1 0-.707l3.536-3.536a.5.5 0 0 1 .707 0l3.535 3.536zM13.04 39.203a.5.5 0 0 1-.707 0l-3.536-3.536a.5.5 0 0 1 0-.707l3.536-3.535a.5.5 0 0 1 .707 0l3.536 3.535a.5.5 0 0 1 0 .707l-3.536 3.536zM35.668 16.575a.5.5 0 0 1-.708 0l-3.535-3.535a.5.5 0 0 1 0-.707l3.535-3.536a.5.5 0 0 1 .708 0l3.535 3.536a.5.5 0 0 1 0 .707l-3.535 3.535z"
                                                />
                                            </svg>
                                        )}
                                    </Tooltip>
                                </div>
                            </div>
                            <div
                                className="arcodesign-pc-header-tabs-item language-item"
                                key="language"
                            >
                                <Dropdown droplist={langDropList} position="bl">
                                    <Button type="text" className="header-language-set">
                                        {languageNameMap[language].label || ''}
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            viewBox="0 0 48 48"
                                            aria-hidden="true"
                                            focusable="false"
                                            className="arco-icon arco-icon-down"
                                        >
                                            <path d="M39.6 17.443 24.043 33 8.487 17.443" />
                                        </svg>
                                    </Button>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
