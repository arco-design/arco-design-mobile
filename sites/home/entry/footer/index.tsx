import React, { ReactNode, useContext } from 'react';
import { Collapse } from 'Arco';
import { LanguageSupport } from '../../../utils/language';
import { FIGMA_RESOURCE, getUrlsByLanguage } from '../../../utils/url';
import Img from '../components/img';
import { GlobalContext } from '../setting';
import { localeMap } from '../locale';
import './index.less';

const getAllLinks = (language: LanguageSupport) => {
    const { DOC_PREFIX } = getUrlsByLanguage(language);
    return {
        [localeMap.Components[language]]: [
            { name: localeMap.QuickStart[language], link: `${DOC_PREFIX}doc/readme` },
            { name: localeMap.v1tov2[language], link: `${DOC_PREFIX}doc/v1tov2` },
            { name: localeMap.Changelog[language], link: `${DOC_PREFIX}doc/changelog` },
        ],
        [localeMap.HomeFooterEcosystem[language]]: [
            {
                name: localeMap.DesignLabDesignSystemLab[language],
                link: 'https://arco.design/themes/stores',
            },
            {
                name: localeMap.ArcoMaterialComponentMarket[language],
                link: 'https://arco.design/material',
            },
            { name: localeMap.ArcoProBestPractices[language], link: 'https://pro.arco.design/' },
        ],
        [localeMap.HomeFooterResource[language]]: [
            { name: localeMap.HomeFooterFigma[language], link: FIGMA_RESOURCE },
        ],
        [localeMap.HomeFooterFeedback[language]]: [],
    };
};

interface ICollapseItem {
    header: string;
    value: string;
    content: ReactNode;
}
export default function Footer() {
    const { language } = useContext(GlobalContext);
    const allLinks = getAllLinks(language);

    function renderLinks() {
        return (
            <div className="footer-all-links">
                <div className="footer-icon-wrap">
                    <Img name="logo_arco.png" className="icon-arco" />
                </div>
                {Object.keys(allLinks).map((key, index) => (
                    <div className="footer-link-group" key={index}>
                        <div className="footer-title">{key}</div>
                        {Object.keys(allLinks).length - 1 === index ? (
                            <div className="footer-feedback">
                                <div className="footer-desc">
                                    {localeMap.FeedbackTips[language]}
                                </div>
                                $footerFeedback$
                            </div>
                        ) : (
                            allLinks[key].map((item, itemIndex) => (
                                <div
                                    className="footer-link"
                                    key={itemIndex}
                                    onClick={() => item.link && window.open(item.link)}
                                >
                                    {item.name}
                                </div>
                            ))
                        )}
                    </div>
                ))}
            </div>
        );
    }

    function renderLinksSmall() {
        return (
            <Collapse.Group
                useAccordion
                items={Object.keys(allLinks).reduce((pre: ICollapseItem[], key) => {
                    if (allLinks[key].length) {
                        pre.push({
                            header: key,
                            value: key,
                            content: (
                                <>
                                    {allLinks[key].map((item, itemIndex) => (
                                        <div
                                            className="footer-link"
                                            key={itemIndex}
                                            onClick={() => item.link && window.open(item.link)}
                                        >
                                            {item.name}
                                        </div>
                                    ))}
                                </>
                            ),
                        });
                    }
                    return pre;
                }, [])}
            />
        );
    }
    return (
        <footer className="arco-design-mobile-footer">
            {renderLinks()}
            {renderLinksSmall()}
            <div className="footer-copyright">
                <div className="footer-copyright-btn">
                    <Img name="small_logo_arco_gray.png" />
                    Made with ArcoDesign
                </div>
                <p>Powered by GIP UED & 小说前端</p>
                <p className="second-para">ⓒ Copyright ByteDance 2021</p>
                $footerExtra$
            </div>
        </footer>
    );
}
