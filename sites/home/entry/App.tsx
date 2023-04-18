import React, { useMemo, useRef, useState, useEffect } from 'react';
import { LanguageSupport } from '../../utils/language';
import { FIGMA_RESOURCE, getUrlsByLanguage } from '../../utils/url';
import Img from './components/img';
import SmallArrow from './components/small-arrow';
import HomeBanner from './banner';
import ComponentBox from './component';
import Footer from './footer';
import BusinessBar from './business-bar';
import Business from './business';
import Nav from './nav';
import Principle from './principle';
import getUrlParam from '../../utils/getUrlParam';
import { showGA } from '../../utils/ga';
import { GlobalContext, isMobileBrowser } from './setting';
import { localeMap } from '../../utils/locale';
import './index.less';

export default function App() {
    const resourceRef = useRef<HTMLDivElement>(null);

    const [language, setLanguage] = useState(
        getUrlParam('locale') === 'en-US' ? LanguageSupport.EN : LanguageSupport.CH,
    );

    function gotoComponentBase() {
        window.open(getUrlsByLanguage(language).DOC_SITE);
    }

    function gotoResource() {
        if (resourceRef.current) {
            window.scrollTo({
                top: resourceRef.current.offsetTop, // 设置滚动的距离
                behavior: 'smooth',
            });
        }
    }

    function renderResources() {
        return (
            <div className="arco-design-mobile-resources" ref={resourceRef}>
                <div className="arco-design-mobile-title">{localeMap.DesignResource[language]}</div>
                <div className="arco-design-mobile-subtitle">
                    {localeMap.DesignResourceDesc[language]}
                </div>
                <div className="resources-group">
                    <div className="resource-item" onClick={() => window.open(FIGMA_RESOURCE)}>
                        <Img name="figma.png" className="resource-logo" />
                        <div className="resource-text">
                            <div className="title">
                                {localeMap.DesignResourceFigmaTitle[language]}{' '}
                                <SmallArrow className="resource-icon icon-in" />
                            </div>
                            <div className="desc default-desc">
                                {localeMap.DesignResourceFigmaDesc1[language]}
                            </div>
                            <div className="desc small-screen-desc">
                                {localeMap.DesignResourceFigmaDesc1[language]}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const isMobile = useMemo(() => isMobileBrowser(), []);

    useEffect(() => {
        showGA();
    }, []);

    return (
        <GlobalContext.Provider value={{ language, isMobile }}>
            <div className="arco-design-mobile-home">
                <Nav
                    gotoComponentBase={gotoComponentBase}
                    gotoResource={gotoResource}
                    setLanguage={setLanguage}
                />
                <HomeBanner gotoComponentBase={gotoComponentBase} />
                <BusinessBar />
                <Principle />
                <ComponentBox gotoComponentBase={gotoComponentBase} />
                <Business />
                {renderResources()}
                <Footer />
            </div>
        </GlobalContext.Provider>
    );
}
