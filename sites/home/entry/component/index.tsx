import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { getUrlsByLanguage } from '../../../utils/url';
import RightArrow from '../components/arrow';
import Img from '../components/img';
import { GlobalContext } from '../setting';
import { localeMap } from '../../../utils/locale';
import './index.less';

export interface IProps {
    gotoComponentBase: () => void;
}
export default function ComponentGroup({ gotoComponentBase }: IProps) {
    const comRef = useRef<HTMLDivElement>(null);
    const comBoxRef = useRef<HTMLDivElement>(null);
    const { language, isMobile } = useContext(GlobalContext);
    const { innerHeight } = window;
    useEffect(() => {
        if (comBoxRef.current) {
            comBoxRef.current.style.height = `${innerHeight - 60}px`;
        }
        const onScroll = () => {
            // 浮动区间
            const minZone = 30;
            if (comBoxRef.current && comRef.current) {
                const { top } = comBoxRef.current.getBoundingClientRect();
                if (Math.abs(top - 60) > minZone) {
                    comRef.current.style.overflow = 'hidden';
                } else {
                    comRef.current.style.overflow = 'scroll';
                }
            }
        };
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);
    const componenGroupUrl = useMemo(
        () => `${getUrlsByLanguage(language).MOBILE_DOC_PREFIX}typical-demo`,
        [language],
    );
    return (
        <section
            className={`arco-design-mobile-component ${
                isMobile ? 'component-mobile' : 'component-pc'
            } `}
            ref={comBoxRef}
        >
            <div className="component-introduction">
                <div className="arco-design-mobile-title">
                    {localeMap.HomeComponentTitle[language]}
                </div>
                <div className="arco-design-mobile-subtitle principle">
                    {localeMap.HomeComponentSubTitle[language]}
                </div>
                <div className="desc">
                    <p>
                        {localeMap.HomeComponentTip1[language]}
                        {localeMap.HomeComponentTip2[language]}
                        {localeMap.HomeComponentTip3[language]}
                    </p>
                </div>
                <div className="arco-design-text-btn" onClick={gotoComponentBase}>
                    {localeMap.HomeStartButton[language]} <RightArrow className="right-arrow" />
                </div>
            </div>
            <div className="mobile-component-box" ref={comRef}>
                {isMobile ? (
                    <Img name="components_group.png" className="components-group-pic" />
                ) : (
                    <iframe src={componenGroupUrl} title="typical demo" />
                )}
            </div>
        </section>
    );
}
