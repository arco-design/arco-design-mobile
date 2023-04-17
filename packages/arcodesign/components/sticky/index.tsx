import React, {
    useRef,
    forwardRef,
    Ref,
    useImperativeHandle,
    useEffect,
    useMemo,
    useState,
    CSSProperties,
    useCallback,
    ReactNode,
} from 'react';
import {
    cls,
    execRAF,
    getActualContainer,
    getScrollContainerRect,
} from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import { useRefState } from '../_helpers';
import Portal from '../portal';

export interface StickyRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
    /**
     * 局部滚动模式下，如果容器外部还有嵌套滚动，可主动调用此方法，让 sticky 的元素主动更新 fixed 位置
     * @en In the local scrolling mode, if there is nested scrolling outside the container, this method can be actively called to make the sticky element actively update the fixed position
     */
    recalculatePosition: () => void;
}

export interface StickyEventPayload {
    /**
     * 当前是否为吸顶/吸底状态
     * @en Whether it is currently in the top/bottom suction state
     */
    isSticky: boolean;
    /**
     * 前一个状态是否为吸顶/吸底状态
     * @en Whether the previous state is ceiling / bottom suction state
     */
    wasSticky: boolean;
    /** 当前是否为吸顶状态 */
    isTopSticky: boolean;
    /** 当前是否为吸底状态 */
    isBottomSticky: boolean;
}

export interface StickyProps {
    /**
     * 吸附位置，top 表示吸顶，bottom 表示吸底，both 表示既吸顶又吸底
     * @en Adsorption position, top means fixed top, bottom means fixed bottom, both means both top and bottom
     * @default "top"
     */
    position?: 'top' | 'bottom' | 'both';
    /**
     * 当距离容器顶部距离为该值时吸顶
     * @en Fixed top when the distance from the top of the container is this value
     * @default 0
     */
    topOffset?: number;
    /**
     * 当距离容器底部距离为该值时吸底
     * @en Fixed bottom when the distance from the bottom of the container is this value
     * @default 0
     */
    bottomOffset?: number;
    /**
     * 当sticky元素需要跟随依附容器离开视口时距离依附容器边缘的距离
     * @en The distance from the edge of the attached container when the sticky element needs to follow the attached container to leave the viewport
     * @default 0
     */
    followOffset?: number;
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 自定义样式
     * @en Custom stylesheet
     */
    style?: CSSProperties;
    /**
     * 组件内部内容
     * @en Children elements of the component
     */
    children?: ReactNode;
    /**
     * 层级指数，z-index的值
     * @en z-index
     * @default 100
     */
    zIndex?: number;
    /**
     * 在处于sticky状态时是否portal
     * @en Whether it is portal in sticky state
     * @default false
     */
    portalWhenSticky?: boolean;
    /**
     * 处于sticky状态时，元素固定样式。推荐用fixed，如果为absolute则需自行为滚动容器的父容器设置 position: relative
     * @en When in the sticky state, the fixed style of the element. Fixed is recommended. If absolute, need to set position: relative for the parent container of the scrolling container.
     * @default "fixed"
     */
    stickyStyle?: 'fixed' | 'absolute';
    /**
     * 处于sticky状态时的自定义样式
     * @en Custom style when in sticky state
     */
    stickyCssStyle?: CSSProperties;
    /**
     * 被portal时挂载的容器
     * @en Container mounted when being portaled
     * @default () => document.body
     */
    getPortalContainer?: () => HTMLElement;
    /**
     * 吸顶状态切换时触发
     * payload.isSticky: 当前是否为吸顶/吸底状态
     * payload.wasSticky: 前一个状态是否为吸顶/吸底状态
     * @en Triggered when the sticky state is switched
     * @en isSticky: Whether it is currently in the top/bottom state
     * @en Whether the previous state is the top/bottom state
     */
    onStickyStateChange?: (payload: StickyEventPayload) => void;
    /**
     * 滚动时top变化回调，参数为元素距离容器顶部减去topOffset的距离
     * @en The top change callback when scrolling, the parameter is the distance of the element from the top of the container minus topOffset
     */
    onTopChange?: (top: number) => void;
    /**
     * 指定sticky元素的依附容器，sticky元素不会超出容器，在容器离开视口时会跟随
     * 如果返回string则使用querySelector选取容器
     * @en Specifies the attachment container of the sticky element. The sticky element will not exceed the container and will follow when the container leaves the viewport
     * @en If a string is returned, use querySelector to select the container
     */
    getContainer?: () => HTMLElement | string;
    /**
     * 指定滚动容器；如果返回string则使用querySelector选取容器
     * @en Specifies the scrolling container. If this value is specified, the relative property is always regarded as false; if a string is input, use querySelector to select the container
     * @default () => window
     */
    getScrollContainer?: () => HTMLElement | Window | string;
}

/**
 * 粘性布局组件，元素相对于窗口或指定容器的吸顶效果。
 * @en Sticky layout component, The sticky-to-top effect of the element relative to the window or specified container
 * @type 布局
 * @type_en Layout
 * @name 粘性布局
 * @name_en Sticky
 */
const Sticky = forwardRef((props: StickyProps, ref: Ref<StickyRef>) => {
    const {
        position = 'top',
        topOffset = 0,
        bottomOffset = 0,
        followOffset = 0,
        children,
        className,
        style,
        zIndex = 100,
        portalWhenSticky = false,
        stickyStyle = 'fixed',
        stickyCssStyle: userSetStickyCssStyle,
        getPortalContainer,
        getContainer,
        getScrollContainer,
        onStickyStateChange,
        onTopChange,
    } = props;
    const [isSticky, isStickyRef, setIsSticky] = useRefState(false);
    const [wasSticky, wasStickyRef, setWasSticky] = useRefState(false);
    const [stickyStateStyle, setStickyStateStyle] = useState<CSSProperties>({});
    const contentRef = useRef<HTMLDivElement | null>(null);
    const placeholderRef = useRef<HTMLDivElement | null>(null);
    const contentCalculateHeightRef = useRef<number>(0);
    const containerRef = useRef<HTMLElement | null>(null);
    const scrollContainerRef = useRef<HTMLElement | null | Window>(null);
    const framePendingRef = useRef(false);

    const containerEventHandler = useCallback(
        ({ followTop, followBottom }) => {
            if (!contentRef.current) {
                return;
            }
            const needTop = position === 'top' || position === 'both';
            const needBottom = position === 'bottom' || position === 'both';

            const placeholderClientRect = placeholderRef.current!.getBoundingClientRect();
            const contentClientRect = contentRef.current.getBoundingClientRect();
            const calculatedHeight = contentClientRect.height;
            contentCalculateHeightRef.current = contentClientRect.height;
            const { containerRect } = getScrollContainerRect(scrollContainerRef.current);
            const {
                top: containerTop,
                bottom: containerBottom,
                height: containerHeight,
            } = containerRect;

            const disFromTop = Math.round(placeholderClientRect.top - containerTop);
            const disFromBottom = Math.round(
                placeholderClientRect.top + calculatedHeight - containerBottom,
            );
            const topFollowDifference =
                followBottom - followOffset - calculatedHeight - topOffset - containerTop;
            const bottomFollowDifference =
                containerHeight - followTop - followOffset - calculatedHeight - bottomOffset;

            setWasSticky(Boolean(isStickyRef.current));
            const isTopSticky = needTop
                ? disFromTop <= topOffset && followBottom > containerTop + followOffset
                : false;
            const isBottomSticky = needBottom
                ? disFromBottom >= -bottomOffset && followTop < containerBottom - followOffset
                : false;
            const newStickyState = isTopSticky || isBottomSticky;

            const cssTop = (stickyStyle === 'absolute' ? 0 : containerTop) + topOffset;
            const cssBottom =
                (stickyStyle === 'absolute' ? 0 : window.innerHeight - containerBottom) +
                bottomOffset;
            let stickyCssStyle: CSSProperties = {};
            if (newStickyState) {
                stickyCssStyle = {
                    transform: 'translateZ(0)',
                    WebkitTransform: 'translateZ(0)',
                    position: stickyStyle === 'absolute' ? 'absolute' : 'fixed',
                    zIndex,
                    ...(isTopSticky
                        ? {
                              top: topFollowDifference > 0 ? cssTop : cssTop + topFollowDifference,
                          }
                        : {}),
                    ...(isBottomSticky
                        ? {
                              bottom:
                                  bottomFollowDifference > 0
                                      ? cssBottom
                                      : cssBottom + bottomFollowDifference,
                          }
                        : {}),
                    left: placeholderClientRect.left,
                    width: placeholderClientRect.width,
                    ...(userSetStickyCssStyle || {}),
                };
            }
            onTopChange?.(Math.max(0, contentClientRect.top - containerTop - topOffset));

            setIsSticky(newStickyState);
            setStickyStateStyle(stickyCssStyle);

            if (newStickyState !== wasStickyRef.current) {
                onStickyStateChange &&
                    onStickyStateChange({
                        isTopSticky,
                        isBottomSticky,
                        isSticky: newStickyState,
                        wasSticky: wasStickyRef.current,
                    });
            }
        },
        [
            position,
            topOffset,
            bottomOffset,
            followOffset,
            zIndex,
            stickyStyle,
            onStickyStateChange,
            onTopChange,
            userSetStickyCssStyle,
        ],
    );

    const recalculatePosition = useCallback(() => {
        if (framePendingRef.current) {
            return;
        }

        execRAF(() => {
            framePendingRef.current = false;

            if (containerRef.current) {
                const { top, bottom } = containerRef.current.getBoundingClientRect();

                containerEventHandler({
                    followTop: top,
                    followBottom: bottom,
                });
            }
        });

        framePendingRef.current = true;
    }, [containerEventHandler]);

    useEffect(() => {
        const containerEle = getActualContainer(getContainer) as HTMLElement;

        containerRef.current = containerEle || document.body;

        const eventTarget = getScrollContainer ? getActualContainer(getScrollContainer) : window;
        if (!eventTarget) return;
        scrollContainerRef.current = eventTarget;

        const attachEventListeners = target => {
            target.addEventListener('scroll', recalculatePosition);
        };

        const removeEventListeners = target => {
            target.removeEventListener('scroll', recalculatePosition);
        };

        attachEventListeners(eventTarget);
        recalculatePosition();

        return () => {
            removeEventListeners(eventTarget);
        };
    }, [getContainer, getScrollContainer, recalculatePosition]);

    useEffect(() => {
        if (placeholderRef.current) {
            // 当元素吸顶时，默认有一个占位的元素占住该元素的位置，避免布局产生抖动
            // @en When an element is sticky to the top, a placeholder element occupies the element's position by default to avoid jitter in the layout
            placeholderRef.current.style.height = `${
                isStickyRef.current ? contentCalculateHeightRef.current : 0
            }px`;
        }
    }, [isSticky, wasSticky]);

    useImperativeHandle(
        ref,
        () => ({
            dom: contentRef.current,
            recalculatePosition,
        }),
        [recalculatePosition],
    );

    const computedStyle = useMemo(
        () => ({ ...(style || {}), ...stickyStateStyle }),
        [stickyStateStyle, style],
    );

    function renderSticky(prefixCls?: string) {
        return (
            <div
                className={cls(`${prefixCls}-sticky`, className)}
                ref={contentRef}
                style={computedStyle}
            >
                {children}
            </div>
        );
    }

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <div>
                    <div ref={placeholderRef} />
                    {portalWhenSticky && isSticky ? (
                        <Portal getContainer={getPortalContainer}>{renderSticky(prefixCls)}</Portal>
                    ) : (
                        renderSticky(prefixCls)
                    )}
                </div>
            )}
        </ContextLayout>
    );
});

export default Sticky;
