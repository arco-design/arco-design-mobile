import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { GlobalContext, useRefState } from '../setting';
import { localeMap } from '../../../utils/locale';
import './index.less';

const MIN_WINDOW_SHOW_NUM = 3;
const MID_WINDOW_SHOW_NUM = 4;

const suppportProduct = [
    {
        name: '头条',
        logo: 'toutiao',
    },
    {
        name: '皮皮虾',
        logo: 'pipixia',
    },
    {
        name: '西瓜视频',
        logo: 'xigua',
    },
    {
        name: '番茄小说',
        logo: 'fanqie',
    },
    {
        name: '头条搜索',
        logo: 'toutiao_search',
    },
    {
        name: '抖店',
        logo: 'douyin_store',
    },
    {
        name: '抖音',
        logo: 'douyin',
    },
    {
        name: '懂车帝',
        logo: 'dongchedi',
    },
];
enum EWindowType {
    Upper1220, // [1220, +)
    Upper768, // [768, 1199]
    Lower768, //  (0, 767]
}
function arrayRandom(len: number) {
    const nums = Array.from(Array(len), (_, k) => k);
    const randNums: number[] = [];
    let i = len;

    while (i--) {
        const j = Math.floor(Math.random() * (i + 1));
        randNums.push(nums[j]);
        nums.splice(j, 1);
    }
    return randNums;
}
function getWindowType(width: number, maxLength: number) {
    if (width >= 1220) {
        return [EWindowType.Upper1220, maxLength];
    }
    if (width >= 768) {
        return [EWindowType.Upper768, maxLength];
    }
    return [EWindowType.Lower768, MIN_WINDOW_SHOW_NUM];
}
export default function BusinessBar() {
    const { language } = useContext(GlobalContext);
    const [winType, showSize] = getWindowType(window.innerWidth, suppportProduct.length);
    const [whichWindowType, whichWindowTypeRef, setWhichWindowType] =
        useRefState<EWindowType>(winType);
    const posRandListRef = useRef<number[]>(arrayRandom(MIN_WINDOW_SHOW_NUM));
    const productListRef = useRef(arrayRandom(suppportProduct.length));
    const [showList, showListRef, setShowList] = useRefState<{ pre: number; cur: number }[]>(
        productListRef.current.slice(0, showSize).map(key => ({ pre: key, cur: key })),
    );
    const curActiveRef = useRef<number>(-1);
    const curAnimationPosRef = useRef<[number, number]>([0, MIN_WINDOW_SHOW_NUM]);
    const timerRef = useRef<any>();

    function renderItem({ pre, cur }) {
        const curPos = productListRef.current[cur];
        const { logo, name } = suppportProduct[curPos];
        const prePos = productListRef.current[pre];
        const { logo: preLogo, name: preName } = suppportProduct[prePos];
        const isAnimated = pre !== cur;
        if (isAnimated && curActiveRef.current === cur) {
            return (
                <div className="icon-img-wrapper" key={name}>
                    {logo ? (
                        <img
                            className={`icon-img ${logo ? `icon-${logo}` : ''} fade-in`}
                            src={`https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_home_/logo_${logo}.svg`}
                        />
                    ) : (
                        <div className="placeholder">{name}</div>
                    )}
                    {logo ? (
                        <img
                            className={`icon-img ${logo ? `icon-${logo}` : ''} fade-out`}
                            src={`https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_home_/logo_${preLogo}.svg`}
                        />
                    ) : (
                        <div className="placeholder">{preName}</div>
                    )}
                </div>
            );
        }
        return (
            <div className="icon-img-wrapper" key={name}>
                {logo ? (
                    <img
                        className={`icon-img ${logo ? `icon-${logo}` : ''}`}
                        src={`https://sf1-cdn-tos.toutiaostatic.com/obj/arco-mobile/_home_/logo_${logo}.svg`}
                    />
                ) : (
                    <div className="placeholder">{name}</div>
                )}
            </div>
        );
    }
    function initAnimation() {
        curActiveRef.current = -1;
        curAnimationPosRef.current = [0, MIN_WINDOW_SHOW_NUM];
        posRandListRef.current = arrayRandom(MIN_WINDOW_SHOW_NUM);
        setShowList(
            productListRef.current
                .slice(0, MIN_WINDOW_SHOW_NUM)
                .map(key => ({ pre: key, cur: key })),
        );
    }
    function startAnimation() {
        timerRef.current = setInterval(() => {
            const [posIndex, productIndex] = curAnimationPosRef.current;
            const whichPos = posRandListRef.current[posIndex];
            const whichProduct = productListRef.current[productIndex];
            showListRef.current[whichPos] = {
                pre: showListRef.current[whichPos].cur,
                cur: whichProduct,
            };
            curActiveRef.current = whichProduct;
            curAnimationPosRef.current = [
                (posIndex + 1) % posRandListRef.current.length,
                (productIndex + 1) % productListRef.current.length,
            ];
            setShowList([...showListRef.current]);
        }, 5 * 1000);
    }

    useEffect(() => {
        whichWindowTypeRef.current === EWindowType.Lower768 && startAnimation();
        const resizeChange = e => {
            const [windowType] = getWindowType(e.target.innerWidth, suppportProduct.length);

            if (windowType !== EWindowType.Lower768) {
                if (whichWindowTypeRef.current !== windowType) {
                    clearInterval(timerRef.current);
                    curActiveRef.current = -1;
                    setShowList(productListRef.current.map(key => ({ pre: key, cur: key })));
                }
            } else {
                if (whichWindowTypeRef.current !== windowType) {
                    initAnimation();
                    startAnimation();
                }
            }
            setWhichWindowType(windowType);
        };
        window.addEventListener('resize', resizeChange);
    }, []);

    const businessList = useMemo(() => {
        if (whichWindowType === EWindowType.Upper768) {
            const batchNum = Math.ceil(productListRef.current.length / MID_WINDOW_SHOW_NUM);
            return (
                <div className="business-icon-group business-icon-group-rows">
                    {Array.from({ length: batchNum }, (_, k) => k).map(order => (
                        <div className="business-icon-group-row" key={order}>
                            {showList
                                .slice(
                                    order * MID_WINDOW_SHOW_NUM,
                                    Math.min(
                                        (order + 1) * MID_WINDOW_SHOW_NUM,
                                        productListRef.current.length,
                                    ),
                                )
                                .map(value => renderItem(value))}
                        </div>
                    ))}
                </div>
            );
        }
        return (
            <div className="business-icon-group">{showList.map(value => renderItem(value))}</div>
        );
    }, [showList, whichWindowType]);
    return (
        <section className="arco-mobile-business-bar">
            <header className="arco-mobile-business-bar-title">
                {localeMap.HomeBusinessBarTitle[language]}
            </header>
            <div className="business-icon-group-wrapper">{businessList}</div>
        </section>
    );
}
