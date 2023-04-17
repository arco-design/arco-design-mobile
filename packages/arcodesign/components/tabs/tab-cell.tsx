import React, {
    useRef,
    forwardRef,
    Ref,
    useImperativeHandle,
    useState,
    useEffect,
    CSSProperties,
} from 'react';
import { cls, scrollWithAnimation, nextTick } from '@arco-design/mobile-utils';
import { TabData, TabCellProps, TabCellRef, TabCellUnderlineRef, OffsetRect } from './type';
import { useSystem } from '../_helpers';
import TabCellUnderline from './tab-cell-underline';

const TabCell = forwardRef((props: TabCellProps, ref: Ref<TabCellRef>) => {
    const {
        tabs,
        prefixCls,
        activeIndex,
        activeIndexRef,
        tabDirection,
        type,
        onTabClick,
        changeIndex,
        tabBarPosition,
        tabBarArrange,
        tabBarScroll,
        tabBarFixed,
        renderUnderline,
        duration,
        transitionDuration,
        useCaterpillar,
        wrapWidth,
        wrapHeight,
        cellTrans,
        distance,
        jumpingDis,
        tabBarExtra,
        onTabBarOverflowChange,
        tabBarGutter,
        tabBarPadding,
        underlineSize,
        underlineThick,
        underlineInnerStyle,
        caterpillarMaxScale,
        caterpillarProperty,
        onTabBarScroll,
        hideTabBarBeforeMounted,
        overflowThreshold = 5,
        tabBarScrollBezier,
        tabBarScrollDuration,
        tabBarScrollChance,
        tabBarHasDivider,
        showUnderline,
        underlineAdaptive,
        disabled,
        renderTabBarItem,
        renderTabBarInner,
        tabBarStyle,
        tabBarClass,
        translateZ,
        tabBarStopPropagation,
    } = props;
    const prefix = `${prefixCls}-tab-cell`;
    const domRef = useRef<HTMLDivElement | null>(null);
    const underlineRef = useRef<TabCellUnderlineRef>(null);
    const allCellRectRef = useRef<OffsetRect[]>([]);
    const [showLine, setShowLine] = useState(false);
    const [hasOverflow, setHasOverflow] = useState(false);
    const [originArrange, setOriginArrange] = useState(() =>
        tabs.length < overflowThreshold ? tabBarArrange : 'start',
    );
    // 默认tab小于overflowThreshold个时不开启加载前隐藏，大于overflowThreshold个时开启
    const [showTab, setShowTab] = useState(() =>
        hideTabBarBeforeMounted === void 0
            ? tabs.length < overflowThreshold || activeIndex === 0
            : !hideTabBarBeforeMounted,
    );
    const isVertical = tabDirection === 'vertical';
    const isLine = (type || '').indexOf('line') !== -1;
    const isCard = type === 'card';
    /**
     * 非card类型才有间隙和两侧留白
     * @en Non-card types have gaps and blank on both sides
     */
    const cellPadding = isCard ? void 0 : tabBarPadding;
    const cellGutter = isCard ? void 0 : tabBarGutter;
    const hasDivider = tabBarHasDivider === void 0 ? isLine : tabBarHasDivider;
    const wrapSize = isVertical ? wrapWidth : wrapHeight;

    const system = useSystem();

    useEffect(() => {
        nextTick(() => {
            setCellOverflow();
            // dom出来之后originArrange置空，交由tabBarArrange控制
            // @en After the dom comes out, originArrange is left empty and controlled by tabBarArrange
            setOriginArrange(void 0);
            // dom出来了才知道布局，计算完成后展示出来防止跳动的情况
            // @en The layout is determined only when the dom comes out. It is displayed to prevent the jumping after the calculation is completed
            setShowTab(true);
            setShowLine(true);
        });
    }, [domRef.current, wrapSize, tabs]);

    useEffect(() => {
        nextTick(() => {
            underlineRef.current?.resetUnderlineStyle();
        });
    }, [
        activeIndex,
        tabs,
        getCellPadding('left'),
        getCellPadding('right'),
        tabBarGutter,
        tabDirection,
    ]);

    useImperativeHandle(
        ref,
        () => ({
            dom: domRef.current,
            scrollTo,
            scrollToCenter,
            hasOverflow,
            setCaterpillarAnimate: ratio => underlineRef.current?.setCaterpillarAnimate(ratio),
            resetUnderlineStyle: () => underlineRef.current?.resetUnderlineStyle(),
        }),
        [scrollToCenter, scrollTo, hasOverflow],
    );

    useEffect(() => {
        if (wrapSize && tabBarScrollChance !== 'none') {
            setTimeout(
                () => {
                    scrollToCenter();
                },
                tabBarScrollChance === 'after-jump'
                    ? Math.max(transitionDuration || 0, duration || 0)
                    : 0,
            );
        }
    }, [activeIndex, wrapSize]);

    useEffect(() => {
        tabBarScrollChance !== 'none' && scrollToCenter(true);
        // TabCell左右可滚动时，防止触发父级touchmove事件导致滚不动
        // @en When the TabCell can be scrolled left and right, prevent the parent touchmove event from being triggered which result in inability to scroll
        const stopFunc = (e: TouchEvent) => e.stopPropagation();
        if (isVertical && hasOverflow && domRef.current && tabBarStopPropagation) {
            domRef.current.addEventListener('touchstart', stopFunc);
            domRef.current.addEventListener('touchmove', stopFunc);
        }
        return () => {
            if (isVertical && hasOverflow && domRef.current && tabBarStopPropagation) {
                domRef.current.removeEventListener('touchstart', stopFunc);
                domRef.current.removeEventListener('touchmove', stopFunc);
            }
        };
    }, [hasOverflow]);

    function setCellOverflow() {
        let overflow = false;
        if (domRef.current) {
            overflow = isVertical
                ? domRef.current.scrollWidth > domRef.current.offsetWidth
                : domRef.current.scrollHeight > domRef.current.offsetHeight;
        }
        if (overflow !== hasOverflow) {
            onTabBarOverflowChange && onTabBarOverflowChange(overflow);
        }
        setHasOverflow(overflow);
    }

    function scrollToCenter(rightNow?: boolean) {
        if (!wrapSize || !hasOverflow) {
            return;
        }
        const currentTabLeft = getTabCenterLeft(activeIndexRef.current);
        const newLeft = currentTabLeft - wrapSize / 2;
        scrollTo(newLeft, rightNow);
    }

    function scrollTo(position: number, rightNow?: boolean) {
        if (!domRef.current) {
            return;
        }
        let needRafScroll = false;
        // 部分安卓机在动画和raf同时执行时会卡顿
        // @en Some Android machines will freeze when animation and raf are executed at the same time
        // 如果是安卓机，且对滚动的时长和变化曲线无要求时，优先用原生顺滑滚动
        // @en If it is an Android device, and there is no requirement for the scrolling duration and change curve, the native smooth scrolling is preferred
        // 当浏览器不支持原生顺滑滚动，或对上述滚动参数有要求时，用raf滚动兜底
        // @en When the browser does not support native smooth scrolling, or there are requirements for the above scrolling parameters, use raf to scroll the bottom line
        if (
            system === 'android' &&
            tabBarScrollBezier === void 0 &&
            tabBarScrollDuration === void 0
        ) {
            try {
                const disObj = isVertical ? { left: position } : { top: position };
                domRef.current.scrollTo({
                    ...disObj,
                    ...(rightNow ? {} : { behavior: 'smooth' }),
                });
            } catch (e) {
                needRafScroll = true;
            }
        } else {
            needRafScroll = true;
        }
        if (needRafScroll) {
            scrollWithAnimation(
                isVertical ? domRef.current.scrollLeft : domRef.current.scrollTop,
                position,
                top => {
                    if (domRef.current) {
                        if (isVertical) {
                            domRef.current.scrollLeft = top;
                        } else {
                            domRef.current.scrollTop = top;
                        }
                    }
                },
                rightNow ? 0 : tabBarScrollDuration,
                tabBarScrollBezier,
            );
        }
    }

    function getTabRect(index: number) {
        const currentTab = allCellRectRef.current[index] || {};
        return {
            left: (isVertical ? currentTab.left : currentTab.top) || 0,
            width: (isVertical ? currentTab.width : currentTab.height) || 0,
        };
    }

    function getTabCenterLeft(index: number) {
        const { left: currentTabLeft, width: currentTabWidth } = getTabRect(index);
        return currentTabLeft + currentTabWidth / 2;
    }

    function getCellPadding(pType: 'left' | 'right') {
        if (typeof cellPadding === 'object') {
            return cellPadding[pType];
        }
        return cellPadding;
    }

    function getCellStyle(index: number): CSSProperties {
        if (!isVertical) {
            return {};
        }
        if (index === 0) {
            return {
                marginRight: cellGutter,
                marginLeft: getCellPadding('left'),
            };
        }
        return {
            marginRight: index === tabs.length - 1 ? void 0 : cellGutter,
        };
    }

    function renderBarItem(tab: TabData, index: number) {
        if (renderTabBarItem) {
            return renderTabBarItem(tab, index, { active: index === activeIndex });
        }
        return typeof tab === 'string' ? tab : tab.title;
    }

    function renderTabUnderline() {
        if (!showUnderline || !isLine) {
            return null;
        }
        const lineProps = {
            prefix,
            showLine,
            useCaterpillar,
            distance,
            tabDirection,
            underlineInnerStyle,
            cellTrans,
            duration,
            activeIndex,
            wrapWidth,
            wrapHeight,
            jumpingDis,
            caterpillarMaxScale,
            caterpillarProperty,
            translateZ,
            underlineSize,
            underlineThick,
            underlineAdaptive,
            renderUnderline,
        };
        return (
            <TabCellUnderline
                ref={underlineRef}
                getTabCenterLeft={getTabCenterLeft}
                getTabRect={getTabRect}
                {...lineProps}
            />
        );
    }

    const cellInner = (
        <>
            {tabs.map((tab, index) => (
                <div
                    key={index}
                    className={cls(
                        prefix,
                        tabDirection,
                        type,
                        system,
                        { active: index === activeIndex },
                        { 'no-shrink': tabBarScroll },
                        { last: index === tabs.length - 1 },
                        { custom: Boolean(renderTabBarItem) },
                    )}
                    style={getCellStyle(index)}
                    onClick={e => {
                        if (disabled) {
                            return;
                        }
                        changeIndex(index, 'click');
                        onTabClick && onTabClick(tab, index, e);
                    }}
                    ref={innerRef => {
                        // distance=0 说明不在滑动切换，减少计算次数
                        if (innerRef && !distance) {
                            allCellRectRef.current[index] = {
                                top: innerRef.offsetTop,
                                left: innerRef.offsetLeft,
                                width: innerRef.offsetWidth,
                                height: innerRef.offsetHeight,
                            };
                        }
                    }}
                >
                    {renderBarItem(tab, index)}
                </div>
            ))}
            {cellPadding && !isCard && isVertical ? (
                <div
                    className="fake-padding"
                    style={{
                        width: getCellPadding('right'),
                        height: '100%',
                    }}
                />
            ) : null}
        </>
    );

    return (
        <div
            className={cls(
                `${prefix}-container-wrap`,
                tabDirection,
                `type-${type}`,
                tabBarClass,
                system,
            )}
            style={tabBarStyle}
        >
            <div
                className={cls(
                    `${prefix}-container-inner`,
                    tabDirection,
                    `pos-${tabBarPosition}`,
                    `type-${type}`,
                    { fixed: tabBarFixed },
                    { 'has-divider': hasDivider },
                )}
            >
                <div
                    className={cls(
                        `${prefix}-container`,
                        tabDirection,
                        `pos-${tabBarPosition}`,
                        `arrange-${originArrange || tabBarArrange}`,
                        `type-${type}`,
                        { overflow: hasOverflow },
                        { shown: showTab },
                    )}
                    ref={domRef}
                    onScroll={onTabBarScroll}
                >
                    {renderTabBarInner ? renderTabBarInner(cellInner) : cellInner}
                    {renderTabUnderline()}
                </div>
                {tabBarExtra}
            </div>
        </div>
    );
});

export default TabCell;
