import React, {
    useRef,
    forwardRef,
    Ref,
    useImperativeHandle,
    useEffect,
    useState,
    useContext,
} from 'react';
import { cls, fingerDisToLabelDis, defaultLocale } from '@arco-design/mobile-utils';
import { ContextLayout, GlobalContext } from '../context-provider';
import { SwipeLoadProps, SwipeLoadRef } from './type';
import { setStyleWithVendor } from '../_helpers';
import { useAddListener } from '../_helpers/hooks';

export * from './type';

/**
 * 向左滑动到达屏幕边缘后，超过一定距离时触发加载，常用于横划展示少量的元素，滑动到底后跳转至另外界面的场景
 * @en After swiping to the left to reach the edge of the screen, the loading is triggered when the distance exceeds a certain distance. It is often used to display a small number of elements horizontally, and then jump to another interface after swiping to the end.
 * @type 反馈
 * @type_en FeedBack
 * @name 左滑加载
 * @name_en SwipeLoad
 */
const SwipeLoad = forwardRef((props: SwipeLoadProps, ref: Ref<SwipeLoadRef>) => {
    const {
        className = '',
        maxElementOffset = 56,
        maxLabelOffset = 40,
        onConfirm,
        disabled = false,
        circleSize = 80,
        minConfirmOffset = 30,
        labelAnimationFunction = 'cubic-bezier(0.14, 1, 0.34, 1)',
        labelAnimationDuration = 250,
        children,
        normalText = '',
        activeText = '',
        initPos = 0,
        bounceWhenBumpBoundary = false,
        bounceDampRate = 3,
        bounceAnimateDuration = 300,
        damping,
        bounceDistanceProcessor,
        getScrollContainer,
        getBounceContainer,
        onTouchStart,
        onTouchEnd,
        onTouchCancel,
        onTouchMove,
        renderLabel,
    } = props;
    const { locale = defaultLocale } = useContext(GlobalContext);
    const [disableState, setDisableState] = useState(disabled);
    const [labelOffsetState, setLabelOffsetState] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const loadingRef = useRef<HTMLDivElement>(null);
    const loadingLabelRef = useRef<HTMLDivElement>(null);
    const showLoadMoreRef = useRef(false);
    const ifToRightRef = useRef(false);
    const bouncingRef = useRef(false);
    const offsetRef = useRef(0);
    const domRef = useRef<HTMLDivElement | null>(null);
    const { current: wrapperEl } = domRef;
    useAddListener(wrapperEl, 'touchstart', onTouchStart);
    useAddListener(wrapperEl, 'touchend', onTouchEnd);
    useAddListener(wrapperEl, 'touchcancel', onTouchCancel);
    useAddListener(wrapperEl, 'touchmove', onTouchMove);

    useEffect(() => {
        if (disabled || !containerRef.current || disableState) {
            return;
        }
        let scrollContainer;
        // 对children类型进行判断
        // @en Judging the type of children
        if (containerRef.current.childNodes.length === 0) {
            // 未传入子元素 不启用组件
            // @en If no child element is passed in,  component will be disabled
            setDisableState(true);
        } else if (containerRef.current.childNodes.length === 1) {
            // 传入一个子元素 滑动单个元素
            // @en Pass in a child element swipe the single element
            scrollContainer = getScrollContainer?.() ?? containerRef.current.firstChild;
        } else {
            // 传入多个子元素(列表元素为例) 组件控制自行滑动 不推荐
            // @en Pass in multiple sub-elements (list elements as an example) Component control slides by itself which is not recommended
            scrollContainer = containerRef.current;
            scrollContainer.style.width = '100%';
            scrollContainer.style.overflowX = 'scroll';
            scrollContainer.style.display = 'inline-flex';
            scrollContainer.style.webkitOverflowScrolling = 'touch';
        }
        if (!scrollContainer) {
            return;
        }
        const { current: loadingCurrent } = loadingRef;
        const { current: loadingLabelCurrent } = loadingLabelRef;
        if (!loadingCurrent) {
            return;
        }
        const bounceScrollContainer: HTMLElement = getBounceContainer?.() || scrollContainer;
        // 初始不显示标签
        // @en Initially no labels are displayed
        loadingCurrent.style.display = 'none';
        let startX = 0;
        let endX = 0;
        let bounceDistance = 0;
        // 触摸页面确定X起始坐标
        // @en Determine the X starting coordinate on touchstart
        const touchstart = (e: TouchEvent) => {
            const evt = e.touches[0];
            startX = evt.clientX || 0;
        };
        // 页面滑动确定X终止坐标，更新手指的X坐标，改变loading中的文字和大小
        // @en Determine the X end coordinate, update the X coordinate of the finger, change the text and size in the loading on touchmove
        const touchmove = (e: TouchEvent) => {
            // 判断元素是否属于滚动元素 先置为1 之后变成0表示非滚动容器
            // @en Determine whether the element belongs to a scrolling element. Set it to 1 and then change to 0 to indicate a non-scrolling container
            if (!scrollContainer.scrollLeft) {
                scrollContainer.scrollLeft = 1;
            }
            endX = e.touches[0].clientX || 0;
            const diff = endX - startX;
            offsetRef.current = diff;
            const labelDiff = fingerDisToLabelDis(Math.abs(diff), damping);
            // 滑动到最左侧，处理回弹效果
            // @en Swipe to the far left to handle the rebound effect
            if (diff > 0 && scrollContainer.scrollLeft <= 1 && bounceWhenBumpBoundary) {
                e.stopPropagation();
                e.cancelBubble && e.preventDefault();
                bouncingRef.current = true;
                const processor =
                    bounceDistanceProcessor ||
                    (dis => Math.min(dis, bounceScrollContainer.offsetWidth) / bounceDampRate);
                bounceDistance = processor(diff);
                setStyleWithVendor(bounceScrollContainer, {
                    transition: 'none',
                    transform: `translateX(${bounceDistance}px) translateZ(0)`,
                });
            }
            // 向左滑动到尽头 '更多'标签加载 根据scrollLeft判断 滚动容器到达边缘触发 非滚动容器不判断
            // @en Swipe left to the end and the 'more' label is loaded. Judging by scrollLeft, the scroll container reaches the edge and the non-scroll container does not judge
            if (
                diff < 0 &&
                (scrollContainer.scrollLeft + scrollContainer.clientWidth >=
                    scrollContainer.scrollWidth - 1 ||
                    !scrollContainer.scrollLeft) &&
                !ifToRightRef.current
            ) {
                showLoadMoreRef.current = true;
                loadingCurrent.style.display = 'flex';
            }
            // 继续滑动露出标签
            // @en Continue swiping to reveal labels
            if (showLoadMoreRef.current && diff < 0) {
                // 此时禁止list原生滚动
                // @en Disable list native scrolling at this time
                e.stopPropagation();
                e.cancelable && e.preventDefault();
                // list元素平移最大 maxElementOffset
                // @en Maximum list element translation, maxElementOffset
                const listRightMargin = labelDiff > maxElementOffset ? maxElementOffset : labelDiff;
                // 标签的平移最大为40px(半圆)
                // @en The translation of the label is up to 40px (semi-circle)
                const labelRightMargin = labelDiff > maxLabelOffset ? maxLabelOffset : labelDiff;
                setLabelOffsetState(labelRightMargin);
                // 标签全部展示 字样改变
                // @en All labels are displayed and the text style is changed
                if (loadingLabelCurrent) {
                    loadingLabelCurrent.innerHTML =
                        labelDiff >= minConfirmOffset
                            ? activeText || locale.SwipeLoad.activeText
                            : normalText || locale.SwipeLoad.normalText;
                }
                setStyleWithVendor(loadingCurrent, {
                    transition: 'none',
                    transform: `translateX(-${labelRightMargin}px) translateZ(0)`,
                });
                setStyleWithVendor(scrollContainer, {
                    transition: 'none',
                    transform: `translateX(-${listRightMargin}px) translateZ(0)`,
                });
            }
            if (
                diff > 0 &&
                scrollContainer.scrollLeft + scrollContainer.clientWidth <=
                    scrollContainer.scrollWidth - 1
            ) {
                showLoadMoreRef.current = false;
                loadingCurrent.style.display = 'none';
            }
            // 针对ios惯性滚动处理
            // @en Handling inertial scrolling for ios
            if (
                diff < 0 &&
                scrollContainer.scrollLeft + scrollContainer.clientWidth <=
                    scrollContainer.scrollWidth - 1
            ) {
                ifToRightRef.current = false;
            } else {
                ifToRightRef.current = true;
            }
        };

        // 露出标签 反方向滑动隐藏'更多'标签
        // @en Reveal the label,  swipe in opposite direction to hide 'more' tab
        const touchend = () => {
            const diff = endX - startX;
            offsetRef.current = diff;
            const labelDiff = fingerDisToLabelDis(Math.abs(diff));
            const resumeAnimation = () => {
                if (showLoadMoreRef.current) {
                    showLoadMoreRef.current = false;
                    const scrollTransitionCssStyle = `all ${labelAnimationDuration}ms ${labelAnimationFunction}`;
                    const scrollTransformCssStyle = 'translateX(0px) translateZ(0)';
                    setStyleWithVendor(scrollContainer, {
                        transition: scrollTransitionCssStyle,
                        transform: scrollTransformCssStyle,
                    });
                    setStyleWithVendor(loadingCurrent, {
                        transition: scrollTransitionCssStyle,
                        transform: scrollTransformCssStyle,
                    });
                }
                if (bouncingRef.current) {
                    bouncingRef.current = false;
                    setStyleWithVendor(bounceScrollContainer, {
                        transition: `all ${bounceAnimateDuration}ms`,
                        transform: 'translateX(0px) translateZ(0)',
                    });
                }
                ifToRightRef.current = false;
                setTimeout(() => {
                    loadingCurrent.style.display = 'none';
                }, labelAnimationDuration);
            };
            // 向左滑动 标签已经全部展示
            // @em Swipe left,  labels are all displayed
            if (
                labelDiff >= minConfirmOffset &&
                (scrollContainer.scrollLeft + scrollContainer.clientWidth >=
                    scrollContainer.scrollWidth - 1 ||
                    !scrollContainer.scrollLeft) &&
                showLoadMoreRef.current
            ) {
                onConfirm();
                // 安卓机型返回动画优化
                // @en Return animation optimization on Android
                setTimeout(() => {
                    resumeAnimation();
                }, 250);
                return;
            }
            resumeAnimation();
        };
        scrollContainer.addEventListener('touchstart', touchstart);
        scrollContainer.addEventListener('touchmove', touchmove);
        scrollContainer.addEventListener('touchend', touchend);
        return () => {
            scrollContainer.removeEventListener('touchstart', touchstart);
            scrollContainer.removeEventListener('touchmove', touchmove);
            scrollContainer.removeEventListener('touchend', touchend);
        };
    }, [
        disabled,
        getScrollContainer,
        getBounceContainer,
        bounceWhenBumpBoundary,
        bounceDampRate,
        bounceAnimateDuration,
    ]);
    useImperativeHandle(ref, () => ({
        dom: domRef.current,
    }));
    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <div className={`${prefixCls}-swipe-load ${className}`} ref={domRef}>
                    <div className={cls(`${prefixCls}-list-area`)} ref={containerRef}>
                        {children}
                    </div>
                    {/*
                     * 用户可以自行渲染label样式
                     * @en Users can render the label style by themselves
                     */}
                    {renderLabel ? (
                        <div
                            className={cls(`${prefixCls}-custom-loading-area`)}
                            ref={loadingRef}
                            style={{
                                position: 'absolute',
                                right: `${initPos}px`,
                            }}
                        >
                            {/*
                             * 判断自定义渲染label函数的参数个数 传入offset则根据位置渲染
                             * @en Determine the number of parameters of the custom rendering label function, and pass in the offset to render according to the position
                             */}
                            {renderLabel.length ? renderLabel(labelOffsetState) : renderLabel()}
                        </div>
                    ) : (
                        <div
                            className={cls(`${prefixCls}-loading-area`)}
                            ref={loadingRef}
                            style={{
                                width: `${circleSize}px`,
                                height: `${circleSize}px`,
                                position: 'absolute',
                                right: `-${circleSize}px`,
                            }}
                        >
                            <div
                                className={cls(`${prefixCls}-loading-label`)}
                                ref={loadingLabelRef}
                            />
                        </div>
                    )}
                </div>
            )}
        </ContextLayout>
    );
});

export default SwipeLoad;
