import React, { useCallback, useRef, useState, useContext, useMemo, useEffect } from 'react';
import { AutoComplete, Input, Space, Tag, Spin, Dropdown, Button, Menu, Tooltip } from 'arco';
import debounce from 'lodash.debounce';
import { useLocation } from 'react-router-dom';
import Fuse from 'fuse';
import { LanguageLocaleMap, LanguageSupport } from '../../../utils/language';
import { getPathname, getUrlsByLanguage } from '../../../utils/url';
import { HistoryContext } from '../context';
import { IMenu } from '../layout';
import { localeMap } from '../../../utils/locale';
import searchResource from '../../pages/resource/search.json';
import LogoPicture from '../../../components/logo-pic';
import './index.less';

const options = {
    threshold: 0.3,
    includeMatches: true,
    keys: ['functionName'],
};

const fuse = new Fuse(searchResource, options);

const { OptGroup, Option } = AutoComplete;

type ChildrenItem = {
    name: string;
    key: string;
};

interface IHeaderProps {
    menu: IMenu;
    language: LanguageSupport;
    mode: 'light' | 'dark';
    setMode: (mode: 'light' | 'dark') => void;
    setLanguage: (language: LanguageSupport) => void;
    getSiteContentRef: () => HTMLDivElement | null;
}

type List = {
    title: string;
    uri: string;
    isComponent: boolean;
}[];

const languageNameMap = {
    [LanguageSupport.CH]: { label: '简体中文', suffix: '' },
    [LanguageSupport.EN]: { label: 'English', suffix: 'en-US' },
};

interface IHeaderData {
    flattenMeta: ChildrenItem[];
    path: string;
    local: string;
}

type IFunctionList = Record<
    string,
    {
        functionName: string;
        category: string;
    }[]
>;

export default function Header(props: IHeaderProps) {
    const history = useContext(HistoryContext);
    const { menu, setLanguage, language, getSiteContentRef, mode, setMode } = props;
    const [value, setValue] = useState('');
    const [list, setList] = useState<List | number[]>([]);
    const [functionList, setFunctionList] = useState<IFunctionList>({});
    const [functionListCount, setFunctionListCount] = useState(0);
    const [noData, setNoData] = useState(false);
    const [loading, setLoading] = useState(true);
    const contentDom = useRef<HTMLDivElement | null>(null);
    const input = useRef(null);
    const { pathname } = useLocation();
    const [currentFunctionName, setCurrentFunctionName] = useState('');
    useEffect(() => {
        if (!currentFunctionName) {
            return;
        }
        setTimeout(() => {
            try {
                const anchorTitleArray = document.getElementsByClassName('arco-anchor-link-title');
                const targetAnchor: HTMLElement = Array.prototype.find.call(
                    anchorTitleArray,
                    (item: HTMLElement) => item.innerHTML === currentFunctionName,
                );
                targetAnchor.click();
            } catch (e) {
                console.error('e: ', e);
                throw e;
            }
        }, 0);
    }, [currentFunctionName, pathname]);

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
                url: getUrlsByLanguage(language).HOME,
            },
            {
                text: localeMap.Components[language],
                url: getUrlsByLanguage(language).DOC_SITE,
                active: true,
            },
            {
                text: localeMap.Resource[language],
                url: getUrlsByLanguage(language).RESOURCE_PAGE,
                active: false,
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

    const getResourceFlattenMeta = (data: Record<string, any>) => {
        if (!data) {
            return [];
        }
        if (Array.isArray(data)) {
            return data;
        }
        return Object.keys(data).reduce((pre, cur) => {
            return pre.concat(getResourceFlattenMeta(data[cur]));
        }, []);
    };

    const headerData: IHeaderData = useMemo(() => {
        if (menu.components) {
            return {
                flattenMeta: getResourceFlattenMeta(menu.components.children),
                path: 'components',
                local: localeMap.ComponentType[language],
            };
        }
        if (menu.resource) {
            return {
                flattenMeta: getResourceFlattenMeta(menu.resource.children),
                path: 'resource',
                local: localeMap.Resource[language],
            };
        }
        return {
            flattenMeta: [],
            path: '',
            local: '',
        };
    }, [menu]);

    function highlightStr(compName: string, query: string) {
        const regExp = new RegExp(`(${query})`, 'gi');
        return compName.replace(regExp, '<span class="highlight-word">$1</span>');
    }

    function getMatchMeta(inputValue: string) {
        return headerData.flattenMeta
            .filter(comp => ~comp.name.toLowerCase().indexOf(inputValue.toLowerCase()))
            .map(comp => ({
                title: highlightStr(comp.name, inputValue),
                uri: `${language === LanguageSupport.EN ? `/${LanguageLocaleMap[language]}` : ''}/${
                    headerData.path
                }/${comp.key}`,
                isComponent: true,
            }));
    }

    const debounceSearch = useCallback(
        debounce(query => {
            if (!query) return;
            setNoData(false);
            setList([1]);
            setLoading(true);
            const resourceResult = fuse.search(query);
            const searchList = getMatchMeta(query);
            if (!searchList.length && !resourceResult.length) {
                setNoData(true);
                setList([1]);
            } else {
                setList(searchList);
                const temp: IFunctionList = {};
                setFunctionListCount(resourceResult.length);
                resourceResult.forEach(item => {
                    const contentItem = item.item;
                    const targetFileNameIndex = Object.keys(temp).findIndex(
                        key => contentItem.filename === key,
                    );
                    if (targetFileNameIndex === -1) {
                        temp[contentItem.filename] = [];
                    }
                    temp[contentItem.filename].push({
                        functionName: contentItem.functionName,
                        category: contentItem.category,
                    });
                });
                setFunctionList(temp);
            }
            setLoading(false);
        }, 200),
        [language, headerData],
    );

    function onChangeInput(val, option) {
        if (option) {
            if (!loading) {
                setValue('');
                setList([]);
                setFunctionList({});
                history.push(option.uri);
            }
            return;
        }
        if (!val) {
            setList([]);
        } else {
            setList([1]);
            setLoading(true);
        }
        setValue(val);
        debounceSearch(val);
    }

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

    const searchResultList = (list as List).map((item, index) => (
        <Option
            style={{
                height: 'auto',
                lineHeight: 1.5715,
                padding: '12px 20px',
            }}
            key={index}
            value={index}
            uri={item.uri}
        >
            <Space className="arcodesign-pc-search-title">
                <Tag size="small" color="arcoblue" style={{ verticalAlign: '-5px' }}>
                    {headerData.local}
                </Tag>
                <div dangerouslySetInnerHTML={{ __html: item.title }} />
            </Space>
        </Option>
    ));

    const fuseSearchList = menu.resource
        ? Object.keys(functionList).map((fileName, index) => (
              <OptGroup key={`${fileName}-${index}`} label={fileName}>
                  {functionList[fileName].map((ele, idx) => (
                      <Option
                          onClick={() => {
                              setCurrentFunctionName(
                                  ele.category === 'mixin'
                                      ? ele.functionName
                                      : ele.functionName.replace('.', '').split('-').join(''),
                              );
                          }}
                          style={{
                              height: 'auto',
                              lineHeight: 1.5715,
                              padding: '12px 20px',
                          }}
                          key={`${ele.functionName}-${idx}`}
                          value={`${ele.functionName}}-${idx}`}
                          uri={`/resource/${ele.category === 'function' ? 'f' : 'm'}-${fileName}`}
                      >
                          <Space className="arcodesign-pc-search-title">
                              <Tag
                                  size="small"
                                  color="arcoblue"
                                  style={{ verticalAlign: '-5px', textTransform: 'capitalize' }}
                              >
                                  {ele.category}
                              </Tag>
                              <div
                                  dangerouslySetInnerHTML={{
                                      __html: highlightStr(ele.functionName, value),
                                  }}
                              />
                          </Space>
                      </Option>
                  ))}
              </OptGroup>
          ))
        : null;

    const langDropList = (
        <Menu>
            {Object.keys(languageNameMap).map(lang => (
                <Menu.Item key={lang} onClick={() => onMenuClick(lang)}>
                    {languageNameMap[lang].label || ''}
                </Menu.Item>
            ))}
        </Menu>
    );

    function renderDropdown(menuComp) {
        return (
            <span>
                <div className="arcodesign-pc-search-summary">
                    {localeMap.SearchResultTip[language](
                        noData || loading ? 0 : list.length + functionListCount,
                    )}
                </div>
                {loading && (
                    <div className="arcodesign-pc-search-loading">
                        <Space>
                            <Spin />
                            {localeMap.Loading[language]}
                        </Space>
                    </div>
                )}
                {!loading && noData && (
                    <div className="arcodesign-pc-search-nodata">
                        {localeMap.SearchNoResultTip[language](value)}
                    </div>
                )}
                {!loading && !noData && menuComp}
            </span>
        );
    }

    return (
        <div className="arcodesign-pc-header">
            <div className="arcodesign-pc-header-logo">
                <a href={getUrlsByLanguage(language).HOME}>
                    <LogoPicture />
                </a>
            </div>
            <div className="arcodesign-pc-header-content" ref={contentDom}>
                <div className="arcodesign-pc-header-content-wrapper">
                    <div className="arcodesign-pc-header-search">
                        <AutoComplete
                            ref={input}
                            trigger="focus"
                            getPopupContainer={() => contentDom.current}
                            placeholder={localeMap.SearchTip[language]}
                            triggerProps={{
                                childrenPrefix: 'arco-search-input',
                                unmountOnExit: false,
                                popupStyle: { width: 480, padding: 0 },
                            }}
                            value={value}
                            onChange={onChangeInput}
                            triggerElement={
                                <Input
                                    prefix={
                                        <svg
                                            viewBox="0 0 1024 1024"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M469.333 106.667C669.632 106.667 832 269.035 832 469.333c0 75.712-23.19 146.006-62.87 204.16l144.683 144.683a21.333 21.333 0 010 30.165l-36.202 36.203a21.333 21.333 0 01-30.166 0L706.56 743.68A361.259 361.259 0 01469.333 832c-200.298 0-362.666-162.368-362.666-362.667s162.368-362.666 362.666-362.666zm0 89.6c-150.826 0-273.066 122.24-273.066 273.066S318.507 742.4 469.333 742.4 742.4 620.16 742.4 469.333 620.16 196.267 469.333 196.267z"
                                            />
                                        </svg>
                                    }
                                />
                            }
                            filterOption={() => true}
                            virtualListProps={{
                                isStaticItemHeight: false,
                                height: 400,
                            }}
                            dropdownRender={renderDropdown}
                        >
                            {searchResultList}
                            {fuseSearchList}
                        </AutoComplete>
                    </div>
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
