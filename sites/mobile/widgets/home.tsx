import React, { useContext, useEffect, useMemo } from 'react';
import routes from '../../pages/route';
import enRoutes from '../../pages/route-en-US';
import { HistoryContext } from '../entry';
import getUrlParam from '../../utils/getUrlParam';
import { LanguageSupport } from '../../utils/language';
import { getMenuOrder } from '../../utils/menu';

export function Arrow() {
    return (
        <svg className="arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.59486 2.2417C4.3996 2.43696 4.3996 2.75354 4.59486 2.94881L9.59905 7.95299L4.63604 12.916C4.44078 13.1113 4.44078 13.4278 4.63604 13.6231L4.98959 13.9767C5.18485 14.1719 5.50144 14.1719 5.6967 13.9767L11.3536 8.31981C11.5296 8.14376 11.5469 7.8691 11.4055 7.67364C11.3822 7.62725 11.3511 7.58374 11.3124 7.545L5.65552 1.88815C5.46026 1.69288 5.14367 1.69288 4.94841 1.88815L4.59486 2.2417Z"
                fill="currentColor"
            />
        </svg>
    );
}
interface IHomeProps {
    language?: LanguageSupport;
}
export default function Home({
    language = LanguageSupport.CH
}: IHomeProps) {
    const history = useContext(HistoryContext);
    const actualRoutes = useMemo(() => {
        const langRoutes = language === LanguageSupport.EN ? enRoutes : routes;
        return getMenuOrder(langRoutes, language);
    }, [routes, enRoutes, language]);
    /** 区分iframe通信 */
    const needJump = getUrlParam('need_jump') === '0' ? false : true;

    useEffect(() => {
        document.body.classList.add('white-body');
        const scrollInfo = window.localStorage.getItem('home_scroll') || '';
        const scrollTop = Number(scrollInfo.split('__')[1]) || 0;
        if (scrollTop) {
            window.scrollTo(0, scrollTop);
            window.localStorage.removeItem('home_scroll');
        }
        return () => {
            document.body.classList.remove('white-body');
        };
    }, []);

    function handleSubItemClick(route) {
        window.localStorage.setItem('home_scroll', `${route}__${window.pageYOffset}`);
        window.parent.postMessage({
            type: 'component',
            data: route,
            language
        }, '*');
        if (needJump) {
            history.push(`${language === LanguageSupport.EN ? '/en-US' : ''}/components/${route}`);
        }
    }

    return (
        <div className="arcodesign-mobile-home-wrapper">
            <div className="arcodesign-demo-logo">
                <img src="https://sf1-cdn-tos.douyinstatic.com/obj/eden-cn/lbfpfvha/arco-mobile-home-logo.png" alt="" />
            </div>
            {Object.keys(actualRoutes).map((type, menuIndex) => (
                <div className="arcodesign-demo-menu" key={menuIndex}>
                    <div className="menu-wrap-title">{type}</div>
                    <div className="menu-item-wrap">
                        {actualRoutes[type].map((route, index) => (
                            <div
                                className="menu-item"
                                key={index}
                                onClick={() => handleSubItemClick(route.key)}
                            >
                                {route.name}
                                <Arrow />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
