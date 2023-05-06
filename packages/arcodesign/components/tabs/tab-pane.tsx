import React, {
    useRef,
    forwardRef,
    Ref,
    useImperativeHandle,
    CSSProperties,
    useState,
    useEffect,
    useMemo,
} from 'react';
import lodashThrottle from 'lodash.throttle';
import { cls, scrollWithAnimation, getScrollContainerRect } from '@arco-design/mobile-utils';
import { getStyleWithVendor } from '../_helpers';
import { TabPaneProps, TabPaneRef } from './type';

const TabPane = forwardRef((props: TabPaneProps, ref: Ref<TabPaneRef>) => {
    const {
        prefixCls,
        panes,
        tabDirection,
        activeIndex,
        activeIndexRef,
        distance,
        wrapWidth,
        wrapHeight,
        handlePaneTouchEnd,
        transitionDuration,
        paneTrans,
        swipeable,
        lazyloadCount,
        hideContentStyle,
        renderHideContent,
        mode,
        tabPaneStyle,
        tabPaneClass,
        tabPaneExtra,
        getScrollContainer,
        scrollThrottle,
        scrollOffset = 0,
        goLastWhenScrollBottom,
        scrollVertical,
        translateZ,
        fullScreen,
        autoHeight,
        swipeEnergySaving,
        changeIndex,
        onScroll,
    } = props;
    const domRef = useRef<HTMLDivElement | null>(null);
    const panesRef = useRef<(HTMLDivElement | null)[]>([]);
    const autoScrollingRef = useRef(false);
    const timerRef = useRef(0);
    const [shownIndexes, setShownIndexes] = useState<[number, number]>([activeIndex, activeIndex]);
    const [shownActiveIndex, setShownActiveIndex] = useState(activeIndex);
    const prefix = `${prefixCls}-tab-pane`;
    const handleTouchEnd = swipeable ? handlePaneTouchEnd : void 0;
    const [currentPaneHeight, setCurrentPaneHeight] = useState<number | string>('auto');

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
        getTransition,
        scrollToIndex,
        setCurrentHeight,
    }));

    useEffect(() => {
        if (mode === 'swipe') {
            setTimeout(() => {
                calcShownIndexes();
            }, getTransition());
        }
    }, [lazyloadCount, activeIndex, mode]);

    const scrollHandler = useMemo(() => {
        if (mode !== 'scroll') {
            return () => {};
        }
        const handler = () => {
            onScroll?.();
            if (autoScrollingRef.current) {
                return;
            }
            const container = getScrollContainer ? getScrollContainer() : window;
            if (!container) return;
            const { containerTop, containerBottom } = getContainerTop(container);
            for (let i = 0; i < panes.length; i += 1) {
                // 判断范围：-∞ ... top0 ... top1 ... top n ... ∞
                // @en Judge the range: (-∞, top0, top1, ...top n, ∞)
                const curPaneTop = i === 0 ? -Infinity : getRectTop(panesRef.current[i]);
                const nextPaneTop =
                    i === panes.length - 1 ? Infinity : getRectTop(panesRef.current[i + 1]);
                if (
                    containerTop >= curPaneTop - scrollOffset &&
                    containerTop < nextPaneTop - scrollOffset
                ) {
                    changeIndex(i, 'scroll');
                    break;
                }
            }
            if (goLastWhenScrollBottom) {
                const lastIndex = panes.length - 1;
                const curPaneBottom = getRectTop(panesRef.current[lastIndex], 'bottom');
                if (containerBottom === curPaneBottom) {
                    changeIndex(lastIndex, 'scroll');
                }
            }
        };
        return scrollThrottle ? lodashThrottle(handler, scrollThrottle) : handler;
    }, [
        mode,
        scrollThrottle,
        getScrollContainer,
        panes.length,
        scrollOffset,
        goLastWhenScrollBottom,
        scrollVertical,
        onScroll,
    ]);

    useEffect(() => {
        const container = getScrollContainer?.() || window;
        if (container && mode === 'scroll') {
            container.addEventListener('scroll', scrollHandler);
        }
        return () => {
            if (container && mode === 'scroll') {
                container.removeEventListener('scroll', scrollHandler);
            }
        };
    }, [scrollHandler]);

    function setCurrentHeight() {
        if (!domRef.current || !autoHeight || mode !== 'swipe' || tabDirection !== 'vertical') {
            return;
        }
        const allPanesDom = panesRef.current;
        const nowIndex = activeIndexRef.current;
        const currentHeight = (allPanesDom[nowIndex] || {}).offsetHeight || 'auto';
        setCurrentPaneHeight(currentHeight);
    }

    function calcShownIndexes() {
        setShownActiveIndex(activeIndex);
        if (typeof lazyloadCount === 'number') {
            setShownIndexes([activeIndex - lazyloadCount, activeIndex + lazyloadCount]);
            return;
        }
        setShownIndexes([0, Infinity]);
    }

    function getTransition() {
        return paneTrans ? transitionDuration || 0 : 0;
    }

    function scrollToIndex(index: number, rightNow?: boolean) {
        const container = getScrollContainer?.() || window;
        const { isGlobal, scrollEle, containerTop } = getContainerTop(container);
        const curPaneTop = getRectTop(panesRef.current[index]);
        const topDis = curPaneTop - containerTop - scrollOffset;
        const scrollAttr = scrollVertical ? 'scrollTop' : 'scrollLeft';
        const scrollTop = isGlobal
            ? Math.max(document.documentElement[scrollAttr], document.body[scrollAttr])
            : scrollEle[scrollAttr];
        const scrollSizeAttr = scrollVertical ? 'scrollHeight' : 'scrollWidth';
        const sizeAttr = scrollVertical ? 'offsetHeight' : 'offsetWidth';
        const maxTopDis = isGlobal
            ? Math.max(document.documentElement[scrollSizeAttr], document.body[scrollSizeAttr]) -
              scrollTop -
              (scrollVertical ? window.innerHeight : window.innerWidth)
            : scrollEle[scrollSizeAttr] - scrollTop - scrollEle[sizeAttr];
        const normalizedTopDis = Math.min(maxTopDis, topDis);
        clearTimeout(timerRef.current);
        autoScrollingRef.current = true;
        const duration = rightNow ? 0 : transitionDuration || 0;
        scrollWithAnimation(
            scrollTop,
            scrollTop + normalizedTopDis,
            top => {
                if (isGlobal) {
                    document.documentElement[scrollAttr] = top;
                    document.body[scrollAttr] = top;
                } else {
                    scrollEle[scrollAttr] = top;
                }
            },
            duration,
        );
        // 在自动滚动完成后，过一小段时间再解锁，避免最后一次触发scroll还未完成时就解锁导致乱跳的情况
        // @en After the automatic scrolling is completed, unlock it after a short period of time, to avoid the situation of random jumping caused by unlocking when the scroll is not completed for the last time.
        const buffer = 100;
        timerRef.current = window.setTimeout(() => {
            autoScrollingRef.current = false;
        }, duration + (scrollThrottle || 0) + buffer);
    }

    function getContainerTop(container: HTMLElement | Window) {
        const { isGlobal, scrollEle, containerRect } = getScrollContainerRect(container);
        const containerTop = Math.floor(scrollVertical ? containerRect.top : containerRect.left);
        const containerBottom = Math.floor(
            scrollVertical ? containerRect.bottom : containerRect.right,
        );
        return { isGlobal, scrollEle: scrollEle!, containerTop, containerBottom };
    }

    function getRectTop(ele: HTMLElement | null, attr: 'top' | 'bottom' = 'top') {
        const attrMap: Record<'top' | 'bottom', string> = scrollVertical
            ? { top: 'top', bottom: 'bottom' }
            : { top: 'left', bottom: 'right' };
        const attrKey = attrMap[attr];
        const rect = ele?.getBoundingClientRect() || {};
        // 消除误差
        // @en Eliminate errors
        return rect[attrKey] ? Math.floor(rect[attrKey]) : 0;
    }

    function getPaneStyle(): CSSProperties {
        const commonStyle = tabPaneStyle || {};
        if (mode === 'scroll') {
            return commonStyle;
        }
        const translateStr = translateZ ? ' translateZ(0)' : '';
        const sizeStyle =
            tabDirection === 'vertical'
                ? {
                      width: `${100 * panes.length}%`,
                      transform: `translateX(${
                          distance - wrapWidth * activeIndex
                      }px)${translateStr}`,
                  }
                : {
                      height: `${100 * panes.length}%`,
                      transform: `translateY(${
                          distance - wrapHeight * activeIndex
                      }px)${translateStr}`,
                  };
        const heightStyle =
            currentPaneHeight && currentPaneHeight !== 'auto'
                ? {
                      height: currentPaneHeight,
                  }
                : {};
        return getStyleWithVendor({
            ...(swipeEnergySaving ? {} : sizeStyle),
            transitionDuration: `${getTransition()}ms`,
            ...heightStyle,
            ...commonStyle,
        });
    }

    function getEnergySavingPaneStyle(index: number): CSSProperties | undefined {
        if (mode === 'scroll' || !swipeEnergySaving) {
            return undefined;
        }
        if (index !== shownActiveIndex) {
            return {
                position: 'absolute',
                left: '-100%',
                top: '-100%',
            };
        }
        const translateStr = translateZ ? ' translateZ(0)' : '';
        const sizeStyle =
            tabDirection === 'vertical'
                ? {
                      transform: `translateX(${
                          distance - wrapWidth * (activeIndex - index)
                      }px)${translateStr}`,
                  }
                : {
                      transform: `translateY(${
                          distance - wrapHeight * (activeIndex - index)
                      }px)${translateStr}`,
                  };
        return getStyleWithVendor({
            ...sizeStyle,
            transitionDuration: `${getTransition()}ms`,
        });
    }

    function renderContent(pane: React.ReactNode, index: number) {
        const contentProps = {
            key: index,
            className: cls(prefix, `mode-${mode}`, { 'full-screen': fullScreen }),
            ref: r => (panesRef.current[index] = r),
        };
        const energySavingStyle = getEnergySavingPaneStyle(index);
        // 是滚动模式或在加载范围内，直接渲染
        // @en Render directly when in scroll mode or in loading scope
        if (mode === 'scroll' || (index >= shownIndexes[0] && index <= shownIndexes[1])) {
            return (
                <div {...contentProps} style={energySavingStyle}>
                    {pane}
                </div>
            );
        }
        const energySavingHideStyle = {
            ...energySavingStyle,
            ...(hideContentStyle || {}),
        };
        // 不在加载范围内，视renderHideContent和hideContentStyle情况而定
        // @en Not in the loading range, depending on renderHideContent and hideContentStyle
        if (renderHideContent) {
            return (
                <div {...contentProps} style={energySavingHideStyle}>
                    {renderHideContent(index, pane)}
                </div>
            );
        }
        if (hideContentStyle === null) {
            return <div {...contentProps} style={energySavingStyle} />;
        }
        return (
            <div {...contentProps} style={energySavingHideStyle}>
                {pane}
            </div>
        );
    }

    return (
        <div
            className={cls(
                `${prefix}-container`,
                tabDirection,
                swipeEnergySaving ? `mode-${mode}-energy-saving` : `mode-${mode}`,
                tabPaneClass,
                { 'full-screen': fullScreen },
                {
                    [`mode-scroll-${scrollVertical ? 'vertical' : 'horizontal'}`]:
                        mode === 'scroll',
                },
            )}
            style={getPaneStyle()}
            ref={domRef}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
        >
            {panes.map((pane, index) => renderContent(pane, index))}
            {tabPaneExtra ? <div className={`${prefix}-extra`}>{tabPaneExtra}</div> : null}
        </div>
    );
});

export default TabPane;
