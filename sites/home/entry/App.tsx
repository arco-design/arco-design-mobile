import React, { useMemo, useRef, useState } from 'react';
import { LanguageSupport } from '../../utils/language';
import { getUrlsByLanguage } from '../../utils/url';
import HomeBanner from './banner';
import ComponentBox from './component';
import Footer from './footer';
import BusinessBar from './business-bar';
import Business from './business';
import Nav from './nav';
import Principle from './principle';
import getUrlParam from '../../utils/getUrlParam';
import { GlobalContext, isMobileBrowser } from './setting';
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

    const isMobile = useMemo(() => isMobileBrowser(), []);

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
                <Footer />
            </div>
        </GlobalContext.Provider>
    );
}
