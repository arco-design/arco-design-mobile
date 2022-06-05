import React, { useContext } from 'react';
import Img from '../components/img';
import { LanguageSupport } from '../../../utils/language';
import { GlobalContext } from '../setting';
import { localeMap } from '../locale';
import './index.less';

export interface IPrincipleProps {
    language?: LanguageSupport;
}
export default function Principle() {
    const { language } = useContext(GlobalContext);
    return (
        <div className="arco-design-principle">
            <div className="arco-design-mobile-title">{localeMap.DesignPrinciples[language]}</div>
            <div className="arco-design-mobile-subtitle principle">
                {localeMap.DesignPrinciplesDesc[language]}
            </div>
            <div className="principle-group">
                <div className="principle-item">
                    <Img name="principle-1.png" />
                    <div className="title-wrapper">
                        <div className="title">
                            {localeMap.DesignPrinciplesPart1Title[language]}
                        </div>
                        <div className="subtitle">
                            {localeMap.DesignPrinciplesPart1SubTitle[language]}
                        </div>
                    </div>
                </div>
                <div className="principle-item">
                    <Img name="principle-2.png" />
                    <div className="title-wrapper">
                        <div className="title">
                            {localeMap.DesignPrinciplesPart2Title[language]}
                        </div>
                        <div className="subtitle">
                            {localeMap.DesignPrinciplesPart2SubTitle[language]}
                        </div>
                    </div>
                </div>
                <div className="principle-item">
                    <Img name="principle-3.png" />
                    <div className="title-wrapper">
                        <div className="title">
                            {localeMap.DesignPrinciplesPart3Title[language]}
                        </div>
                        <div className="subtitle">
                            {localeMap.DesignPrinciplesPart3SubTitle[language]}
                        </div>
                    </div>
                </div>
                <div className="principle-item">
                    <Img name="principle-4.png" />
                    <div className="title-wrapper">
                        <div className="title">
                            {localeMap.DesignPrinciplesPart4Title[language]}
                        </div>
                        <div className="subtitle">
                            {localeMap.DesignPrinciplesPart4SubTitle[language]}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
