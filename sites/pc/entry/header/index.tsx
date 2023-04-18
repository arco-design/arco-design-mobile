import React, { useCallback, useRef, useState, useContext } from 'react';
import { AutoComplete, Input, Space, Tag, Spin, Dropdown, Button, Menu, Tooltip } from 'arco';
import debounce from 'lodash.debounce';
import { LanguageLocaleMap, LanguageSupport } from '../../../utils/language';
import { getUrlsByLanguage } from '../../../utils/url';
import { HistoryContext } from '../context';
import { IMenu } from '../layout';
import { localeMap } from '../../../utils/locale';
import './index.less';

const { Option } = AutoComplete;
const logo = 'https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/arco-design/arco-logo.svg';

const headerMenu = (language: LanguageSupport) => [
    {
        text: localeMap.Home[language],
        url: getUrlsByLanguage(language).HOME,
    },
    {
        text: localeMap.Components[language],
        url: '',
        active: true,
    },
    $githubLink$,
];

type ChildrenItem = {
    name: string;
    key: string;
};

interface IHeaderProps {
    menu: IMenu;
    language: LanguageSupport;
    setLanguage: (language: LanguageSupport) => void;
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

export default function Header(props: IHeaderProps) {
    const history = useContext(HistoryContext);
    const { menu, setLanguage, language } = props;
    const [value, setValue] = useState('');
    const [list, setList] = useState<List | number[]>([]);
    const [noData, setNoData] = useState(false);
    const [loading, setLoading] = useState(true);
    const contentDom = useRef<HTMLDivElement | null>(null);
    const input = useRef(null);

    const flattenMeta: ChildrenItem[] = Object.keys(menu.components.children).reduce((pre, cur) => {
        return pre.concat(menu.components.children[cur]);
    }, [] as ChildrenItem[]);

    function highlightStr(compName: string, query: string) {
        const regExp = new RegExp(`(${query})`, 'gi');
        return compName.replace(regExp, '<span class="highlight-word">$1</span>');
    }

    function getMatchMeta(inputValue: string) {
        return flattenMeta
            .filter(comp => ~comp.name.toLowerCase().indexOf(inputValue.toLowerCase()))
            .map(comp => ({
                title: highlightStr(comp.name, inputValue),
                uri: `${
                    language === LanguageSupport.EN ? `/${LanguageLocaleMap[language]}` : ''
                }/components/${comp.key}`,
                isComponent: true,
            }));
    }

    const debounceSearch = useCallback(
        debounce(query => {
            if (!query) return;
            setNoData(false);
            setList([1]);
            setLoading(true);
            const searchList = getMatchMeta(query);
            if (!searchList.length) {
                setNoData(true);
                setList([1]);
            } else {
                setList(searchList);
            }
            setLoading(false);
        }, 200),
        [language],
    );

    function onChangeInput(val, option) {
        if (option) {
            if (!loading) {
                setValue('');
                setList([]);
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
                    {localeMap.SearchResultTip[language](noData || loading ? 0 : list.length)}
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
                    <img src={logo} className="arcodesign-pc-header-logo-pic" />
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
                            data={(list as List).map((item, index) => (
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
                                        <Tag
                                            size="small"
                                            color="arcoblue"
                                            style={{ verticalAlign: '-5px' }}
                                        >
                                            {localeMap.ComponentType[language]}
                                        </Tag>
                                        <div dangerouslySetInnerHTML={{ __html: item.title }} />
                                    </Space>
                                </Option>
                            ))}
                            dropdownRender={renderDropdown}
                        />
                    </div>
                    <div className="arcodesign-pc-header-nav-bar">
                        <div className="arcodesign-pc-header-tabs">
                            {headerMenu(language).map((menuItem, key) => (
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
