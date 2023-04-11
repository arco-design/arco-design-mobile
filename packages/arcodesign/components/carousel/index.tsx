import React, {
    useRef,
    useState,
    useEffect,
    forwardRef,
    Ref,
    useImperativeHandle,
    useCallback,
    CSSProperties,
    ReactNode,
    useMemo,
    useContext,
} from 'react';
import { nextTick, cls } from '@arco-design/mobile-utils';
import { ContextLayout, GlobalContext } from '../context-provider';
import {
    useRefState,
    useListenResize,
    useUpdateEffect,
    getStyleWithVendor,
    useSystem,
    useSwiperInnerScroll,
    useLatestRef,
} from '../_helpers';

export interface CarouselListItem {
    /**
     * 图片链接
     * @en image resource
     */
    src: string;
    /**
     * 图片底部固定的文字
     * @en Fixed text at the bottom of the image
     */
    text?: ReactNode;
    /**
     * 点击图片回调
     * @en Callback function for clicking the image
     */
    onClick?: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
}

export interface CarouselProps {
    /**
     * 样式类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 最外层容器自定义样式
     * @en Outermost container custom stylesheet
     */
    wrapStyle?: CSSProperties;
    /**
     * 内层轮播容器自定义样式
     * @en Inner carousel container custom stylesheet
     */
    style?: CSSProperties;
    /**
     * 轮播内部内容
     * @en Carousel internal content
     */
    children?: ReactNode;
    /**
     * 轮播图片列表，省略子元素的简写，传入图片url数组，也可通过`text`指定图片底部的蒙层文字内容
     * @en Carousel image list, omit the shorthand of children elements, input the image url array, or specify the content of the masked text at the bottom of the image through `text`
     */
    list?: CarouselListItem[];
    /**
     * 自动切换轮播滑块时，动画的执行时间(ms)
     * @en Animation duration(ms) when the carousel slider is automatically toggled,
     * @default 500
     */
    animateDuration?: number;
    /**
     * 手动切换轮播滑块时，当手指释放后，动画的执行时间(ms)
     * @en Animation duration(ms) after the finger is released When manually switching the carousel slider
     * @default 300
     */
    animateDurationSlide?: number;
    /**
     * 是否开启循环轮播，当指定轮播滑块宽度时该属性不生效
     * @en Whether to enable circular rotation, it does not take effect when the slider width is specified
     * @default true
     */
    loop?: boolean;
    /**
     * 是否开启自动播放
     * @en Whether to enable autoplay
     * @default true
     */
    autoPlay?: boolean;
    /**
     * 自动播放方向
     * @en Direction when playing auto
     * @default "normal"
     */
    autoPlayDirection?: 'normal' | 'reverse';
    /**
     * 是否响应手势滑动
     * @en Whether to respond to gesture swipe
     * @default true
     */
    swipeable?: boolean;
    /**
     * 开启自动播放时，每一个滑块的停留时间(ms)
     * @en The stay duration of each slider when autoplay is turned on
     * @default 4000
     */
    stayDuration?: number;
    /**
     * 指定容器宽度，默认为基于父容器100%
     * @en Width of the box, the default value is 100% based on the parent container
     */
    boxWidth?: number | string;
    /**
     * 指定容器高度，默认为自适应高度；当设置`vertical=true`时，该属性为必填
     * @en Height of the box. The property is required when vertical is true
     */
    boxHeight?: number | string;
    /**
     * 指定初始容器宽度，常用于ssr首屏初始化，水平轮播时可用
     * @en Initial box width, commonly used for ssr first screen initialization, available when horizontal rotation
     */
    baseBoxWidth?: number;
    /**
     * 指定初始容器宽度，常用于ssr首屏初始化，垂直轮播时可用
     * @en Initial box height, commonly used for ssr first screen initialization, available when vertical rotation
     */
    baseBoxHeight?: number;
    /**
     * 指定轮播滑块宽度，为0或不传时为默认的父容器宽度
     * @en Width of the carousel slider, the default value is parent container width if it is 0 or not input
     * @default 0
     */
    width?: number;
    /**
     * 指定轮播滑块高度，如不指定则为自适应高度
     * @en Height of the carousel slider, it will be adaptive if not input
     */
    height?: number;
    /**
     * 默认选中的滑块索引
     * @en Default selected slider index
     * @default 0
     */
    initialIndex?: number;
    /**
     * 自定义轮播索引
     * @en Custom indicator
     */
    renderIndicator?: (currentIndex: number, total: number, lastIndex: number) => ReactNode;
    /**
     * 轮播索引位置
     * @en Position of the indicator
     * @default "center"
     */
    indicatorPos?: 'start' | 'center' | 'end';
    /**
     * 垂直轮播索引横向位置
     * @en Horizontal position of the vertical indicator
     * @default "left"
     */
    indicatorVerticalPos?: 'left' | 'right';
    /**
     * 轮播索引是否放轮播图外面
     * @en Whether the indicator is placed outside the carousel
     */
    indicatorOutside?: boolean;
    /**
     * 是否展示轮播索引
     * @en Whether to show the indicator
     * @default true
     */
    showIndicator?: boolean;
    /**
     * children 只有一个时隐藏轮播索引
     * @en Whether to hide the indicator if just one child
     * @default true
     */
    hideSingleIndicator?: boolean;
    /**
     * 轮播索引样式类型
     * @en the style type of the indicator
     * @default "square"
     */
    indicatorType?: 'square' | 'circle';
    /**
     * 轮播索引类名
     * @en Indicator classname
     */
    indicatorClass?: string;
    /**
     * 轮播索引是否反色，默认根据索引是否放在外面决定
     * @en Whether the carousel indicator is inverse color, the default is determined according to whether the indicator is placed outside
     */
    indicatorInverse?: boolean;
    /**
     * 子元素间距
     * @en Children elements spacing
     * @default 0
     */
    spaceBetween?: number;
    /**
     * 前后两端露出距离，设置值时不能循环轮播
     * @en The exposed distance of the front and rear. When the value is set, the carousel cannot be rotated.
     * @default 0
     */
    offsetBetween?: number | { left?: number; right?: number };
    /**
     * 手动控制当前展示元素
     * @en Manually control the current display element
     */
    currentIndex?: number;
    /**
     * 容器高度自适应
     * @en Whether the container height is adaptive
     * @default false
     */
    autoHeight?: boolean;
    /**
     * 滑动切换距离阈值(宽度比例)，范围为[0, 1]，如果该属性和`distanceToChange`属性均设置，则实际计算结果更大的生效
     * @en Sliding switching distance threshold (width ratio), the range is [0, 1]. If the property and the `distanceToChange` property are both set, the actual calculation result will take effect with a larger value.
     * @default 0.3
     */
    percentToChange?: number;
    /**
     * 滑动切换距离阈值(固定px宽度)，如果该属性和`percentToChange`属性均设置，则实际计算结果更大的生效
     * @en Sliding switching distance threshold (fixed px width), if both this property and the `percentToChange` property are set, the actual calculation result will take effect with a larger one
     * @default 10
     */
    distanceToChange?: number;
    /**
     * 滑动切换速度阈值(手指从按下到抬起之间的滑动速度，单位为px/s)，与滑动切换距离阈值同时设置时，满足其中一个即生效
     * @en The sliding switching speed threshold (the sliding speed of the finger from pressing to lifting, in px/s), when it is set at the same time as the sliding switching distance threshold, it will take effect if one of them is satisfied.
     * @default 200
     */
    speedToChange?: number;
    /**
     * 是否垂直轮播，设置后`boxHeight`属性必填
     * @en Whether to rotate vertically, the `boxHeight` property is required after setting
     */
    vertical?: boolean;
    /**
     * 只加载当前页相邻的n个内容，为0时会销毁所有相邻内容，不传则加载所有内容
     * @en Only load the n sliders adjacent to the current slider. If it is 0, all adjacent content will be destroyed. If not input, all sliders will be loaded.
     */
    lazyloadCount?: number;
    /**
     * 触发onTouchStopped的最小阈值
     * @en Minimum threshold to trigger onTouchStopped
     * @default 0
     */
    stopTouchThreshold?: number;
    /**
     * 当不可循环时，是否开启滑动到最前或最后时的回弹效果
     * @en When it is not loopable, whether to enable the rebound effect when sliding to the front or the end
     * @default false
     */
    bounceWhenNoLoop?: boolean;
    /**
     * 当开启最前或最后时的回弹效果时的阻尼系数
     * @en The damping coefficient when the front or rear rebound effect is turned on
     * @default 3
     */
    bounceDampRate?: number;
    /**
     * 非active的滑块的大小比例，[0, 1]的小数，设置后切换时将有放大效果
     * @en The size ratio of the inactive slider, the value range is [0, 1]. After setting, it will have a magnification effect when switching.
     */
    inactiveScale?: number;
    /**
     * 触摸事件是否需要 stopPropagation
     * @en Whether the touch event requires stopPropagation
     * @default true
     */
    stopPropagation?: boolean;
    /**
     * 是否需要fake首尾item，用于offsetBetween不等于0时循环轮播的衔接
     * @en Whether to fake the first and last items, which is used for the connection of the circular rotation when the offsetBetween is not equal to 0
     * @default false
     */
    fakeItem?: boolean;
    /**
     * 滑动到最后时是否允许留白，仅在loop=false且设置了width时有效
     * @en Whether to allow white space when sliding to the end, only valid when loop=false and width is set
     * @default false
     */
    allowEndBlank?: boolean;
    /**
     * 在iOS下是否需要在切屏时做DOM强刷优化，用于修复iOS息屏时自动播放的蜜汁渲染问题
     * @en Whether to do DOM forced refresh optimization when the screen is off under iOS, to fix the rendering problem of automatic playback when the iOS screen is off
     * @default true
     */
    iOSVisibleOptimize?: boolean;
    /**
     * 自定义手指滑动跟手的距离计算方式，posDis表示touchmove的距离，wrapSize表示容器在滑动方向的尺寸，childSize表示滑块在滑动方向的尺寸
     * @en Customize the calculation method of the finger swipe distance. posDis - touchmove distance, wrapSize - container size in the sliding direction, childSize - slider size in the sliding direction
     * @default (posDis, wrapSize, childSize) => childSize * (posDis / wrapSize)
     */
    distanceProcessor?: (posDis: number, wrapSize: number, childSize: number) => number;
    /**
     * 组件内部的滚动容器，用于豁免滑动事件响应
     * @en The scroll container inside the component, used to exempt the sliding event response
     */
    getInnerScrollContainer?: () => (HTMLElement | null)[] | HTMLElement | null;
    /**
     * 当轮播不支持循环且滑到最前面或最后面，还想再滑动时触发
     * @en Triggered when the carousel does not support looping and slides to the front or back, but want to slide again
     */
    onTouchStopped?: (direction: -1 | 1) => void;
    /**
     * 轮播滑块切换时触发
     * @en  Triggered when the carousel slider is toggled
     *  */
    onChange?: (index: number) => void;
    /**
     * 轮播滑块切换，动画完成后触发
     * @en Triggered after the carousel slider toggle animation is complete
     * */
    onAfterChange?: (index: number, oldIndex: number) => void;
    /**
     * 轮播内容touchstart事件
     * @en Carousel content touchstart event
     *  */
    onTouchStart?: (e: TouchEvent, total: number, index: number) => void | boolean;
    /**
     * 轮播内容touchmove事件
     * @en Carousel content touchmove event
     *  */
    onTouchMove?: (e: TouchEvent, total: number, index: number) => void | boolean;
    /**
     * 轮播内容touchend / touchcancel事件
     * @en Carousel content touchend / touchcancel event
     *  */
    onTouchEnd?: (e: TouchEvent, total: number, index: number) => void | boolean;
    /**
     * 轮播切换动画开始时回调
     * @en Callback when the carousel transition animation starts
     *  */
    onTransitionStart?: () => void;
    /**
     * 轮播切换动画结束时回调
     * @en Callback when the carousel transition animation ends
     *  */
    onTransitionEnd?: () => void;
    /**
     * 轮播左右滑动时回调，用于监听滑动距离以做滑动同步交互
     * @en Callback when the carousel slides left and right, used to monitor the sliding distance for sliding synchronization interaction
     *  */
    onDistanceChange?: (distance: number, wrapSize: number, activeIndex: number) => void;
    /**
     * 自定义页面展示隐藏监听，默认在document监听visibilitychange事件，返回function用于在组件卸载时移除监听
     * @en Custom page visibility listener. By default, the visibilitychange event is monitored in the document. The return function is used to remove the listener when the component is unloaded.
     *  */
    onPageVisibleChange?: (
        updateWhenVisible: () => void,
        updateWhenInvisible: () => void,
    ) => () => void | undefined;
}

export interface CarouselRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
    /**
     * 轮播图子项包裹容器 DOM，承载了 touch 相关事件
     * @en Wrapper DOM of carousel slider items, carry touch related events
     */
    wrap: HTMLDivElement | null;
    /**
     * 轮播图每个子项的 DOM
     * @en Carousel slider DOM
     * */
    items: (HTMLDivElement | null)[];
    /**
     * 在某些条件下内部会禁用循环轮播，这里表示循环是否被禁用
     * @en The loop rotation is disabled internally under certain conditions, here indicates whether the loop is disabled
     */
    noLoop: boolean;
    /**
     * 手动重新计算布局
     * @en Recalculate the layout manually
     */
    updateData: () => void;
    /**
     * 手动更新当前选中索引，rightNow 表示是否立刻跳转到目标索引，否则执行过渡动画到目标索引
     * @en Manually update the currently selected index, rightNow indicates whether to jump to the target index immediately, otherwise perform a transition animation to the target index
     * */
    changeIndex: (newIndex: number, rightNow?: boolean, direction?: 'right' | 'left') => void;
}

/**
 * 轮播组件，支持自定义轮播索引样式及滑块宽度。**需要注意的是，如果正使用`fastclick`，需要为 touchstart 的 target 添加`needsclick`类**（<a href="https://github.com/ftlabs/fastclick#ignore-certain-elements-with-needsclick" target="_blank">详情戳这里</a>），以规避`fastclick`逻辑与组件内部的手势冲突。（如果使用了`list`属性则无需额外添加）
 * @en Carousel component, supports custom carousel index style and slider width. **Note that if you are using `fastclick`, you need to add a `needsclick` class to the touchstart target ** (<a href="https://github.com/ftlabs/fastclick#ignore-certain-elements- with-needsclick" target="_blank">click here for details</a>) to avoid `fastclick` logic conflicts with gestures inside the component. (no need to add if `list` is set)
 * @type 信息展示
 * @type_en Data Display
 * @name 轮播图
 * @name_en Carousel
 */
const Carousel = forwardRef((props: CarouselProps, ref: Ref<CarouselRef>) => {
    const {
        className,
        wrapStyle,
        style,
        children,
        list = [],
        animateDuration = 500,
        animateDurationSlide = 300,
        loop = true,
        autoPlay = true,
        autoPlayDirection = 'normal',
        swipeable = true,
        stayDuration = 4000,
        boxWidth,
        boxHeight,
        baseBoxWidth,
        baseBoxHeight,
        width = 0,
        height,
        initialIndex = 0,
        renderIndicator,
        indicatorPos = 'center',
        indicatorVerticalPos = 'left',
        indicatorOutside,
        showIndicator = true,
        hideSingleIndicator = true,
        indicatorType = 'square',
        indicatorClass = '',
        indicatorInverse,
        spaceBetween = 0,
        offsetBetween = 0,
        currentIndex,
        autoHeight = false,
        percentToChange = 0.3,
        distanceToChange = 10,
        speedToChange = 100,
        vertical,
        lazyloadCount,
        inactiveScale = 1,
        stopPropagation = true,
        fakeItem = false,
        allowEndBlank = false,
        bounceWhenNoLoop = false,
        bounceDampRate = 3,
        iOSVisibleOptimize = true,
        distanceProcessor,
        getInnerScrollContainer,
        onChange,
        onAfterChange,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        onTransitionStart,
        onTransitionEnd,
        onDistanceChange,
        stopTouchThreshold = 0,
        onTouchStopped,
        onPageVisibleChange,
    } = props;

    const { useRtl } = useContext(GlobalContext);
    const horizontalUseRtl = !vertical && useRtl;
    const domRef = useRef<HTMLDivElement | null>(null);
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const innerRef = useRef<HTMLDivElement | null>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
    const fakeWrapRef = useRef<HTMLDivElement | null>(null);
    const timerRef = useRef<number | null>(null);
    const movedChildRef = useRef(-1);
    const touchStartTimeRef = useRef(0);
    const touchStartedRef = useRef(false);
    const touchMovedRef = useRef(false);
    const [wrapWidth, setWrapWidth] = useState(baseBoxWidth || 0);
    const [wrapHeight, setWrapHeight] = useState(baseBoxHeight || 0);
    const touchStartXRef = useRef(0);
    const touchStartYRef = useRef(0);
    const scrollingRef = useRef<boolean | null>(null);
    const touchStoppedRef = useRef(false);
    const bouncingRef = useRef(false);
    const [currentItemHeight, setCurrentItemHeight] = useState<number | string>('auto');
    const [posAdjusting, posAdjustingRef, setPosAdjusting] = useRefState(false);
    const [distance, distanceRef, setDistance] = useRefState(0);
    const [isAutoJump, setIsAutoJump] = useState(true);
    const [index, indexRef, setIndex] = useRefState(
        currentIndex !== void 0 ? currentIndex : initialIndex,
    );
    const [transforms, transformsRef, setTransforms] = useRefState<number[]>([]);
    const [direction, directionRef, setStateDirection] = useRefState<'left' | 'right' | ''>(
        (autoPlayDirection === 'reverse' || horizontalUseRtl) && autoPlay ? 'right' : 'left',
    );
    const lastDirectionRef = useRef('');
    const lastShownIndexRef = useRef(-1);
    const { allChildren, fakeTwoChildren } = getAllChildren();
    const total: number = allChildren.length;
    const shownTotal = fakeTwoChildren ? 2 : total;
    const indicatorArr = useMemo(() => {
        const arr: number[] = [];
        for (let i = 0; i < shownTotal; i += 1) {
            arr.push(i);
        }
        return arr;
    }, [shownTotal]);
    const rtlRatio = horizontalUseRtl ? -1 : 1;
    const leftDirec = horizontalUseRtl ? 'right' : 'left';
    const rightDirec = horizontalUseRtl ? 'left' : 'right';
    const leftOffset = typeof offsetBetween === 'number' ? offsetBetween : offsetBetween.left || 0;
    const rightOffset =
        typeof offsetBetween === 'number' ? offsetBetween : offsetBetween.right || 0;
    const wrapSize = vertical ? wrapHeight : wrapWidth;
    const childWidth = (width || wrapWidth) - spaceBetween - (leftOffset + rightOffset);
    const childHeight = (height || wrapHeight) - spaceBetween - (leftOffset + rightOffset);
    const childSize = vertical ? childHeight : childWidth;
    const noLoop =
        !loop ||
        (!vertical && Boolean(width)) ||
        (vertical && Boolean(height)) ||
        total < 2 ||
        ((leftOffset > 0 || rightOffset > 0) && !fakeItem);
    const shownIndex = getShownIndex(index);
    const dynamicAnimateDuration = getDynamicDuration(isAutoJump);
    const cubic = isAutoJump ? 'auto' : 'slide';
    const indexFixed = currentIndex !== void 0;
    const needTouchEvent = swipeable && !indexFixed && childSize > 0;
    const userSetBoxWidth = boxWidth || baseBoxWidth;
    const userSetBoxHeight = boxHeight || baseBoxHeight;
    const noInterval = noLoop || !autoPlay || indexFixed || childSize <= 0;
    const inactiveValidScale = useMemo(
        () => Math.max(0, Math.min(inactiveScale, 1)),
        [inactiveScale],
    );
    const [fakeIndexes, setFakeIndexes] = useState<{ index: number; side: 'left' | 'right' }[]>([]);
    const system = useSystem();
    // 开启自动循环时iOS会有渲染问题需要强刷dom，但不需要autoPlay的不用强刷，这里判断下
    // @en When the automatic loop is turned on, there will be rendering problems in iOS. Need to brush the dom, but if you don't need autoPlay, don't need to brush.
    const needRefreshDom = !noInterval && system === 'ios' && iOSVisibleOptimize;

    const setDirection = useCallback((newDirec: 'left' | 'right' | '') => {
        setStateDirection(direc => {
            lastDirectionRef.current = direc;
            return newDirec;
        });
    }, []);

    const wrapSizeRef = useLatestRef(wrapSize);
    const updateDataRef = useLatestRef(updateData);
    const setPlayIntervalRef = useLatestRef(setPlayInterval);

    const handleTouchStart = useCallback(
        (e: TouchEvent) => {
            if (onTouchStart && onTouchStart(e, shownTotal, getShownIndex(indexRef.current))) {
                return;
            }
            if (posAdjustingRef.current) {
                return;
            }
            touchStartedRef.current = true;
            touchMovedRef.current = false;
            clear();
            const evt = e.touches[0];
            touchStartXRef.current = evt.clientX || 0;
            touchStartYRef.current = evt.clientY || 0;
            scrollingRef.current = null;
            touchStoppedRef.current = false;
            setPosAdjusting(false);
            touchStartTimeRef.current = new Date().getTime();
        },
        [shownTotal, onTouchStart],
    );

    const triggerTouchStopped = useCallback(
        (posDis: number) => {
            const needStop = Math.abs(posDis) > stopTouchThreshold;
            if (!touchStoppedRef.current && needStop) {
                onTouchStopped && onTouchStopped(posDis >= 0 ? -1 : 1);
            }
            touchStoppedRef.current = needStop;
        },
        [stopTouchThreshold, onTouchStopped],
    );

    const handleTouchMove = useCallback(
        (e: TouchEvent) => {
            if (onTouchMove && onTouchMove(e, shownTotal, getShownIndex(indexRef.current))) {
                return;
            }
            stopPropagation && e.stopPropagation();
            if (!touchStartedRef.current || posAdjustingRef.current) {
                e.cancelable && e.preventDefault();
                return;
            }
            touchMovedRef.current = true;
            const evt = e.changedTouches[0];
            const touchMoveX = Math.max(0, evt.clientX || 0);
            const touchMoveY = evt.clientY || 0;
            const posDisX = touchMoveX - touchStartXRef.current;
            const posDisY = touchMoveY - touchStartYRef.current;
            const absDisX = Math.abs(posDisX);
            const absDisY = Math.abs(posDisY);
            const originDis = vertical ? posDisY : posDisX;
            const processor = distanceProcessor || ((dis, size, child) => child * (dis / size));
            const posDis = processor(originDis, wrapSizeRef.current, childSize);
            if (total < 2) {
                triggerTouchStopped(posDis);
                return;
            }
            if (scrollingRef.current === null) {
                scrollingRef.current = vertical ? absDisY < absDisX : absDisX < absDisY;
            }
            // 如果是在滚动页面则禁用轮播图手势
            // @en Disable carousel gestures if scrolling
            if (scrollingRef.current) {
                setDistance(0);
                // bugfix: 未触发横滑就不触发touchend逻辑，且这个场景不需要触发onTouchStopped，因此直接设置touchStoppedRef
                // @en bugfix: The touchend event will not be triggered if the horizontal swipe is not triggered, and this scene does not need to trigger onTouchStopped.
                touchStoppedRef.current = true;
                // 不会触发jumpTo，但touchstart时clear了，所以要手动设置一次interval
                // @en JumpTo will not be triggered, but it is cleared in touchstart event, so need to manually set interval once
                setPlayIntervalRef.current();
                return;
            }
            setDirection(posDis >= 0 ? 'right' : 'left');
            const comparedPos = posDis * rtlRatio;
            if (
                noLoop &&
                ((indexRef.current === 0 && comparedPos > 0) ||
                    (indexRef.current === total - 1 && comparedPos < 0))
            ) {
                triggerTouchStopped(posDis);
                if (bounceWhenNoLoop && bounceDampRate) {
                    e.cancelable && e.preventDefault();
                    bouncingRef.current = true;
                    setDistance(posDis / bounceDampRate);
                } else {
                    setDistance(0);
                }
                return;
            }
            e.cancelable && e.preventDefault();
            touchStoppedRef.current = false;
            const maxDis = childSize;
            setDistance(posDis > 0 ? Math.min(maxDis, posDis) : Math.max(-1 * maxDis, posDis));
        },
        [
            shownTotal,
            noLoop,
            vertical,
            childSize,
            stopPropagation,
            bounceWhenNoLoop,
            bounceDampRate,
            horizontalUseRtl,
            onTouchMove,
            triggerTouchStopped,
        ],
    );

    useImperativeHandle(
        ref,
        () => ({
            dom: domRef.current,
            wrap: wrapRef.current,
            items: itemsRef.current,
            noLoop,
            updateData,
            changeIndex,
        }),
        [updateData, changeIndex],
    );

    useListenResize(updateData, [updateData]);

    useSwiperInnerScroll(getInnerScrollContainer);

    const updateWhenVisible = useCallback(() => {
        fakeWrapRef.current && (fakeWrapRef.current.style.display = 'none');
        wrapRef.current && (wrapRef.current.style.display = '');
        // 部分情况下页面隐藏后容器宽度变成0，因此页面返回后需重新取一次容器尺寸
        // @en In some cases, the width of the container becomes 0 after the page is invisible, so the container size needs to be resized after the page is visible.
        updateDataRef.current();
    }, []);

    const updateWhenInvisible = useCallback(() => {
        clear();
        if (wrapRef.current && fakeWrapRef.current) {
            fakeWrapRef.current.style.height = `${wrapRef.current.offsetHeight || 0}px`;
            fakeWrapRef.current.style.display = 'block';
            wrapRef.current.style.display = 'none';
        }
    }, []);

    useEffect(() => {
        if (onPageVisibleChange) {
            return onPageVisibleChange(updateWhenVisible, updateWhenInvisible);
        }
        // ios 在页面隐藏后返回时会有dom结构正确但渲染错乱的情况，因此在页面隐藏时先用占位符，返回后重新渲染一次dom
        // @en In iOS, When the page is invisible, the DOM will be correct but the rendering is disordered. So use a placeholder when the page is invisible, and re-render the DOM after it is visible.
        const update = () => {
            if (document.visibilityState === 'visible') {
                updateWhenVisible();
            } else {
                updateWhenInvisible();
            }
        };
        document.addEventListener('visibilitychange', update);
        return () => {
            document.removeEventListener('visibilitychange', update);
        };
    }, [onPageVisibleChange]);

    useEffect(() => {
        if (distanceToChange > 0 && distanceToChange < 1) {
            console.warn(
                `[Carousel Props Warning] The value of the prop \`distanceToChange\` is too small(${distanceToChange}). Do you meant to use the prop \`percentToChange\`?`,
            );
        }
    }, [distanceToChange]);

    useEffect(() => {
        if (vertical && !boxHeight) {
            console.warn(
                '[Carousel Rendering Warning] When the prop `vertical` is specified and the prop `boxHeight` is not specified, you need to set a fixed `height` style for the outermost element.',
            );
        }
    }, [vertical, boxHeight]);

    useEffect(() => {
        if (wrapRef.current && needTouchEvent) {
            wrapRef.current.addEventListener('touchstart', handleTouchStart);
            wrapRef.current.addEventListener('touchmove', handleTouchMove);
        }
        return () => {
            if (wrapRef.current && needTouchEvent) {
                wrapRef.current.removeEventListener('touchstart', handleTouchStart);
                wrapRef.current.removeEventListener('touchmove', handleTouchMove);
            }
        };
    }, [handleTouchStart, handleTouchMove, needTouchEvent]);

    useEffect(() => {
        // 布局改变时重新计算
        // @en Recalculate when layout changes
        updateData();
        return () => {
            clear();
        };
    }, [
        userSetBoxWidth,
        userSetBoxHeight,
        childWidth,
        childHeight,
        stayDuration,
        noInterval,
        autoPlayDirection,
    ]);

    useUpdateEffect(() => {
        if (currentIndex !== void 0) {
            jumpTo(currentIndex);
        }
    }, [currentIndex]);

    useUpdateEffect(() => {
        onDistanceChange && onDistanceChange(distance, wrapSize, index);
    }, [distance, wrapSize, index]);

    useEffect(() => {
        // children改变，索引超出新children范围时兼容
        // @en When children change, it needs to be compatible when the index exceeds the range of the new children
        if (allChildren.length && indexRef.current >= allChildren.length) {
            jumpTo(allChildren.length - 1, true, true);
        } else if (indexRef.current < 0) {
            jumpTo(0, true, true);
        }
    }, [allChildren.length]);

    useEffect(() => {
        // bugfix: 修复ios轮播循环时闪动问题
        // @en bugfix: Fix the flickering problem when the carousel loops in iOS
        if (isAutoJump && posAdjusting) {
            setTimeout(() => {
                getFakeChild();
            }, 100);
        } else {
            getFakeChild();
        }
    }, [index, direction, childSize, total, horizontalUseRtl]);

    useEffect(() => {
        nextTick(() => {
            updateLayoutData();
        });
    }, [shownIndex, autoHeight, allChildren]);

    useUpdateEffect(() => {
        if (typeof onChange === 'function') {
            onChange(shownIndex);
        }
    }, [shownIndex]);

    useEffect(() => {
        return () => {
            lastShownIndexRef.current = shownIndex;
        };
    }, [shownIndex]);

    useEffect(() => {
        if (!fakeItem || posAdjusting) {
            return;
        }
        setCurrentFakeIndex();
    }, [posAdjusting, index, direction, total, childSize, horizontalUseRtl]);

    function getShownIndex(nowIndex: number) {
        const validIndex = nowIndex === total ? 0 : nowIndex;
        const shownInd = nowIndex === -1 ? total - 1 : validIndex;
        return fakeTwoChildren ? shownInd % 2 : shownInd;
    }

    function getDynamicDuration(autoJump: boolean) {
        return autoJump ? animateDuration : animateDurationSlide;
    }

    function setCurrentHeight() {
        if (!innerRef.current || !autoHeight || vertical) {
            return;
        }
        const allItemDom = itemsRef.current;
        const nowIndex = getShownIndex(indexRef.current);
        const currentHeight = (allItemDom[nowIndex] || {}).offsetHeight || 'auto';
        setCurrentItemHeight(currentHeight);
    }

    function getAllChildren() {
        let allChild: React.ReactNodeArray = [];
        let fakeTwo = false;
        if (list && list.length) {
            let actualList = list;
            if (list.length === 2 && fakeItem) {
                fakeTwo = true;
                actualList = list.concat(list);
            }
            allChild = actualList.map((item, i) => (
                <>
                    <img
                        key={i}
                        className="carousel-item-img needsclick"
                        src={item.src}
                        alt=""
                        onClick={item.onClick}
                    />
                    {item.text ? <div className="carousel-item-text">{item.text}</div> : null}
                </>
            ));
        } else if (children && Object.prototype.toString.call(children) === '[object Array]') {
            allChild = children as React.ReactNodeArray;
            if (allChild.length === 2 && fakeItem) {
                fakeTwo = true;
                allChild = [...allChild, ...allChild];
            }
        } else {
            allChild = children ? [children] : [];
        }
        return { allChildren: allChild, fakeTwoChildren: fakeTwo };
    }

    function getDefaultDirection() {
        const nowIndex = indexRef.current;
        if (nowIndex === total - 1) {
            return horizontalUseRtl ? 'right' : 'left';
        }
        if (nowIndex === 0) {
            return horizontalUseRtl ? 'left' : 'right';
        }
        return '';
    }

    function changeIndex(newIndex: number, rightNow?: boolean, userSetDirec?: 'right' | 'left') {
        if (posAdjustingRef.current) {
            return;
        }
        if (userSetDirec) {
            // rtl 模式取反
            const direcMap: Record<string, 'right' | 'left'> = {
                left: leftDirec,
                right: rightDirec,
            };
            const direc = direcMap[userSetDirec];
            setDirection(direc);
            nextTick(() => {
                jumpTo(newIndex, true, rightNow, direc);
            });
        } else {
            jumpTo(newIndex, true, rightNow);
        }
    }

    function jumpTo(
        newIndex: number,
        autoJump = true,
        rightNow?: boolean,
        direc?: 'right' | 'left',
    ) {
        const oldIndex = getShownIndex(indexRef.current);
        const changedIndex = newIndex !== oldIndex ? getShownIndex(newIndex) : -1;
        if (direc) {
            setDirection(direc);
        } else if (autoJump) {
            setDirection(autoPlayDirection === 'reverse' || horizontalUseRtl ? 'right' : 'left');
        } else if (newIndex === indexRef.current) {
            setDirection(distanceRef.current > 0 ? 'right' : 'left');
        } else {
            setDirection('');
        }
        setPosAdjusting(true);
        setIsAutoJump(autoJump);
        setDistance(0);
        setIndex(newIndex);
        touchStartTimeRef.current = 0;
        onTransitionStart && onTransitionStart();
        setTimeout(
            () => {
                setPosAdjusting(false);
                nextTick(() => {
                    setDirection(getDefaultDirection());
                    const newTransform = transformsRef.current.slice();
                    let transChanged = false;
                    if (newIndex === -1 && movedChildRef.current >= 0) {
                        newTransform[movedChildRef.current] = 0;
                        transChanged = true;
                        setIndex(total - 1);
                    } else if (newIndex === total && movedChildRef.current >= 0) {
                        newTransform[movedChildRef.current] = 0;
                        transChanged = true;
                        setIndex(0);
                    }
                    transChanged && setTransforms(newTransform);
                    setIsAutoJump(true);
                    onTransitionEnd && onTransitionEnd();
                    if (changedIndex >= 0) {
                        onAfterChange && onAfterChange(changedIndex, oldIndex);
                    }
                    nextTick(() => {
                        setPlayIntervalRef.current();
                    });
                });
            },
            rightNow ? 0 : getDynamicDuration(autoJump),
        );
        autoJump && setDirection('');
    }

    function setPlayInterval() {
        clear();
        if (noInterval) {
            return;
        }
        timerRef.current = delayTimeout(() => {
            jumpTo(autoPlayDirection === 'reverse' ? indexRef.current - 1 : indexRef.current + 1);
        }, stayDuration);
    }

    function updateLayoutData() {
        if (wrapRef.current) {
            setWrapWidth(wrapRef.current.offsetWidth);
            setWrapHeight(wrapRef.current.offsetHeight);
        }
        setCurrentHeight();
    }

    function updateData() {
        updateLayoutData();
        setPlayIntervalRef.current();
    }

    function clear() {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }

    function getFakeChild() {
        if (noLoop) {
            return;
        }
        const nowIndex = indexRef.current;
        const newTransform = transformsRef.current.slice();
        const dis = Math.max(0, childSize);
        allChildren.forEach((_, childIndex) => {
            if (nowIndex === 0 && directionRef.current === rightDirec && childIndex === total - 1) {
                movedChildRef.current = childIndex;
                newTransform[childIndex] = -1 * total * dis * rtlRatio;
            } else if (
                nowIndex === total - 1 &&
                directionRef.current === leftDirec &&
                childIndex === 0
            ) {
                movedChildRef.current = childIndex;
                newTransform[childIndex] = total * dis * rtlRatio;
            } else if (nowIndex >= 0 && nowIndex < total) {
                newTransform[childIndex] = 0;
            }
        });
        setTransforms(newTransform);
    }

    function delayTimeout(callback: TimerHandler, timeout?: number): number {
        return setTimeout(callback, timeout);
    }

    function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
        if (!needTouchEvent) {
            return;
        }
        if (onTouchEnd && onTouchEnd(e.nativeEvent, shownTotal, getShownIndex(indexRef.current))) {
            return;
        }
        stopPropagation && e.stopPropagation();
        if (bouncingRef.current) {
            bouncingRef.current = false;
            jumpTo(index, false);
            return;
        }
        if (
            !touchStartedRef.current ||
            !touchMovedRef.current ||
            posAdjustingRef.current ||
            touchStoppedRef.current
        ) {
            return;
        }
        touchStartedRef.current = false;
        touchMovedRef.current = false;
        const touchEndTime = new Date().getTime();
        const dis = Math.abs(distance);
        const speed = (dis / (touchEndTime - touchStartTimeRef.current)) * 1000;
        const maxSlice = childSize * percentToChange;
        const needJump = (dis > maxSlice && dis > distanceToChange) || speed > speedToChange;
        const comparedDis = distance * rtlRatio;
        if (comparedDis > 0 && needJump) {
            jumpTo(index - 1, false);
        } else if (comparedDis < 0 && needJump) {
            jumpTo(index + 1, false);
        } else {
            jumpTo(index, false);
        }
    }

    function getSlideTransitionStyle() {
        return {
            transitionProperty: posAdjusting ? 'transform' : 'none',
            transitionDuration: posAdjusting ? `${dynamicAnimateDuration}ms` : '0ms',
        };
    }

    function getInnerStyle(): CSSProperties {
        const transitionStyle = getStyleWithVendor(getSlideTransitionStyle());
        const innerSize = childSize * total;
        const dis = index * childSize * -1 * rtlRatio + distance + rtlRatio * leftOffset;
        const min = childSize > 0 ? leftOffset : 0;
        const max = allowEndBlank ? dis * rtlRatio : -1 * innerSize + wrapSize - rightOffset;
        const minTransform = horizontalUseRtl ? -1 * max : min;
        const maxTransform = horizontalUseRtl ? -1 * min : max;
        const comparedDis = rtlRatio * distance;
        const noLoopDis =
            bounceWhenNoLoop &&
            ((index === 0 && comparedDis > 0) || (index === total - 1 && comparedDis < 0))
                ? Math.min(minTransform + distance, Math.max(maxTransform + distance, dis))
                : Math.min(minTransform, Math.max(maxTransform, dis));
        // noLoop时需要在最后也露出spaceBetween的空白，所以当滑到最后一个时transform向左移动相应宽度
        // @en When noLoop is used, the blank space of spaceBetween needs to be exposed at the end, so when sliding to the last one, the transform value moves to the left by the corresponding width
        const translateDis = noLoop
            ? noLoopDis - (total > 1 && index === total - 1 ? spaceBetween : 0) * rtlRatio
            : dis;
        const transStr = childSize > 0 ? `${translateDis}px` : `-${index * 100}%`;
        if (vertical) {
            const translateStyle = getStyleWithVendor({
                transform: `translateY(${transStr}) translateZ(0)`,
            });
            return {
                ...transitionStyle,
                ...translateStyle,
                width: '100%',
            };
        }
        const translateStyle = getStyleWithVendor({
            transform: `translateX(${transStr}) translateZ(0)`,
        });
        return {
            width: Math.max(0, innerSize) || 'auto',
            height,
            ...transitionStyle,
            ...translateStyle,
        };
    }

    function getCarouselStyle(): CSSProperties {
        if (vertical) {
            return {
                height: userSetBoxHeight,
                ...(style || {}),
            };
        }
        const heightStyle =
            currentItemHeight && currentItemHeight !== 'auto'
                ? {
                      height: currentItemHeight,
                  }
                : {};
        return {
            width: userSetBoxWidth,
            ...heightStyle,
            ...(style || {}),
        };
    }

    // 当最前或最后的滑块通过transform手动被放置到最后或最前时，在展示层可以认为是第total个或第-1个模块
    // @en When the front or last slider is manually placed to the rear or the front through transform, it can be considered as the total or -1 module in the display layer
    function getShownChildIndex(curIndex: number) {
        let childIndex = curIndex;
        if (transforms[childIndex] * rtlRatio > 0) {
            childIndex = total;
        } else if (transforms[childIndex] * rtlRatio < 0) {
            childIndex = -1;
        }
        return childIndex;
    }

    // 当两侧有露出内容时，为了循环衔接上需要fake前后的dom来做视觉填充
    // @en When there is exposed content on both sides, it is necessary to fake the front and rear dom to make visual filling in order to connect circularly.
    function setCurrentFakeIndex() {
        const newIndexes: typeof fakeIndexes = fakeIndexes.slice();
        if (childSize <= 0) {
            if (index === 0) {
                newIndexes[0] = { index: total - 1, side: 'left' };
            }
            if (index === total - 1) {
                newIndexes[2] = { index: 0, side: 'right' };
            }
            setFakeIndexes(newIndexes);
            return;
        }
        if (
            (index === 1 && direction === rightDirec) ||
            (index === 0 && direction !== rightDirec)
        ) {
            newIndexes[0] = { index: total - 1, side: 'left' };
        }
        if ((index === 0 && direction === rightDirec) || index === -1) {
            newIndexes[1] = { index: total - 2, side: 'left' };
        }
        if (
            (index === total - 2 && direction === leftDirec) ||
            (index === total - 1 && direction !== leftDirec)
        ) {
            newIndexes[2] = { index: 0, side: 'right' };
        }
        if ((index === total - 1 && direction === leftDirec) || index === total) {
            newIndexes[3] = { index: 1, side: 'right' };
        }
        setFakeIndexes(newIndexes);
    }

    function getItemTranslateStyle(childIndex: number, ratio: number) {
        const dis = index - childIndex;
        const prefix = dis > 0 ? 1 : -1;
        const transPercent = 1 - inactiveValidScale;
        const ratioWithRtl = ratio * rtlRatio;
        let trans = 0;
        if (Math.abs(dis) > 1) {
            trans = (prefix * (Math.abs(dis) - 1) - ratioWithRtl) * transPercent * rtlRatio;
        } else if ((dis === -1 && ratioWithRtl > 0) || (dis === 1 && ratioWithRtl < 0)) {
            trans = -1 * ratio * transPercent;
        }
        return `translate${vertical ? 'Y' : 'X'}(${trans * 100}%)`;
    }

    function getItemScaleStyle(childIndex: number, ratio: number) {
        const originScale = inactiveValidScale;
        // active滑块前后两侧的滑块，根据滑动距离等比放大
        // @en The front and rear sides of the active slider, and zoom in proportionally according to the sliding distance
        if (
            (childIndex === index - 1 && direction === rightDirec) ||
            (childIndex === index + 1 && direction === leftDirec)
        ) {
            return originScale + (1 - originScale) * Math.abs(ratio);
        }
        // active的滑块，根据滑动距离等比缩小
        // @en The active slider, zoom out proportionally according to the sliding distance
        if (childIndex === index) {
            return 1 - (1 - originScale) * Math.abs(ratio);
        }
        // 其他保持inactiveScale即可
        // @en Others remain inactiveScale
        return originScale;
    }

    function getItemOriginStyle(childIndex: number) {
        let origin = 0.5;
        const dis = childIndex - index;
        if (dis === 0) {
            // 当前active的卡片，随滑动方向切换origin
            // @en The currently active card, switch origin with the sliding direction
            origin =
                direction === 'right' || (direction === '' && lastDirectionRef.current === 'left')
                    ? 0
                    : 1;
        } else if (dis <= -1) {
            // 当前active之前的卡片，origin均靠最右
            // @en The cards in front of the currently active card, the origin is on the far right
            origin = horizontalUseRtl ? 0 : 1;
        } else if (dis >= 1) {
            // 当前active之后的卡片，origin均靠最左
            // @en The cards after the currently active card, the origin is on the far left
            origin = horizontalUseRtl ? 1 : 0;
        }
        const originStr = `${origin * 100}%`;
        return vertical ? `center ${originStr}` : `${originStr} center`;
    }

    function getItemInnerStyle(curIndex: number): CSSProperties {
        const transitionStyle = getSlideTransitionStyle();
        const childIndex = getShownChildIndex(curIndex);
        const ratio = distance / childSize || 0;
        // 有放大效果的item，随着distance变化而变化scale和transform-origin
        // @en Item with magnification effect, scale and transform-origin change with distance
        // transform效果与fake dom时item的transform需隔离，且scale后会影响item的padding展示
        // @en The transform effect of the item needs to be isolated from the fake dom, and the padding display of the item will be affected after scale.
        // 因此需要缩放时多包裹一层item-inner，单独处理缩放逻辑
        // @en Therefore, need to wrap an additional layer of item-inner when scaling, and handle the scaling logic separately
        const scale = getItemScaleStyle(childIndex, ratio);
        const transformStyle: CSSProperties = {
            transform: `${getItemTranslateStyle(childIndex, ratio)} scale(${scale})`,
            transformOrigin: getItemOriginStyle(childIndex),
        };
        return getStyleWithVendor({
            ...transitionStyle,
            ...transformStyle,
        });
    }

    function getItemFakeStyle(childIndex: number): CSSProperties {
        const styleMap = {
            leftDirec: vertical ? 'top' : leftDirec,
            rightDirec: vertical ? 'bottom' : rightDirec,
            otherDirec: vertical ? 'left' : 'top',
            trans: vertical ? 'Y' : 'X',
        };
        return {
            position: 'absolute',
            [styleMap.otherDirec]: 0,
            ...(childIndex >= 0
                ? {
                      [styleMap.leftDirec]: childSize > 0 ? '100%' : `${total * 100}%`,
                      transform: `translate${styleMap.trans}(${
                          (childIndex - total) * rtlRatio * 100
                      }%)`,
                  }
                : {
                      [styleMap.rightDirec]: '100%',
                      transform: `translate${styleMap.trans}(${
                          (childIndex + 1) * rtlRatio * 100
                      }%)`,
                  }),
        };
    }

    function getItemStyle(childIndex: number, isFake?: boolean): CSSProperties {
        const initialStartSpace = spaceBetween + leftOffset;
        const initialEndSpace = spaceBetween + rightOffset;
        const initalSize = vertical ? userSetBoxHeight : '100%';
        const horizontalPaddingStart = horizontalUseRtl ? 'paddingRight' : 'paddingLeft';
        const horizontalPaddingEnd = horizontalUseRtl ? 'paddingLeft' : 'paddingRight';
        const styleMap = {
            size: vertical ? 'height' : 'width',
            paddingStart: vertical ? 'paddingTop' : horizontalPaddingStart,
            paddingEnd: vertical ? 'paddingBottom' : horizontalPaddingEnd,
            translate: vertical ? 'translateY' : 'translateX',
        };
        // bugfix: item 为半透明状态下 fakeItem 和普通 item 重叠露馅问题
        // @en bugfix: Solve the problem of overlapping fakeItem and the normal item when item is translucent
        const transformStyle: CSSProperties = isFake
            ? {
                  visibility:
                      (childIndex === total && transforms[0] > 0) ||
                      (childIndex === -1 && transforms[total - 1] < 0)
                          ? 'hidden'
                          : 'initial',
              }
            : {
                  transform: `${styleMap.translate}(${transforms[childIndex] || 0}px)`,
              };
        // childSize <= 0 说明是未全部加载完成的首屏情况 做一下特殊处理
        // @en childSize <= 0 indicates that the first screen is not fully loaded, so do some special treatment
        const layoutStyle: CSSProperties =
            childSize > 0
                ? {
                      [styleMap.size]: childSize - spaceBetween,
                      [styleMap.paddingStart]: spaceBetween,
                      boxSizing: 'content-box',
                  }
                : {
                      [styleMap.size]: initalSize,
                      [styleMap.paddingStart]: initialStartSpace,
                      [styleMap.paddingEnd]: initialEndSpace,
                      boxSizing: 'border-box',
                      transform: `${styleMap.translate}(${
                          childIndex === index
                              ? 0
                              : (index - childIndex) * (spaceBetween + leftOffset + rightOffset)
                      }px)`,
                  };
        const fakeStyle: CSSProperties = isFake ? getItemFakeStyle(childIndex) : {};
        if (isFake && childSize < 0) {
            delete fakeStyle.transform;
        }
        return getStyleWithVendor({
            ...transformStyle,
            ...layoutStyle,
            ...fakeStyle,
        });
    }

    function renderChild(child: ReactNode, childIndex: number, prefix: string) {
        // 兼容线上逻辑，不需要切换放大效果的，不包裹item-inner
        // @en No need to switch the magnification effect, do not wrap item-inner
        return inactiveValidScale === 1 ? (
            child
        ) : (
            <div className={`${prefix}-item-inner`} style={getItemInnerStyle(childIndex)}>
                {child}
            </div>
        );
    }

    function renderFakeItem(prefix: string, fakeIndex: number, side: 'left' | 'right') {
        if (!fakeItem || fakeIndex === void 0) {
            return null;
        }
        const posIndex = side === 'left' ? fakeIndex - total : fakeIndex + total;
        return (
            <div
                key={`${fakeIndex}${posIndex}`}
                data-fake-index={fakeIndex}
                data-index={posIndex}
                className={cls(`${prefix}-item carousel-item fake-item fake-${side}`, { vertical })}
                style={getItemStyle(posIndex, true)}
            >
                {renderChild(allChildren[fakeIndex], posIndex, prefix)}
            </div>
        );
    }

    function renderAllFakeItem(prefix: string) {
        return fakeIndexes.map(fakeIndex =>
            renderFakeItem(prefix, fakeIndex.index, fakeIndex.side),
        );
    }

    function renderCarousel({ prefixCls }) {
        const prefix = `${prefixCls}-carousel`;
        return (
            <div className={cls(`${prefix}-wrap`, className)} style={wrapStyle} ref={domRef}>
                {needRefreshDom ? (
                    <div
                        key="fake-carousel"
                        className={`${prefix} wrap-placeholder`}
                        ref={fakeWrapRef}
                    />
                ) : null}
                <div
                    key="carousel"
                    className={prefix}
                    onTouchEnd={handleTouchEnd}
                    onTouchCancel={handleTouchEnd}
                    ref={wrapRef}
                    style={getCarouselStyle()}
                >
                    <div
                        className={cls(`${prefix}-inner ${cubic}`, { vertical })}
                        style={getInnerStyle()}
                        ref={innerRef}
                    >
                        {allChildren.map((child, childIndex) => {
                            const inView =
                                lazyloadCount !== void 0
                                    ? childIndex >= index - lazyloadCount &&
                                      childIndex <= index + lazyloadCount
                                    : true;
                            return (
                                <div
                                    key={childIndex}
                                    className={cls(`${prefix}-item carousel-item normal-item`, {
                                        active: childIndex === index,
                                        vertical,
                                        'ssr-float': childSize <= 0 && childIndex !== index,
                                    })}
                                    style={getItemStyle(childIndex)}
                                    ref={childRef => {
                                        itemsRef.current[childIndex] = childRef;
                                    }}
                                >
                                    {inView || transforms[childIndex]
                                        ? renderChild(child, childIndex, prefix)
                                        : null}
                                </div>
                            );
                        })}
                        {renderAllFakeItem(prefix)}
                    </div>
                </div>
                {showIndicator && (total > 1 || !hideSingleIndicator) ? (
                    <div
                        key="carousel-indicator"
                        className={cls(
                            `${prefix}-indicator pos-${indicatorPos} ${prefix}-indicator-${
                                vertical ? 'vertical' : 'horizontal'
                            }`,
                            { [`vertical ver-pos-${indicatorVerticalPos}`]: vertical },
                            {
                                inverse:
                                    indicatorInverse === void 0
                                        ? indicatorOutside
                                        : indicatorInverse,
                            },
                            { outside: indicatorOutside },
                        )}
                    >
                        {renderIndicator
                            ? renderIndicator(shownIndex, shownTotal, lastShownIndexRef.current)
                            : indicatorArr.map((_, i) => (
                                  <i
                                      key={i}
                                      className={cls(
                                          'indicator',
                                          `type-${indicatorType}`,
                                          indicatorClass,
                                          {
                                              active: i === shownIndex,
                                          },
                                      )}
                                  />
                              ))}
                    </div>
                ) : null}
            </div>
        );
    }

    return <ContextLayout>{renderCarousel}</ContextLayout>;
});

export default Carousel;
