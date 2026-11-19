import React, {
    useRef,
    forwardRef,
    Ref,
    useImperativeHandle,
    useContext,
    useEffect,
    useCallback,
    useState,
} from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import { cls } from '@arco-design/mobile-utils';
import { ContextLayout, GlobalContext } from '../context-provider';
import { BaseProps, useLatestRef } from '../_helpers';

/**
 * 滚动条滑块的最小长度（px），避免内容很长时滑块过小而不可见
 */
const MIN_THUMB_SIZE = 20;
/**
 * 内容溢出小于该值（px）时视为未溢出，避免小数像素带来的误判
 */
const OVERFLOW_TOLERANCE = 1;

export type ScrollAreaDirection = 'vertical' | 'horizontal' | 'both';

export type ScrollAreaScrollbarVisibility = 'auto' | 'always' | 'hidden';

export interface ScrollAreaProps extends BaseProps {
    /**
     * 滚动方向
     * @en Scroll direction
     * @default "vertical"
     */
    direction?: ScrollAreaDirection;
    /**
     * 滚动条的显示方式：`auto` 滚动时显示，停止滚动一段时间后隐藏；`always` 内容溢出时始终显示；`hidden` 不显示滚动条
     * @en How the scrollbar is displayed: `auto` shows it while scrolling and hides it after scrolling stops for a while; `always` always shows it when the content overflows; `hidden` never shows it
     * @default "auto"
     */
    scrollbarVisibility?: ScrollAreaScrollbarVisibility;
    /**
     * `scrollbarVisibility` 为 `auto` 时，停止滚动后滚动条隐藏的延时，单位 ms
     * @en The delay in ms before the scrollbar is hidden after scrolling stops, takes effect when `scrollbarVisibility` is `auto`
     * @default 1000
     */
    hideDelay?: number;
    /**
     * 滚动容器（视口）的自定义类名
     * @en Custom classname of the scrollable viewport
     * @default ""
     */
    viewportClassName?: string;
    /**
     * 滚动容器（视口）的自定义样式
     * @en Custom stylesheet of the scrollable viewport
     */
    viewportStyle?: React.CSSProperties;
    /**
     * 滚动时的回调
     * @en Callback when the viewport is scrolled
     */
    onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
}

export interface ScrollAreaRef {
    /**
     * 最外层 DOM 元素
     * @en The outer DOM element of the component
     */
    dom: HTMLDivElement | null;
    /**
     * 滚动容器（视口）DOM 元素
     * @en The scrollable viewport DOM element
     */
    viewport: HTMLDivElement | null;
    /**
     * 滚动到指定位置
     * @en Scroll the viewport to the given position
     */
    scrollTo: (options: ScrollToOptions) => void;
    /**
     * 重新计算滚动条的尺寸和位置，一般无需手动调用
     * @en Recalculate the size and position of the scrollbar, usually there is no need to call it manually
     */
    update: () => void;
}

interface ThumbState {
    visible: boolean;
    /** 滑块长度，占滚动轨道长度的百分比 */
    size: number;
    /** 滑块偏移量，占滑块自身长度的百分比 */
    offset: number;
}

interface ScrollbarState {
    rtl: boolean;
    vertical: ThumbState;
    horizontal: ThumbState;
}

const HIDDEN_THUMB: ThumbState = { visible: false, size: 0, offset: 0 };

const INITIAL_STATE: ScrollbarState = {
    rtl: false,
    vertical: HIDDEN_THUMB,
    horizontal: HIDDEN_THUMB,
};

function getThumbState(clientSize: number, scrollSize: number, scrollPos: number): ThumbState {
    const maxScroll = scrollSize - clientSize;
    if (maxScroll <= OVERFLOW_TOLERANCE || clientSize <= 0) {
        return HIDDEN_THUMB;
    }
    // 滚动轨道的长度与视口长度基本一致，这里按比例而非像素计算，保证滑块始终落在轨道内
    const minSize = Math.min(100, (MIN_THUMB_SIZE / clientSize) * 100);
    const size = Math.max(minSize, (clientSize / scrollSize) * 100);
    // 限制在合法区间内，避免 iOS 回弹时滑块超出滚动轨道
    const progress = Math.min(1, Math.max(0, scrollPos / maxScroll));
    return { visible: true, size, offset: ((progress * (100 - size)) / size) * 100 };
}

function isSameThumb(a: ThumbState, b: ThumbState) {
    return a.visible === b.visible && a.size === b.size && a.offset === b.offset;
}

/**
 * 自定义滚动条样式的滚动容器，用自定义的滚动条替换浏览器原生滚动条
 * @en A scrollable container that replaces the native scrollbar with a customizable one
 * @type 布局
 * @type_en Layout
 * @name 滚动区域
 * @name_en ScrollArea
 */
const ScrollArea = forwardRef((props: ScrollAreaProps, ref: Ref<ScrollAreaRef>) => {
    const {
        className = '',
        style,
        children,
        direction = 'vertical',
        scrollbarVisibility = 'auto',
        hideDelay = 1000,
        viewportClassName = '',
        viewportStyle,
        onScroll,
    } = props;
    const { prefixCls } = useContext(GlobalContext);
    const prefix = `${prefixCls}-scroll-area`;
    const domRef = useRef<HTMLDivElement | null>(null);
    const viewportRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const hideTimerRef = useRef<number | null>(null);
    const [scrollbar, setScrollbar] = useState<ScrollbarState>(INITIAL_STATE);
    const [scrolling, setScrolling] = useState(false);
    const onScrollRef = useLatestRef(onScroll);
    const hasVertical = direction !== 'horizontal';
    const hasHorizontal = direction !== 'vertical';

    const update = useCallback(() => {
        const viewport = viewportRef.current;
        if (!viewport) {
            return;
        }
        const { clientHeight, scrollHeight, scrollTop, clientWidth, scrollWidth, scrollLeft } =
            viewport;
        const rtl = window.getComputedStyle(viewport).direction === 'rtl';
        const next: ScrollbarState = {
            rtl,
            vertical: hasVertical
                ? getThumbState(clientHeight, scrollHeight, scrollTop)
                : HIDDEN_THUMB,
            horizontal: hasHorizontal
                ? // RTL 下 scrollLeft 为 0 或负数，统一用绝对值表示"已滚动的距离"
                  getThumbState(clientWidth, scrollWidth, Math.abs(scrollLeft))
                : HIDDEN_THUMB,
        };
        setScrollbar(prev =>
            prev.rtl === next.rtl &&
            isSameThumb(prev.vertical, next.vertical) &&
            isSameThumb(prev.horizontal, next.horizontal)
                ? prev
                : next,
        );
    }, [hasVertical, hasHorizontal]);

    const clearHideTimer = () => {
        if (hideTimerRef.current !== null) {
            window.clearTimeout(hideTimerRef.current);
            hideTimerRef.current = null;
        }
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        update();
        if (scrollbarVisibility === 'auto') {
            setScrolling(true);
            clearHideTimer();
            hideTimerRef.current = window.setTimeout(() => {
                hideTimerRef.current = null;
                setScrolling(false);
            }, hideDelay);
        }
        onScrollRef.current?.(e);
    };

    // 内容或容器尺寸变化时同步滚动条
    useEffect(() => {
        update();
        const observer = new ResizeObserver(update);
        if (viewportRef.current) {
            observer.observe(viewportRef.current);
        }
        if (contentRef.current) {
            observer.observe(contentRef.current);
        }
        return () => observer.disconnect();
    }, [update]);

    useEffect(() => {
        if (scrollbarVisibility !== 'auto') {
            clearHideTimer();
            setScrolling(false);
        }
    }, [scrollbarVisibility]);

    useEffect(() => clearHideTimer, []);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
        viewport: viewportRef.current,
        scrollTo: options => {
            const viewport = viewportRef.current;
            if (!viewport) {
                return;
            }
            if (typeof viewport.scrollTo === 'function') {
                viewport.scrollTo(options);
            } else {
                if (options.top !== undefined) {
                    viewport.scrollTop = options.top;
                }
                if (options.left !== undefined) {
                    viewport.scrollLeft = options.left;
                }
            }
        },
        update,
    }));

    const { rtl, vertical, horizontal } = scrollbar;
    const showScrollbar = scrollbarVisibility !== 'hidden';

    return (
        <ContextLayout>
            {() => (
                <div
                    className={cls(prefix, `${prefix}-${direction}`, className, {
                        [`${prefix}-rtl`]: rtl,
                        [`${prefix}-always`]: scrollbarVisibility === 'always',
                        [`${prefix}-scrolling`]: scrolling,
                    })}
                    style={style}
                    ref={domRef}
                >
                    <div
                        className={cls(`${prefix}-viewport`, viewportClassName)}
                        style={viewportStyle}
                        ref={viewportRef}
                        onScroll={handleScroll}
                    >
                        <div className={`${prefix}-content`} ref={contentRef}>
                            {children}
                        </div>
                    </div>
                    {showScrollbar && vertical.visible ? (
                        <div
                            className={`${prefix}-track ${prefix}-track-vertical`}
                            aria-hidden="true"
                        >
                            <div
                                className={`${prefix}-thumb ${prefix}-thumb-vertical`}
                                style={{
                                    height: `${vertical.size}%`,
                                    transform: `translate3d(0, ${vertical.offset}%, 0)`,
                                }}
                            />
                        </div>
                    ) : null}
                    {showScrollbar && horizontal.visible ? (
                        <div
                            className={`${prefix}-track ${prefix}-track-horizontal`}
                            aria-hidden="true"
                        >
                            <div
                                className={`${prefix}-thumb ${prefix}-thumb-horizontal`}
                                style={{
                                    width: `${horizontal.size}%`,
                                    transform: `translate3d(${
                                        rtl ? -horizontal.offset : horizontal.offset
                                    }%, 0, 0)`,
                                }}
                            />
                        </div>
                    ) : null}
                </div>
            )}
        </ContextLayout>
    );
});

export default ScrollArea;
