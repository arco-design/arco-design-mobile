import React, {
    useRef,
    forwardRef,
    Ref,
    useImperativeHandle,
    ReactNodeArray,
    useState,
    useEffect,
    useCallback,
} from 'react';
import { cls, nextTick } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import TabCell from './tab-cell';
import TabPane from './tab-pane';
import {
    useRefState,
    useListenResize,
    useUpdateEffect,
    useSwiperInnerScroll,
    useSystem,
} from '../_helpers';
import { TabCellRef, TabPaneRef, TabsProps, TabsRef } from './type';

export * from './type';

/**
 * 用于让用户在不同的视图中进行切换。为优化移动端渲染性能，如有替换DOM、发请求更新数据等操作，请在`onAfterChange`而非`onChange`回调中进行。
 * @en Used to let the user switch between different views. In order to optimize the rendering performance of the mobile terminal, if you need to replace the DOM, send a request to update data, etc., please do it in the `onAfterChange` instead of the `onChange` callback.
 * @type 导航
 * @type_en Navigation
 * @name 选项卡
 * @name_en Tabs
 */
const Tabs = forwardRef((props: TabsProps, ref: Ref<TabsRef>) => {
    const {
        className,
        style,
        tabs = [],
        tabBarPosition = 'top',
        activeTab,
        defaultActiveTab = 0,
        children,
        onChange,
        onAfterChange,
        onTabClick,
        onTabBarOverflowChange,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        onTabBarScroll,
        onDistanceChange,
        onScroll,
        type = 'line',
        swipeable = true,
        disabled,
        tabBarArrange = 'center',
        tabBarScroll = true,
        tabBarFixed,
        tabBarExtra,
        tabBarScrollBezier,
        tabBarScrollDuration,
        tabBarScrollChance = 'jump',
        tabBarHasDivider,
        tabBarResetWhenScroll = 'touchmove',
        stopPropagation = true,
        getInnerScrollContainer,
        mode = 'swipe',
        getScrollContainer,
        scrollThrottle = 300,
        scrollOffset = 0,
        scrollWhenMounted,
        goLastWhenScrollBottom = true,
        scrollVertical = true,
        renderUnderline,
        renderTabBar,
        renderTabBarItem,
        renderTabBarInner,
        duration = 240,
        transitionDuration = 300,
        useCaterpillar = false,
        distanceToChangeTab = 10,
        percentToChangeTab = 0.3,
        speedToChangeTab = 200,
        disableClickTransition = true,
        lazyloadCount,
        hideContentStyle = null,
        renderHideContent,
        hideTabBarBeforeMounted,
        overflowThreshold = 5,
        tabBarGutter,
        tabBarPadding,
        underlineSize,
        underlineThick,
        underlineInnerStyle,
        caterpillarMaxScale,
        caterpillarProperty = 'scale',
        showUnderline = true,
        underlineAdaptive = false,
        stopTouchThreshold = 0,
        touchSideDisableThreshold = 0,
        onTouchStopped,
        tabBarStyle,
        tabPaneStyle,
        tabBarClass,
        tabPaneClass,
        tabPaneExtra,
        translateZ = true,
        fullScreen,
        autoHeight,
        tabBarStopPropagation = true,
        swipeEnergySaving = false,
    } = props;
    const domRef = useRef<HTMLDivElement | null>(null);
    const cellRef = useRef<TabCellRef | null>(null);
    const paneRef = useRef<TabPaneRef | null>(null);
    const [innerIndex, setInnerIndex] = useState(defaultActiveTab);
    const [jumpingDis, setJumpingDis] = useState(0);
    const [wrapWidth, setWrapWidth] = useState(0);
    const [wrapHeight, setWrapHeight] = useState(0);
    const [cellTrans, setCellTrans] = useState(false);
    const [paneTrans, setPaneTrans] = useState(false);
    const [activeIndex, activeIndexRef, setActiveIndex] = useRefState(
        activeTab === void 0 ? innerIndex : activeTab,
    );
    const [distance, distanceRef, setDistance] = useRefState(0);
    const posAdjustingRef = useRef(false);
    const touchStartedRef = useRef(false);
    const touchStartXRef = useRef(0);
    const touchStartYRef = useRef(0);
    const touchStartTimeRef = useRef(0);
    const scrollingRef = useRef<boolean | null>(null);
    const touchStoppedRef = useRef(false);
    const changeFromRef = useRef('');
    const touchMoveBarScrollRef = useRef(false);
    const system = useSystem();
    const allPanes = getAllPanes();
    const tabDirection =
        ['top', 'bottom'].indexOf(tabBarPosition) !== -1 ? 'vertical' : 'horizontal';
    const canSwipe =
        mode === 'swipe' &&
        !disabled &&
        swipeable &&
        tabDirection === 'vertical' &&
        tabs.length > 1;

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
        bar: cellRef.current,
        pane: paneRef.current,
        barOverflow: cellRef.current ? cellRef.current.hasOverflow : false,
        updateLayout,
        changeIndex: (newIndex: number, rightNow?: boolean) =>
            changeIndex(newIndex, 'manual', rightNow),
        scrollToIndex: paneRef.current ? paneRef.current.scrollToIndex : () => {},
    }));

    useListenResize(updateLayout);

    useSwiperInnerScroll(getInnerScrollContainer);

    useEffect(() => {
        if (distanceToChangeTab > 0 && distanceToChangeTab < 1) {
            console.warn(
                `[Tabs Props Warning] The value of the prop \`distanceToChangeTab\` is too small(${distanceToChangeTab}). Do you meant to use the prop \`percentToChangeTab\`?`,
            );
        }
    }, [distanceToChangeTab]);

    useEffect(() => {
        updateLayout();
        if (mode === 'scroll') {
            // 判断初始是否滚动时，如果指定了scrollWhenMounted则看它的值，否则看是否默认选中第一个
            // @en When judging whether to scroll initially, if scrollWhenMounted is specified, see its value, otherwise, see if the first one is selected by default
            const needScroll = scrollWhenMounted === void 0 ? activeIndex !== 0 : scrollWhenMounted;
            if (needScroll) {
                paneRef.current?.scrollToIndex(activeIndex, true);
            }
        }
    }, []);

    useEffect(() => {
        paneRef.current && paneRef.current.setCurrentHeight();
    }, [children, activeIndex, autoHeight]);

    useEffect(() => {
        // 受控时用受控值，否则用内部值
        // @en When controlled, use the controlled value, otherwise use the internal value
        setActiveIndex(activeTab === void 0 ? innerIndex : activeTab);
    }, [activeTab, innerIndex]);

    useUpdateEffect(() => {
        // 利用受控手动更改index时，给cell line加上动画
        // @en Animate the cell line when changeing the index
        setCellTrans(true);
        changeFromRef.current = 'manual';
    }, [activeTab]);

    useUpdateEffect(() => {
        onDistanceChange && onDistanceChange(distance, wrapWidth, activeIndex);
    }, [distance, wrapWidth, activeIndex]);

    useUpdateEffect(() => {
        if (changeFromRef.current !== 'scroll' && mode === 'scroll') {
            paneRef.current?.scrollToIndex(activeIndex);
        }
        if (changeFromRef.current === 'click' && useCaterpillar) {
            cellRef.current?.setCaterpillarAnimate();
        }
        const changeFrom = changeFromRef.current;
        changeFromRef.current = '';
        nextTick(() => {
            setTimeout(
                () => {
                    onAfterChange && onAfterChange(tabs[activeIndex], activeIndex, changeFrom);
                },
                paneRef.current ? paneRef.current.getTransition() : 0,
            );
        });
    }, [activeIndex]);

    const handlePaneTouchStart = useCallback(
        (e: TouchEvent) => {
            if (onTouchStart && onTouchStart(e, activeIndexRef.current)) {
                return;
            }
            if (posAdjustingRef.current) {
                return;
            }
            touchStartedRef.current = true;
            setCellTrans(false);
            setPaneTrans(false);
            const evt = e.touches[0];
            touchStartXRef.current = evt.clientX || 0;
            touchStartYRef.current = evt.clientY || 0;
            scrollingRef.current = null;
            posAdjustingRef.current = false;
            touchStartTimeRef.current = new Date().getTime();
            touchStoppedRef.current = false;
        },
        [onTouchStart],
    );

    const handlePaneTouchMove = useCallback(
        (e: TouchEvent) => {
            if (onTouchMove && onTouchMove(e, activeIndexRef.current)) {
                return;
            }
            // 从屏幕边缘开始滑动时，屏蔽tabs滑动事件
            if (touchStartXRef.current < touchSideDisableThreshold) {
                return;
            }
            stopPropagation && e.stopPropagation();
            if (!touchStartedRef.current || posAdjustingRef.current) {
                e.cancelable && e.preventDefault();
                return;
            }
            const evt = e.changedTouches[0];
            const touchMoveX = evt.clientX || 0;
            const touchMoveY = evt.clientY || 0;
            // bugfix: 兼容safari在右滑返回上一页时clientX为负值的情况，安卓有折叠屏，触点会有超出屏幕(clientX < 0)的情况，因此这里限定ios系统
            // @en bugfix: bugfix: Compatible with the case in safari where clientX is negative when swiping right back to the previous page
            const posDisX =
                system === 'ios' && touchMoveX < 0 ? 0 : touchMoveX - touchStartXRef.current;
            const posDisY = touchMoveY - touchStartYRef.current;
            const absDisX = Math.abs(posDisX);
            const absDisY = Math.abs(posDisY);
            if (scrollingRef.current === null) {
                scrollingRef.current = absDisX < absDisY;
            }
            // 如果是在上下滚动页面则禁用滑动手势
            // @en Disable swipe gestures if scrolling up and down
            if (scrollingRef.current) {
                if (tabBarResetWhenScroll === 'touchmove' && !touchMoveBarScrollRef.current) {
                    cellRef.current && cellRef.current.scrollToCenter();
                    touchMoveBarScrollRef.current = true;
                }
                setDistance(0);
                return;
            }
            if (
                (activeIndexRef.current === 0 && posDisX > 0) ||
                (activeIndexRef.current === tabs.length - 1 && posDisX < 0)
            ) {
                if (!touchStoppedRef.current && absDisX > stopTouchThreshold) {
                    touchStoppedRef.current = true;
                    onTouchStopped && onTouchStopped(posDisX >= 0 ? -1 : 1);
                }
                setDistance(0);
                return;
            }
            e.cancelable && e.preventDefault();
            setDistance(posDisX);
        },
        [
            onTouchMove,
            onTouchStopped,
            stopTouchThreshold,
            tabs.length,
            touchSideDisableThreshold,
            tabBarResetWhenScroll,
            stopPropagation,
        ],
    );

    useEffect(() => {
        if (paneRef.current && paneRef.current.dom && canSwipe) {
            paneRef.current.dom.addEventListener('touchstart', handlePaneTouchStart);
            paneRef.current.dom.addEventListener('touchmove', handlePaneTouchMove);
        }
        return () => {
            if (paneRef.current && paneRef.current.dom && canSwipe) {
                paneRef.current.dom.removeEventListener('touchstart', handlePaneTouchStart);
                paneRef.current.dom.removeEventListener('touchmove', handlePaneTouchMove);
            }
        };
    }, [handlePaneTouchStart, handlePaneTouchMove, canSwipe]);

    function handlePaneTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
        if (onTouchEnd && onTouchEnd(e.nativeEvent, activeIndexRef.current)) {
            return;
        }
        stopPropagation && e.stopPropagation();
        touchMoveBarScrollRef.current = false;
        if (scrollingRef.current && tabBarResetWhenScroll === 'touchend') {
            cellRef.current && cellRef.current.scrollToCenter();
        }
        if (!touchStartedRef.current || posAdjustingRef.current || scrollingRef.current) {
            return;
        }
        touchStartedRef.current = false;
        setCellTrans(true);
        setPaneTrans(true);
        const touchEndTime = new Date().getTime();
        const dis = distanceRef.current;
        const speed = (dis / (touchEndTime - touchStartTimeRef.current)) * 1000;
        const maxSlice = wrapWidth * percentToChangeTab;
        const index = activeIndexRef.current;
        const needJump =
            (Math.abs(dis) > maxSlice && Math.abs(dis) > distanceToChangeTab) ||
            Math.abs(speed) > speedToChangeTab;
        let newIndex = index;
        if (dis > 0 && needJump) {
            newIndex = index - 1;
        } else if (dis < 0 && needJump) {
            newIndex = index + 1;
        }
        nextTick(() => {
            jumpTo(newIndex);
        });
    }

    function jumpTo(newIndex: number) {
        posAdjustingRef.current = true;
        if (newIndex !== activeIndexRef.current) {
            setJumpingDis(distanceRef.current);
        }
        changeIndex(newIndex, 'swipe');
        touchStartTimeRef.current = 0;
        setTimeout(() => {
            posAdjustingRef.current = false;
            setJumpingDis(0);
        }, transitionDuration);
    }

    function updateLayout() {
        cellRef.current && cellRef.current.resetUnderlineStyle();
        setWrapWidth(domRef.current ? domRef.current.offsetWidth : 0);
        setWrapHeight(domRef.current ? domRef.current.offsetHeight : 0);
        paneRef.current && paneRef.current.setCurrentHeight();
    }

    function getAllPanes(): ReactNodeArray {
        let panes: ReactNodeArray = children ? [children] : [];
        if (children && Object.prototype.toString.call(children) === '[object Array]') {
            panes = children as ReactNodeArray;
        }
        // panes不可超过tabs.length
        return panes.slice(0, tabs.length);
    }

    function changeIndex(newIndex: number, changeFrom?: string, rightNow?: boolean) {
        if (rightNow || (changeFrom === 'click' && disableClickTransition)) {
            setPaneTrans(false);
        } else {
            setPaneTrans(true);
        }
        changeFromRef.current = changeFrom || '';
        setCellTrans(true);
        setInnerIndex(newIndex);
        setDistance(0);
        if (newIndex !== activeIndexRef.current) {
            onChange && onChange(tabs[newIndex], newIndex, changeFrom);
        }
    }

    return (
        <ContextLayout>
            {({ prefixCls }) => {
                const prefix = `${prefixCls}-tabs`;
                const commonProps = {
                    prefixCls,
                    activeIndex,
                    activeIndexRef,
                    tabDirection: tabDirection as 'horizontal' | 'vertical',
                    changeIndex,
                    duration,
                    transitionDuration,
                    wrapWidth,
                    wrapHeight,
                    distance,
                    mode,
                    translateZ,
                    fullScreen,
                };
                const cellProps = {
                    ref: cellRef,
                    tabs,
                    onTabClick,
                    type,
                    tabBarPosition,
                    tabBarArrange,
                    tabBarScroll,
                    renderUnderline,
                    useCaterpillar,
                    cellTrans,
                    jumpingDis,
                    tabBarExtra,
                    onTabBarOverflowChange,
                    tabBarGutter,
                    tabBarPadding,
                    tabBarFixed,
                    tabBarScrollBezier,
                    tabBarScrollDuration,
                    tabBarScrollChance,
                    tabBarHasDivider,
                    underlineSize,
                    underlineThick,
                    underlineInnerStyle,
                    caterpillarMaxScale,
                    caterpillarProperty,
                    onTabBarScroll,
                    hideTabBarBeforeMounted,
                    overflowThreshold,
                    showUnderline,
                    underlineAdaptive,
                    disabled,
                    renderTabBarItem,
                    renderTabBarInner,
                    tabBarStyle,
                    tabBarClass,
                    tabBarStopPropagation,
                    ...commonProps,
                };
                const CellComp = <TabCell {...cellProps} />;
                return (
                    <div
                        className={cls(
                            `${prefix} ${prefix}-${tabBarPosition} ${prefix}-${tabDirection} all-border-box`,
                            { 'full-screen': fullScreen },
                            className || '',
                        )}
                        style={style}
                        ref={domRef}
                    >
                        {renderTabBar ? renderTabBar(CellComp, cellProps) : CellComp}
                        <TabPane
                            ref={paneRef}
                            panes={allPanes}
                            handlePaneTouchEnd={handlePaneTouchEnd}
                            paneTrans={paneTrans}
                            swipeable={canSwipe}
                            lazyloadCount={lazyloadCount}
                            hideContentStyle={hideContentStyle}
                            renderHideContent={renderHideContent}
                            tabPaneStyle={tabPaneStyle}
                            getScrollContainer={getScrollContainer}
                            scrollThrottle={scrollThrottle}
                            scrollOffset={scrollOffset}
                            goLastWhenScrollBottom={goLastWhenScrollBottom}
                            scrollVertical={scrollVertical}
                            tabPaneClass={tabPaneClass}
                            tabPaneExtra={tabPaneExtra}
                            autoHeight={autoHeight}
                            onScroll={onScroll}
                            swipeEnergySaving={swipeEnergySaving}
                            {...commonProps}
                        />
                    </div>
                );
            }}
        </ContextLayout>
    );
});

export default Tabs;
