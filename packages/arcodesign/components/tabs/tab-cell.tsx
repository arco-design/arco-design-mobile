import React, {
    useRef,
    forwardRef,
    Ref,
    useImperativeHandle,
    useState,
    useEffect,
    CSSProperties,
    useMemo,
} from 'react';
import {
    cls,
    scrollWithAnimation,
    nextTick,
    addCssKeyframes,
    removeCssStyleDom,
} from '@arco-design/mobile-utils';
import { TabsProps, UnderlineStyle, TabData } from '.';
import { useSystem, getStyleWithVendor, useRefState } from '../_helpers';

interface OffsetRect {
    left: number;
    top: number;
    width: number;
    height: number;
}

export interface TabCellProps
    extends Pick<
        TabsProps,
        | 'tabs'
        | 'type'
        | 'onTabClick'
        | 'tabBarPosition'
        | 'tabBarArrange'
        | 'tabBarScroll'
        | 'tabBarFixed'
        | 'renderUnderline'
        | 'duration'
        | 'transitionDuration'
        | 'useCaterpillar'
        | 'tabBarExtra'
        | 'onTabBarOverflowChange'
        | 'tabBarGutter'
        | 'tabBarPadding'
        | 'underlineSize'
        | 'underlineThick'
        | 'underlineInnerStyle'
        | 'caterpillarMaxScale'
        | 'caterpillarProperty'
        | 'onTabBarScroll'
        | 'hideTabBarBeforeMounted'
        | 'tabBarScrollBezier'
        | 'tabBarScrollDuration'
        | 'tabBarScrollChance'
        | 'tabBarHasDivider'
        | 'tabBarStyle'
        | 'tabBarClass'
        | 'mode'
        | 'overflowThreshold'
        | 'showUnderline'
        | 'disabled'
        | 'renderTabBarItem'
        | 'renderTabBarInner'
        | 'translateZ'
    > {
    /**
     * 类前缀
     * @en prefix classname
     */
    prefixCls?: string;
    /**
     * 当前选中 Tab
     * @en Currently selected Tab
     */
    activeIndex: number;
    /**
     * 当前选中 Tab ref
     * @en Currently selected Tab ref
     */
    activeIndexRef: React.MutableRefObject<number>;
    /**
     * Tab 布局方向，横向 or 竖向
     * @en Tab layout direction, horizontal or vertical
     */
    tabDirection: 'horizontal' | 'vertical';
    /**
     * 修改选中 Tab
     * @en Modify selected Tab
     */
    changeIndex: (newIndex: number, from?: string) => void;
    /**
     * 外层容器宽度
     * @en Wrapper container width
     */
    wrapWidth: number;
    /**
     * 外层容器高度
     * @en Wrapper container height
     */
    wrapHeight: number;
    /**
     * TabBar是否启用过渡效果
     * @en Whether the TabBar enables transition effects
     */
    cellTrans: boolean;
    /**
     * 手指滑动距离
     * @en Finger sliding distance
     */
    distance: number;
    /**
     * 下划线已滑动的距离
     * @en The distance the underline has been swiped
     */
    jumpingDis: number;
}

export interface TabCellRef {
    /**
     * 外层元素 DOM
     * @en Outer element DOM
     */
    dom: HTMLDivElement | null;
    /**
     * 当前 TabBar 宽度是否已溢出
     * @en Whether the current TabBar width has overflowed
     */
    hasOverflow: boolean;
    /**
     * 滚动 bar 到指定位置，tabs 上下布局时是以 x 轴滚动，左右布局时以 y 轴滚动
     * @en Scroll the bar to the specified position, the tabs are scrolled on the x-axis when the tabs are laid out up and down, and the y-axis is scrolled when the tabs are laid out left and right
     */
    scrollTo: (position: number, rightNow?: boolean) => void;
    /**
     * 滚动 bar 使当前选中item到屏幕中间
     * @en Scroll the bar to bring the currently selected item to the middle of the screen
     */
    scrollToCenter: (rightNow?: boolean) => void;
    /**
     * 触发毛毛虫动画
     * @en Trigger caterpillar animation
     */
    setCaterpillarAnimate: (ratio?: number) => void;
    /**
     * 重新计算下划线样式
     * @en Recalculate underline style
     */
    resetUnderlineStyle: () => void;
}

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
        disabled,
        renderTabBarItem,
        renderTabBarInner,
        tabBarStyle,
        tabBarClass,
        translateZ,
    } = props;
    const prefix = `${prefixCls}-tab-cell`;
    const domRef = useRef<HTMLDivElement | null>(null);
    const lineRef = useRef<HTMLDivElement | null>(null);
    const timeRef = useRef(0);
    const allCellRectRef = useRef<OffsetRect[]>([]);
    const [underlineStyle, setUnderlineStyle] = useState<UnderlineStyle>({});
    const [caterpillar, caterpillarRef, setCaterpillar] = useRefState(false);
    const [caterpillarDelay, setCaterpillarDelay] = useState(0);
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
    const [showLine, setShowLine] = useState(false);
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
    const translateZStr = translateZ ? ' translateZ(0)' : '';

    const system = useSystem();
    const maxScaleWithDefault = caterpillarMaxScale || 2;
    const animationKey = useMemo(() => {
        if (!showUnderline || !useCaterpillar) {
            return '';
        }
        if (caterpillarProperty === 'size') {
            return `tabsCaterpillar${isVertical ? 'W' : 'H'}${maxScaleWithDefault}`;
        }
        if (caterpillarMaxScale) {
            return `tabsCaterpillar${isVertical ? 'X' : 'Y'}${caterpillarMaxScale}`;
        }
        return '';
    }, [showUnderline, useCaterpillar, isVertical, caterpillarMaxScale, caterpillarProperty]);

    useEffect(() => {
        if (!animationKey) {
            return;
        }
        const dir = isVertical ? 'X' : 'Y';
        if (caterpillarProperty === 'size') {
            const attr = isVertical ? 'width' : 'height';
            addCssKeyframes(
                animationKey,
                `{
                    0% {
                        ${attr}: 100%;
                    }
                    50% {
                        ${attr}: ${100 * maxScaleWithDefault}%;
                    }
                    100% {
                        ${attr}: 100%;
                    }
                }`,
            );
            return;
        }
        addCssKeyframes(
            animationKey,
            `{
                0% {
                    transform: scale${dir}(1)${translateZStr};
                    -webkit-transform: scale${dir}(1)${translateZStr};
                }
                50% {
                    transform: scale${dir}(${caterpillarMaxScale})${translateZStr};
                    -webkit-transform: scale${dir}(${caterpillarMaxScale})${translateZStr};
                }
                100% {
                    transform: scale${dir}(1)${translateZStr};
                    -webkit-transform: scale${dir}(1)${translateZStr};
                }
            }`,
        );
        return () => {
            removeCssStyleDom(animationKey);
        };
    }, [animationKey]);

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
        resetUnderlineStyle();
    }, [
        useCaterpillar,
        caterpillar,
        cellTrans,
        duration,
        tabDirection,
        wrapWidth,
        wrapHeight,
        distance,
        animationKey,
        caterpillarDelay,
    ]);

    useEffect(() => {
        nextTick(() => {
            resetUnderlineStyle();
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
            setCaterpillarAnimate,
            resetUnderlineStyle,
        }),
        [scrollToCenter, scrollTo, hasOverflow, setCaterpillarAnimate, resetUnderlineStyle],
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
        if (isVertical && hasOverflow && domRef.current) {
            domRef.current.addEventListener('touchstart', stopFunc);
            domRef.current.addEventListener('touchmove', stopFunc);
        }
        return () => {
            if (isVertical && hasOverflow && domRef.current) {
                domRef.current.removeEventListener('touchstart', stopFunc);
                domRef.current.removeEventListener('touchmove', stopFunc);
            }
        };
    }, [hasOverflow]);

    useEffect(() => {
        if (jumpingDis && useCaterpillar && system !== 'ios') {
            const movedRatio = wrapWidth ? jumpingDis / wrapWidth : 0;
            setCaterpillarAnimate(movedRatio);
        }
    }, [jumpingDis]);

    function resetUnderlineStyle() {
        setUnderlineStyle(getUnderlineStyle());
    }

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

    function getUnderlineStyle(): UnderlineStyle {
        const transStyle: CSSProperties = {};
        if (useCaterpillar) {
            transStyle.animationDuration = `${duration}ms`;
        }
        if (caterpillarRef.current && animationKey) {
            transStyle.animationName = animationKey;
        }
        if (caterpillarDelay) {
            transStyle.animationDelay = `-${caterpillarDelay}ms`;
        }
        const lineStyle: UnderlineStyle = getLineStyle();
        return {
            outer: getStyleWithVendor({
                transitionDuration: cellTrans ? `${duration}ms` : '0ms',
                ...(lineStyle.outer || {}),
            }),
            inner: getStyleWithVendor({
                ...transStyle,
                ...(lineStyle.inner || {}),
            }),
        };
    }

    function getLineStyle(): UnderlineStyle {
        if (!lineRef.current || !domRef.current) {
            return {};
        }
        const currentLeft = getLineLeft(activeIndex);
        const descIndex = getDescIndex();
        const descLeft = getLineLeft(descIndex);
        const moveRatio = wrapWidth ? distance / wrapWidth : 0;
        const leftOffset = moveRatio * (currentLeft - descLeft);
        const direc = isVertical ? 'X' : 'Y';
        const transStyle =
            useCaterpillar && !jumpingDis
                ? caterpillarProperty === 'size'
                    ? {
                          [isVertical ? 'width' : 'height']: `${100 * getLineScale(moveRatio)}%`,
                          willChange: 'width',
                      }
                    : {
                          transform: `scale${direc}(${getLineScale(moveRatio)})`,
                      }
                : {};
        const outerSize = isVertical
            ? {
                  width: underlineSize,
                  height: underlineThick,
              }
            : {
                  height: underlineSize,
                  width: underlineThick,
              };
        return {
            outer: {
                transform: `translate${direc}(${
                    distance > 0 ? currentLeft - leftOffset : currentLeft + leftOffset
                }px)${translateZStr}`,
                ...outerSize,
            },
            inner: {
                ...transStyle,
            },
        };
    }

    function getLineLeft(index) {
        const offsetSize = isVertical
            ? lineRef.current?.offsetWidth
            : lineRef.current?.offsetHeight;
        const lineWidth = offsetSize || 0;
        return getTabCenterLeft(index) - lineWidth / 2;
    }

    function getTabCenterLeft(index) {
        const currentTab = allCellRectRef.current[index] || {};
        const currentTabWidth = (isVertical ? currentTab.width : currentTab.height) || 0;
        const currentTabLeft = (isVertical ? currentTab.left : currentTab.top) || 0;
        return currentTabLeft + currentTabWidth / 2;
    }

    function getLineScale(ratio: number) {
        const absRatio = Math.abs(ratio);
        return absRatio > 0.5
            ? (1 - absRatio) * 2 * (maxScaleWithDefault - 1) + 1
            : absRatio * 2 * (maxScaleWithDefault - 1) + 1;
    }

    function getDescIndex() {
        if (distance > 0) {
            return activeIndex - 1;
        }
        if (distance < 0) {
            return activeIndex + 1;
        }
        return activeIndex;
    }

    function setCaterpillarAnimate(movedRatio = 0) {
        if (!duration) {
            return;
        }
        const movedTime = (duration || 0) * Math.abs(movedRatio);
        setCaterpillarDelay(movedTime);
        nextTick(() => {
            setCaterpillar(true);
        });
        if (timeRef.current) {
            clearTimeout(timeRef.current);
        }
        timeRef.current = window.setTimeout(() => {
            setCaterpillar(false);
            setCaterpillarDelay(0);
        }, (duration || 0) - movedTime + 20);
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
        return renderUnderline ? (
            renderUnderline(underlineStyle, showLine, lineRef)
        ) : (
            <div
                className={cls(`${prefix}-underline`, { show: showLine })}
                ref={lineRef}
                style={underlineStyle.outer}
            >
                <div
                    className={cls(
                        `${prefix}-underline-inner`,
                        {
                            caterpillar,
                            'custom-animate': animationKey,
                            'caterpillar-moving': caterpillar || (useCaterpillar && distance),
                        },
                        tabDirection,
                    )}
                    style={{
                        ...(underlineStyle.inner || {}),
                        ...(underlineInnerStyle || {}),
                    }}
                />
            </div>
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
