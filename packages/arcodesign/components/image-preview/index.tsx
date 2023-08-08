import React, {
    useRef,
    forwardRef,
    Ref,
    useImperativeHandle,
    useEffect,
    useState,
    CSSProperties,
    ReactNode,
} from 'react';
import {
    nextTick,
    componentWrapper,
    preventEleScroll,
    freeEleScroll,
    cls,
} from '@arco-design/mobile-utils';
import TransformAble from '@arco-design/transformable';
import { ContextLayout, CompWithGlobalContext } from '../context-provider';
import Carousel, { CarouselProps, CarouselRef } from '../carousel';
import Transition from '../transition';
import BaseImage, { ImageRef, ImageProps } from '../image';
import {
    useWindowSize,
    useRefState,
    usePopupScroll,
    getStyleWithVendor,
    useSystem,
    useSingleAndDoubleClick,
} from '../_helpers';
import Portal from '../portal';
import { open } from './methods';
import Loading from '../loading';

export * from './methods';

export interface PreviewImageProps {
    /**
     * 图片地址
     * @en Image resource
     */
    src: string;
    /**
     * 图片布局方式，preview-y为宽度撑满高度溢出滚动，preview-x为高度撑满宽度溢出滚动
     * @en Image layout, preview-y is overflow scrolling with full width and height, preview-x is overflow scrolling with full width and height
     */
    fit?: 'preview-y' | 'preview-x';
    /**
     * 过渡图url
     * @en Transition image url
     */
    fallbackSrc?: string;
    /**
     * 缩略图填充方式（backgroundPosition），默认top center
     * @en Thumbnail fill mode (backgroundPosition), default value is top center
     */
    thumbPosition?: string;
    /**
     * 自定义DOM
     * @en Custom dom
     */
    extraNode?: ReactNode;
}

export interface ImagePreviewProps
    extends Pick<
        CarouselProps,
        | 'animateDurationSlide'
        | 'showIndicator'
        | 'hideSingleIndicator'
        | 'indicatorPos'
        | 'percentToChange'
        | 'distanceToChange'
        | 'speedToChange'
        | 'swipeable'
    > {
    /**
     * 自定义样式
     * @en Custom stylesheet
     */
    style?: React.CSSProperties;
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 图片信息数组
     * @en Image List
     */
    images: PreviewImageProps[];
    /**
     * 打开时展示的index，在images范围内会展示弹窗，否则隐藏弹窗
     * @en The index displayed when it is opened, the popup will be displayed within the scope of images, otherwise the popup will be hidden
     */
    openIndex: number;
    /**
     * 是否可循环滑动
     * @en Whether it can be swiped circularly
     * @default false
     */
    loop?: boolean;
    /**
     * 图片布局方式，preview-y为宽度撑满高度溢出滚动，preview-x为高度撑满宽度溢出滚动
     * @en Image layout, preview-y is overflow scrolling with full width and height, preview-x is overflow scrolling with full width and height
     * @default "preview-y"
     */
    fit?: PreviewImageProps['fit'];
    /**
     * 打开和关闭时的过渡动画
     * @en Transition animation on opening and closing
     * @default 300
     */
    displayDuration?: number;
    /**
     * 是否在原图加载完成后将过渡图动画替换为原图动画
     * @en Whether to replace the transition image animation with the original image animation after the original image is loaded
     */
    replaceFallbackWhenLoaded?: boolean;
    /**
     * 图片不可选中，屏蔽系统默认事件
     * @en The image cannot be selected, and the system default event is blocked
     * @default true
     */
    noselect?: boolean;
    /**
     * 图片横向间距
     * @en Horizontal spacing of images
     */
    spaceBetween?: number;
    /**
     * 自定义展示加载中内容
     * @en Custom display loading content
     */
    loadingArea?: ReactNode;
    /**
     * 自定义展示加载失败内容
     * @en Custom display loading failure content
     */
    errorArea?: ReactNode;
    /**
     * 是否展示图片加载中提示
     * @en Whether to display the image loading prompt
     * @default true
     */
    showLoading?: boolean;
    /**
     * 是否展示图片加载失败提示
     * @en Whether to display the image loading failure prompt
     * @default true
     */
    showError?: boolean;
    /**
     * 失败时自动重试次数
     * @en Number of automatic retries on failure
     */
    retryTime?: number;
    /**
     * 是否直接渲染<img>标签，不走加载图片流程
     * @en Whether to render the <img> tag directly without going through the image loading process
     */
    staticLabel?: boolean;
    /**
     * 长图滚动变化曲线
     * @en Scrolling change curve of long image
     */
    scrollBezier?: [number, number, number, number];
    /**
     * 只加载当前页相邻的n个内容，为0时会销毁所有相邻内容
     * @en Only load n content adjacent to the current page, when it is 0, all adjacent content will be destroyed
     * @default 1
     */
    lazyloadCount?: number;
    /**
     * 当图片滚动到边缘时，继续滑动是否关闭预览
     * @en When the image is scrolled to the edge, whether to close the preview when continuing to swipe
     * @default true
     */
    swipeToClose?: boolean;
    /**
     * 轮播索引位置
     * @en Carousel indicator position
     * @default "start"
     */
    indicatorPos?: CarouselProps['indicatorPos'];
    /**
     * 图片捏合时最小缩放倍数，松手后仍会恢复到1的状态，默认为0.7
     * @en The minimum zoom factor when the image is pinched, it will still return to the state of 1 after letting go, the default is 0.7
     */
    getMinScale?: (image: HTMLImageElement | null, imageIndex: number) => number;
    /**
     * 图片最大缩放倍数，默认根据图片尺寸调节
     * @en The maximum zoom factor of the image, the default is adjusted according to the picture size
     */
    getMaxScale?: (image: HTMLImageElement | null, imageIndex: number) => number;
    /**
     * 当双击图片时，图片应缩放的倍数
     * @en The zoom factor of the image when double-clicking the image
     */
    getDoubleClickScale?: (
        currentScale: number,
        maxScale: number,
        image: HTMLImageElement | null,
        imageIndex: number,
    ) => number;
    /**
     * 获取挂载容器
     * @en Get mounted container
     */
    getContainer?: () => HTMLElement;
    /**
     * 自定义索引内容
     * @en Custom indicator content
     */
    renderIndicator?: CarouselProps['renderIndicator'];
    /**
     * 获取缩略图定位
     * @en Get the thumbnail image Positioning
     */
    getThumbBounds?: (index: number) => ClientRect;
    /**
     * 索引发生改变时回调
     * @en Callback when index changes
     */
    onChange?: CarouselProps['onChange'];
    /**
     * 索引切换，动画完成后触发
     * @en Callback after animation is completed when the index toggles
     */
    onAfterChange?: (index: number) => void;
    /**
     * 关闭弹窗
     *  @en close popup
     */
    close: (e: React.MouseEvent<HTMLDivElement, MouseEvent> | TouchEvent) => void;
    /**
     * 关闭弹窗回调（动画执行完成后）
     * @en Callback when closing the popup (after the animation is completed)
     */
    onClose?: () => void;
    /**
     * 点击图片回调，如果返回true则阻止关闭弹窗
     * @en Callback when clicking the image, if it returns true, it will prevent the popup from closing
     */
    onImageClick?: (
        index: number,
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => boolean | void;
    /**
     * 双击图片回调
     * @en Callback when double clicking the image
     */
    onImageDoubleClick?: (index: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    /**
     * 长按图片回调
     * @en Callback when long pressing image
     */
    onImageLongTap?: (index: number, image: HTMLImageElement | null, e: TouchEvent) => void;
    /**
     * 弹窗内容touchstart事件
     * @en Popup content touchstart event
     */
    onTouchStart?: (e: TouchEvent, index: number) => void | boolean;
    /**
     * 弹窗内容touchmove事件
     * @en Popup content touchmove event
     */
    onTouchMove?: (e: TouchEvent, index: number) => void | boolean;
    /**
     * 弹窗内容touchend / touchcancel事件
     * @en Popup content touchend / touchcancel events
     */
    onTouchEnd?: (e: TouchEvent, index: number) => void | boolean;
}

export interface ImagePreviewRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
    /**
     * 原生图片 DOM 列表
     * @en Native image DOM array
     */
    imageDoms: (HTMLImageElement | null)[];
}

export interface PreviewImageStatus {
    firstLoaded?: boolean;
    loaded?: boolean;
    animated?: boolean;
    originWidth?: number;
    originHeight?: number;
    originTop?: number;
    originLeft?: number;
    hasOverflow?: boolean;
}

export interface PreviewTransImageInfo {
    src: string;
    fit: PreviewImageProps['fit'];
    index: number;
    movingImage: HTMLImageElement;
    onLoad: ImageProps['onLoad'];
    onError: ImageProps['onError'];
}

const MAX_ZOOM = 5;
const MIN_ZOOM = 0.7;

const ImagePreview = forwardRef((props: ImagePreviewProps, ref: Ref<ImagePreviewRef>) => {
    const {
        style,
        className,
        images,
        loop = false,
        openIndex,
        fit,
        noselect = true,
        displayDuration = 350,
        spaceBetween = 0,
        showLoading = true,
        loadingArea,
        errorArea,
        showError = true,
        retryTime,
        staticLabel,
        replaceFallbackWhenLoaded,
        scrollBezier,
        lazyloadCount = 1,
        swipeToClose = true,
        getMinScale,
        getMaxScale,
        getDoubleClickScale,
        getContainer,
        getThumbBounds,
        renderIndicator,
        onChange,
        onAfterChange,
        onImageClick,
        onImageDoubleClick,
        onImageLongTap,
        close,
        onClose,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        indicatorPos = 'start',
        ...otherProps
    } = props;
    const system = useSystem();
    const domRef = useRef<HTMLDivElement | null>(null);
    const imagesRef = useRef<(ImageRef | null)[]>([]);
    const carouselRef = useRef<CarouselRef | null>(null);
    const transformersRef = useRef<any[]>([]);
    const dblTimerRef = useRef<number | null>(null);
    const longTimerRef = useRef<number | null>(null);
    const transImageRef = useRef<HTMLImageElement | null>(null);
    const imageDomsRef = useRef<(HTMLImageElement | null)[]>([]);
    const touchStartXRef = useRef(0);
    const startTouchingSideRef = useRef(false);
    const movedRef = useRef(false);
    const dblClickingRef = useRef(false);
    const longTapCheckingRef = useRef(false);
    const innerIndexRef = useRef(openIndex);
    const touchingSideDisRef = useRef(0);
    const lastScaleRef = useRef(0);
    const closingRef = useRef(false);
    const isInitialMount = useRef(false);
    const [showPlaceholders, setPlaceholders] = useState<{ [index: number]: boolean }>({});
    const [imagesStatus, imagesStatusRef, setImagesStatus] = useRefState<PreviewImageStatus[]>([]);
    const [transImageInfo, setTransImageInfo] = useState<PreviewTransImageInfo | null>(null);
    const openLoaded = imagesStatus[openIndex]?.loaded;
    const openAnimated = imagesStatus[openIndex]?.animated;

    const visible = openIndex >= 0 && openIndex < images.length;

    const { windowWidth, windowHeight } = useWindowSize(true);

    useImperativeHandle(ref, () => ({
        dom: domRef.current,
        imageDoms: imageDomsRef.current,
    }));

    usePopupScroll(visible, domRef.current, () => [], 'top', handlePreventCallback);

    useEffect(() => {
        if (visible) {
            innerIndexRef.current = openIndex;
            closingRef.current = false;
            carouselRef.current && carouselRef.current.changeIndex(openIndex, true);
            setImagesStatus(
                images.map((_, index) => ({
                    firstLoaded: imagesStatusRef.current[index]?.firstLoaded || false,
                    animated: index !== openIndex,
                })),
            );
            setDisplayAnimation(openIndex);
        } else {
            // 移除长按事件监听
            // @en Remove long press event listener
            longTimerRef.current && clearTimeout(longTimerRef.current);
            longTapCheckingRef.current = false;
            // 图片状态重置
            // @en Reset image state
            setImagesStatus(
                imagesStatusRef.current.map(status => ({
                    ...status,
                    animated: false,
                    loaded: false,
                })),
            );
            transformersRef.current = [];
            // 移除过渡图片
            // @en Remove transition image
            removeChild(document.querySelector('.image-preview-fake-trans-image'));
            setTransImageInfo(null);
            setPlaceholders({});
            const mounted = isInitialMount.current;
            setTimeout(() => {
                mounted && onClose && onClose();
            }, displayDuration);
        }
        isInitialMount.current = true;
    }, [visible]);

    useEffect(() => {
        if (visible && openLoaded && openAnimated) {
            setTimeout(() => {
                removeChild(transImageRef.current);
                transImageRef.current = null;
            }, 100);
        }
    }, [visible, openLoaded, openAnimated]);

    useEffect(() => {
        // 执行过渡动画时避免滚动穿透
        // @en Avoid scroll penetration when performing transition animation
        if (transImageInfo) {
            preventEleScroll();
        } else {
            nextTick(() => {
                freeEleScroll();
            });
        }
    }, [transImageInfo]);

    useEffect(() => {
        (transformersRef.current || []).forEach((transformer, index) => {
            transformer && transformer.setMinScale(getImageMinScale(index));
        });
    }, [getMinScale]);

    useEffect(() => {
        (transformersRef.current || []).forEach((transformer, index) => {
            transformer && transformer.setMaxScale(getImageMaxScale(index));
        });
    }, [getMaxScale]);

    function removeChild(child?: Node | null) {
        try {
            child && document.body.removeChild(child);
        } catch (e) {}
    }

    // 监听滑动到上下边缘后还在往外滑动的操作，则关闭弹窗
    // @en Monitor the operation of sliding out after sliding to the upper and lower edges, then close the popup
    function handlePreventCallback(_, dir) {
        if (!isTransforming() && dir === 'y') {
            touchingSideDisRef.current += 1;
        }
    }

    /**
     * 缩放插件初始化
     * @en Zoom plugin initialization
     */
    function initTransformer(index: number) {
        const imageDom = imagesRef.current[index]?.dom;
        const wrapDom = imageDom?.parentElement;
        if (!imageDom || !wrapDom) {
            return;
        }
        if (transformersRef.current[index]) {
            transformersRef.current[index].setDom(wrapDom);
        } else {
            // 缩放插件中对长图的处理：放大状态为模拟手势滚动，还原状态为真实滚动
            // @en The processing of long images in the zoom plugin: the zoomed state is simulated gesture scrolling, and the restored state is real scrolling
            transformersRef.current[index] = new TransformAble({
                // wrapDom为无transform和transition的纯净容器
                // @en wrapDom is a pure container without transform and transition
                dom: wrapDom,
                motionThreshold: 0,
                dragMode: 'always',
                transformMode: 'matrix',
                useDomBoundary: false,
                cubic: {
                    scroll: scrollBezier,
                },
                onTransform: () => {
                    // 图片放大再缩小，解决ios图片放大后模糊的问题
                    // @en The image is zoomed in and then zoomed out to solve the problem of blurring after zooming in on ios images
                    const img = imageDomsRef.current[index];
                    const trans = transformersRef.current[index]?.getTransform?.() || {};
                    const width = imagesStatusRef.current[index]?.originWidth;
                    const height = imagesStatusRef.current[index]?.originHeight;
                    const scale = trans.scale || 1;
                    // 判断下只有图片缩放发生改变时重写图片样式
                    // @en It is judged that only the image style is rewritten when the zoom of the image changes.
                    if (img && width && height && lastScaleRef.current !== scale) {
                        lastScaleRef.current = scale;
                        const atCenter = !imageHasOverflow(img) ? ' translateY(-50%)' : '';
                        img.style.width = `${width * scale}px`;
                        img.style.height = `${height * scale}px`;
                        const transform = `scale(${1 / scale}) translateZ(0)${atCenter}`;
                        img.style.transform = transform;
                        img.style.webkitTransform = transform;
                        img.style.transformOrigin = 'top left';
                        img.style.webkitTransformOrigin = 'top left';
                    }
                },
                onRestore: () => {
                    lastScaleRef.current = 0;
                },
                onZoomEnd: (_1, _2, pinchStartCenter) => {
                    setPlaceholders(holders => ({ ...holders, [index]: false }));
                    const image = imageDomsRef.current[index];
                    const transformer = transformersRef.current[index];
                    if (!image || !transformer || transformer.getTransform().scale < 1) {
                        return;
                    }
                    const imageRect = image.getBoundingClientRect();
                    if (imageRect.width > windowWidth && imageRect.height > windowHeight) {
                        if (pinchStartCenter && pinchStartCenter.length) {
                            transformer.setCenter(...pinchStartCenter);
                        }
                        transformer.setFixedX(false);
                        transformer.setFixedY(false);
                    } else if (imageRect.height <= windowHeight) {
                        if (!transformer.fixedY) {
                            transformer.setFixedY(true);
                            transformer.bounce();
                        }
                    } else if (imageRect.width <= windowWidth) {
                        if (!transformer.fixedX) {
                            transformer.setFixedX(true);
                            transformer.bounce();
                        }
                    }
                },
                minScale: getImageMinScale(index),
                maxScale: getImageMaxScale(index),
            });
        }
        setOriginBoundary(index);
    }

    function imageHasOverflow(img: HTMLImageElement | null) {
        return Boolean(img && !img.classList.contains('preview-fit-contain-y'));
    }

    function setOriginBoundary(index: number) {
        const imageEle = imagesRef.current[index];
        const imageDom = imageEle?.dom;
        // 边界范围变为图片范围和容器范围的并集
        // @en The bounding range becomes the union of the image range and the container range
        if (imageDom?.parentElement && imageEle?.image) {
            const rect = imageEle.image.getBoundingClientRect();
            const eleRect = imageDom.parentElement.getBoundingClientRect();
            if (transformersRef.current[index]) {
                transformersRef.current[index].setBoundary(
                    {
                        left: Math.min(rect.left, eleRect.left),
                        right: Math.max(rect.right, eleRect.right),
                        top: Math.min(rect.top, eleRect.top),
                        bottom: Math.max(rect.bottom, eleRect.bottom),
                    },
                    true,
                );
            }
        }
    }

    /**
     * 获取最小缩放倍数
     * @en Get the minimum zoom factor
     */
    function getImageMinScale(index?: number) {
        const currentIndex = index === void 0 ? innerIndexRef.current : index;
        const imageDom = imageDomsRef.current[currentIndex];
        if (!imageDom) {
            return 1;
        }
        if (getMinScale) {
            return getMinScale(imageDom, currentIndex);
        }
        return MIN_ZOOM;
    }

    /**
     * 获取最大缩放倍数
     * @en Get the maximum zoom factor
     */
    function getImageMaxScale(index?: number) {
        const currentIndex = index === void 0 ? innerIndexRef.current : index;
        const imageDom = imageDomsRef.current[currentIndex];
        if (!imageDom) {
            return 1;
        }
        if (getMaxScale) {
            return getMaxScale(imageDom, currentIndex);
        }
        const imageWidth = imageDom.naturalWidth;
        const imageHeight = imageDom.naturalHeight;
        let maxScale = 1;
        if (imageWidth > imageHeight) {
            maxScale = (imageWidth / windowWidth) * MAX_ZOOM;
        } else {
            maxScale = Math.max(MAX_ZOOM, imageWidth / windowWidth);
        }
        return maxScale;
    }

    /**
     * 计算双击时图片缩放倍数
     * @en Calculate the zoom factor of the image when double-clicking
     */
    function getImageDoubleClickScale(currentScale: number) {
        const index = innerIndexRef.current;
        const imageDom = imageDomsRef.current[index];
        if (!imageDom) {
            return 1;
        }
        const maxScale = getImageMaxScale(index);
        if (getDoubleClickScale) {
            return getDoubleClickScale(currentScale, maxScale, imageDom, index);
        }
        const imageWidth = imageDom.naturalWidth;
        const imageHeight = imageDom.naturalHeight;
        const fitScale =
            imageWidth > imageHeight
                ? ((imageWidth / windowWidth) * windowHeight) / imageHeight
                : 1;
        let dblScale = 2;
        if (fitScale >= 2) {
            dblScale = Math.min(maxScale, fitScale);
        }
        const current = Number(currentScale.toFixed(3));
        const dbl = Number(dblScale.toFixed(3));
        return current >= 1 && current < dbl ? dbl : 1;
    }

    /**
     * 还原缩放至原始位置
     * @en Revert zoom to original position
     */
    function restoreTransformer(index: number) {
        const transformer = transformersRef.current[index];
        if (transformer) {
            transformer.restore();
        }
    }

    /**
     * 是否正处于缩放状态
     * @en Whether it is zooming
     */
    function isTransforming(index?: number) {
        const currentIndex = index === void 0 ? innerIndexRef.current : index;
        return transformersRef.current[currentIndex]?.busy?.();
    }

    /**
     * 是否已经放大过
     * @en Whether is has been zoomed in
     */
    function isTransformed() {
        return transformersRef.current[innerIndexRef.current]?.dirty?.();
    }

    function isTapStop() {
        return transformersRef.current[innerIndexRef.current]?.isTapStop?.();
    }

    /**
     * 计算距离左右侧的距离，如果为0说明到边缘了，可以进行正常轮播操作
     * @en Calculate the distance from the left and right sides. If it is 0, it means that the edge is reached, and the normal rotation operation can be performed.
     */
    function transformTouchSide(): { side: boolean; left: boolean; right: boolean } {
        const transformer = transformersRef.current[innerIndexRef.current];
        const toLeft = transformer?.toLeft?.();
        const toRight = transformer?.toRight?.();
        return {
            side: !toLeft || !toRight,
            left: !toLeft,
            right: !toRight,
        };
    }

    function handleImageWrapTouchStart(e: TouchEvent) {
        if (onTouchStart && onTouchStart(e, innerIndexRef.current)) {
            return true;
        }
        const { touches } = e;
        touchStartXRef.current = e.touches && e.touches[0] ? e.touches[0].clientX : 0;
        movedRef.current = false;
        dblClickingRef.current = false;
        // 单点长按才触发长按
        // @en A single long press triggers a long press
        if (touches.length === 1) {
            if (!closingRef.current) {
                longTapCheckingRef.current = true;
            }
            longTimerRef.current = window.setTimeout(() => {
                if (longTapCheckingRef.current) {
                    longTapCheckingRef.current = false;
                    movedRef.current = true;
                    onImageLongTap &&
                        onImageLongTap(
                            innerIndexRef.current,
                            imageDomsRef.current[innerIndexRef.current],
                            e,
                        );
                }
            }, 300);
        } else {
            longTapCheckingRef.current = false;
        }
        if (isTapStop()) {
            movedRef.current = true;
        }
        // 缩放状态下，未到边缘时不触发轮播手势
        // @en In the zoomed state, the carousel gesture is not triggered when the edge is not reached
        if (isTransforming()) {
            startTouchingSideRef.current = transformTouchSide().side;
            return !startTouchingSideRef.current;
        }
    }

    function handleImageWrapTouchMove(e: TouchEvent) {
        movedRef.current = true;
        longTapCheckingRef.current = false;
        longTimerRef.current && clearTimeout(longTimerRef.current);
        if (onTouchMove && onTouchMove(e, innerIndexRef.current)) {
            return true;
        }
        const evt = e.changedTouches[0];
        const touchMoveX = evt.clientX || 0;
        const posDisX = touchMoveX - touchStartXRef.current;
        // 缩放状态下，到边缘时如果还在往外滑动，则触发轮播手势
        // @en In the zoomed state, if it is still swiped out when reaching the edge, the carousel gesture is triggered
        if (isTransforming()) {
            const sideInfo = transformTouchSide();
            return (
                !startTouchingSideRef.current ||
                !((sideInfo.left && posDisX > 0) || (sideInfo.right && posDisX < 0))
            );
        }
    }

    function handleImageWrapTouchEnd(e: TouchEvent) {
        if (onTouchEnd && onTouchEnd(e, innerIndexRef.current)) {
            return true;
        }
        // 滑动到上下边缘后还在往外滑动，则关闭弹窗
        // @en After sliding to the upper and lower edges and still sliding outwards, close the popup box
        // needClose为触发touchmove的次数，6和3是相对值，表示判断在往外滑动的敏感度，当未放大时对向外滑动手势更敏感
        // @en needClose is the number of times the touchmove is triggered, 6 and 3 are relative values, indicating the sensitivity of judging the outward sliding, and it is more sensitive to the outward sliding gesture when it is not zoomed in
        const needClose = swipeToClose && touchingSideDisRef.current >= (isTransformed() ? 6 : 3);
        touchingSideDisRef.current = 0;
        longTapCheckingRef.current = false;
        longTimerRef.current && clearTimeout(longTimerRef.current);
        if (needClose) {
            goClose(e);
            return true;
        }
        // 缩放状态下，未到边缘时不触发轮播手势
        // @en In the zoomed state, the carousel gesture is not triggered when the edge is not reached
        if (isTransforming() && !transformTouchSide().side) {
            return true;
        }
    }

    function handleImageClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (movedRef.current) {
            return;
        }
        // 300ms内再次点击则触发doubleClick，否则触发click
        // @en Click again within 300ms to trigger doubleClick, otherwise trigger click
        dblTimerRef.current = window.setTimeout(() => {
            if (!dblClickingRef.current) {
                if (!onImageClick || !onImageClick(innerIndexRef.current, e)) {
                    goClose(e);
                }
            }
        }, 300);
    }

    function handleImageDoubleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (dblClickingRef.current) {
            // 防止重复触发dblclick
            return;
        }
        dblClickingRef.current = true;
        if (dblTimerRef.current) {
            clearTimeout(dblTimerRef.current);
            dblTimerRef.current = null;
        }
        const index = innerIndexRef.current;
        onImageDoubleClick && onImageDoubleClick(index, e);
        // 双击时根据配置放大或缩小
        // @en Zoom in or out according to configuration when double-clicking
        const transformer = transformersRef.current[index];
        if (transformer) {
            const trans = transformer.getTransform();
            const rate = trans.scale || 1;
            const dblScale = getImageDoubleClickScale(rate);
            if (dblScale === 1) {
                const img = imageDomsRef.current[index];
                // 长图双击还原缩放特殊处理，因为transform和scroll不能完全同步，所以先zoomTo到原点再restore
                // @en Double-click the long image to restore zoom special processing, because transform and scroll cannot be completely synchronized, so first zoomTo to the origin and then restore
                if (imageHasOverflow(img)) {
                    transformer.zoomToScreenCenter(1, [windowWidth / 2, windowHeight / 2], {
                        duration: 200,
                        callback: () => transformer.restore(),
                    });
                } else {
                    transformer.bounce();
                    transformer.restore();
                }
            } else {
                transformer.zoomToScreenCenter(dblScale, [windowWidth / 2, windowHeight / 2], {
                    duration: 200,
                    silent: false,
                });
            }
        }
    }

    const handleClick = useSingleAndDoubleClick(handleImageClick, handleImageDoubleClick);

    function goClose(e: React.MouseEvent<HTMLDivElement, MouseEvent> | TouchEvent) {
        if (closingRef.current) {
            return;
        }
        closingRef.current = true;
        close(e);
    }

    /**
     * 更改指定图片状态
     * @en Change specified image status
     */
    function setImagesStatusByIndex(index: number, data: PreviewImageStatus) {
        const newStatus = imagesStatusRef.current.slice();
        newStatus[index] = {
            ...(newStatus[index] || {}),
            ...data,
        };
        setImagesStatus(newStatus);
    }

    /**
     * 缩略图放大过渡动画设置
     * @en Set thumbnail zoom transition animation
     */
    function setDisplayAnimation(index: number) {
        const firstLoaded = imagesStatusRef.current[index]?.firstLoaded;
        const fallbackSrc =
            replaceFallbackWhenLoaded && firstLoaded
                ? images[index].src
                : images[index].fallbackSrc;
        // 用户设置了getThumbBounds和images的fallbackSrc属性才有放大过渡效果
        // @en Set the fallbackSrc attribute of getThumbBounds and images to have a zoom-in transition effect
        if (!getThumbBounds || !images[index] || !fallbackSrc) {
            resetAnimation(index);
            return;
        }
        // 获取缩略图的rect，如果没获取到就取消放大过渡效果
        // @en Get the rect of the thumbnail, if it is gotten, cancel the zoom transition effect
        const thumbBounds = getThumbBounds(index);
        if (!thumbBounds || !thumbBounds.width || !thumbBounds.height) {
            resetAnimation(index);
            return;
        }
        // 伪造一个fixed的图做小图放大效果
        // @en Forge a fixed image to make a small image enlargement effect
        const transImage = new Image();
        transImageRef.current = transImage;
        transImage.classList.add('image-preview-fake-trans-image');
        setImageBounds(transImage, thumbBounds, thumbBounds);
        transImage.src = fallbackSrc;
        transImage.style.objectPosition = images[index].thumbPosition || 'top center';
        transImage.style.opacity = '0';
        transImage.style.transitionDuration = `${displayDuration}ms`;
        transImage.style.webkitTransitionDuration = `${displayDuration}ms`;
        document.body.appendChild(transImage);
        // 拿到放大之后的位置rect，没拿到就取消小图放大效果
        // @en Get the zoomed-in position rect, and cancel the zoom-in effect if not getting it
        getNewImageBounds(index, fallbackSrc, transImage, rect => {
            if (!rect || !rect.width || !rect.height) {
                removeChild(transImage);
                resetAnimation(index);
                return;
            }
            // 通过小图rect变换到大图rect加transition做放大效果
            // @en Transform the small image rect to the large image rect and add transition to make a magnification effect
            nextTick(() => {
                transImage.style.opacity = '1';
                setImageBounds(transImage, rect, thumbBounds);
                setTimeout(() => {
                    setPlaceholders(holders => ({ ...holders, [index]: true }));
                }, Math.max(0, displayDuration - 80));
                setTimeout(() => {
                    resetAnimation(index);
                }, displayDuration + 30);
            });
        });
    }

    /**
     * 取消小图放大过渡效果
     * @en Cancel the thumbnail zoom transition effect
     */
    function resetAnimation(index: number) {
        setImagesStatusByIndex(index, { animated: true });
        setTransImageInfo(null);
    }

    /**
     * 根据rect设置图片的位置
     * @en Set the position of the image according to the rect
     */
    function setImageBounds(image: HTMLImageElement, rect: ClientRect, thumbRect: ClientRect) {
        // 这里为保持原有比例，只设置宽度变化，高度会随宽度等比变化
        image.style.width = `${thumbRect.width}px`;
        const transform = `translate3d(${rect.left}px, ${rect.top}px, 0) scale(${
            rect.width / thumbRect.width
        }`;
        image.style.transform = transform;
        image.style.webkitTransform = transform;
        image.style.transformOrigin = 'left top';
        image.style.webkitTransformOrigin = 'left top';
    }

    /**
     * 计算放大之后的位置rect
     * @en Calculate the position rect after zooming in
     */
    function getNewImageBounds(
        index: number,
        transSrc: string,
        transImage: HTMLImageElement,
        callback: (rect: ClientRect | null) => void,
    ) {
        if (!transSrc) {
            callback(null);
            return;
        }
        setTransImageInfo({
            src: transSrc,
            fit: images[index].fit,
            index,
            movingImage: transImage,
            onLoad: (_, image) => {
                setTimeout(() => {
                    callback(image.getBoundingClientRect());
                }, 20);
            },
            onError: () => callback(null),
        });
    }

    /**
     * @en 渲染轮播+图片展示
     * Rendering carousel + displaying image
     */
    function renderContent(
        carouselProps: CarouselProps & { ref?: any },
        allImages: PreviewImageProps[],
        getImageProps: (image: PreviewImageProps, index: number) => ImageProps,
    ) {
        return (
            <Carousel
                autoPlay={false}
                loop={loop}
                lazyloadCount={lazyloadCount}
                stopPropagation={false}
                {...carouselProps}
            >
                {(allImages || []).map((image, index) => {
                    const innerNode = (
                        <div
                            key={index}
                            className="preview-image-wrap"
                            style={{ padding: `0 ${spaceBetween}px` }}
                        >
                            <BaseImage
                                className="preview-image"
                                fit={image.fit || fit || 'preview-y'}
                                boxWidth={windowWidth - spaceBetween * 2}
                                boxHeight={windowHeight}
                                bottomOverlap={null}
                                {...getImageProps(image, index)}
                            />
                        </div>
                    );
                    return image.extraNode ? (
                        <div className="preview-image-wrap-container" key={`outer-${index}`}>
                            {innerNode}
                            {image.extraNode}
                        </div>
                    ) : (
                        innerNode
                    );
                })}
            </Carousel>
        );
    }

    function getImageClass(index: number) {
        const { loaded, animated } = imagesStatus[index] || {};
        return cls('preview-image', {
            'preview-hidden': index === openIndex && (!loaded || !animated),
        });
    }

    /**
     * 每张图片的样式
     * @en style of each image
     */
    function getImageStyle(): CSSProperties {
        // 因为缩放的容器必须是没有transform和transition的纯净元素
        // @en Because the scaled container must be a pure element without transform and transition
        // 所以这里强制设置overflow为visible，溢出滚动的部分交由外层来做
        // @en So it is forced to set overflow to visible, and the part of overflow scrolling is left to the outer layer.
        return {
            overflow: 'visible',
        };
    }

    // 渲染轮播指引器
    function renderPreviewIndicator(currentIndex: number, total: number, lastIndex: number) {
        if (renderIndicator) {
            return renderIndicator(currentIndex, total, lastIndex);
        }
        return openLoaded ? (
            <Portal>
                <div className="image-preview-indicator">
                    {currentIndex + 1}/{total}
                </div>
            </Portal>
        ) : null;
    }

    // ios在重设style时图片会消失一下造成闪动，因此在底下垫一张图
    // @en In iOS when resetting the style, the image will disappear and cause flickering, so put a image at the bottom
    // 优先过渡图，其次用原图
    // @en Prioritize the transition image, followed by the original image
    function renderImagePlaceholder(src: string, index: number, fitCss?: string) {
        const { originWidth, originHeight, originLeft, originTop, hasOverflow } =
            imagesStatus[index] || {};
        const trans = hasOverflow ? {} : getStyleWithVendor({ transform: 'translateY(-50%)' });
        const fitObj: CSSProperties | {} = fitCss ? { objectFit: fitCss } : {};
        return system === 'ios' && showPlaceholders[index] && originWidth && originHeight ? (
            <img
                src={src}
                style={{
                    position: 'absolute',
                    width: originWidth,
                    height: originHeight,
                    left: originLeft,
                    top: originTop,
                    ...fitObj,
                    ...trans,
                }}
            />
        ) : null;
    }

    function renderLoadingArea(index: number) {
        // loadingArea提出来，放到过渡图上层
        // @en The loadingArea is extracted and placed on the upper layer of the transition image
        return index === openIndex ? (
            <Portal>
                <div className="image-preview-loading-area">
                    {loadingArea || <Loading type="circle" className="loading-icon" radius={7} />}
                </div>
            </Portal>
        ) : (
            loadingArea
        );
    }

    return (
        <ContextLayout>
            {({ prefixCls }) => (
                <Portal getContainer={getContainer}>
                    <Transition
                        in={visible}
                        timeout={displayDuration}
                        type="fade"
                        mountOnEnter
                        unmountOnExit
                        nodeRef={domRef}
                    >
                        <div
                            className={cls(
                                `${prefixCls}-image-preview`,
                                'all-border-box',
                                { noselect },
                                className,
                            )}
                            style={style}
                            ref={domRef}
                            onClick={handleClick}
                            onDoubleClick={handleImageDoubleClick}
                        >
                            {renderContent(
                                {
                                    indicatorPos,
                                    initialIndex: openIndex,
                                    ref: carouselRef,
                                    renderIndicator: renderPreviewIndicator,
                                    onChange: index => {
                                        innerIndexRef.current = index;
                                        onChange && onChange(index);
                                    },
                                    onAfterChange: (index, oldIndex) => {
                                        onAfterChange && onAfterChange(index);
                                        restoreTransformer(oldIndex);
                                        nextTick(() => {
                                            initTransformer(innerIndexRef.current);
                                        });
                                    },
                                    onTouchMove: handleImageWrapTouchMove,
                                    onTouchStart: handleImageWrapTouchStart,
                                    onTouchEnd: handleImageWrapTouchEnd,
                                    ...otherProps,
                                },
                                images,
                                (image, index) => ({
                                    src: image.src,
                                    ref: r => {
                                        imagesRef.current[index] = r;
                                    },
                                    showLoading,
                                    loadingArea: renderLoadingArea(index),
                                    errorArea,
                                    showError,
                                    retryTime,
                                    staticLabel,
                                    animateDuration: transImageInfo ? 0 : void 0,
                                    style: getImageStyle(),
                                    className: getImageClass(index),
                                    bottomOverlap: renderImagePlaceholder(
                                        image.fallbackSrc || image.src,
                                        index,
                                        image.fit || fit,
                                    ),
                                    onLoad: (_, imageEle) => {
                                        imageDomsRef.current[index] = imageEle;
                                        setImagesStatusByIndex(index, {
                                            loaded: true,
                                            firstLoaded: true,
                                            originWidth: imageEle.offsetWidth,
                                            originHeight: imageEle.offsetHeight,
                                            originTop: imageEle.offsetTop,
                                            originLeft: imageEle.offsetLeft,
                                            hasOverflow: imageHasOverflow(imageEle),
                                        });
                                        if (index === openIndex) {
                                            initTransformer(index);
                                        } else {
                                            setPlaceholders(holders => ({
                                                ...holders,
                                                [index]: true,
                                            }));
                                        }
                                    },
                                    onError: () => {
                                        imageDomsRef.current[index] = null;
                                        if (index === openIndex) {
                                            const transImage = transImageInfo?.movingImage;
                                            removeChild(transImage);
                                            setImagesStatusByIndex(index, {
                                                animated: true,
                                                loaded: true,
                                            });
                                            setTransImageInfo(null);
                                        }
                                    },
                                }),
                            )}
                            {transImageInfo ? (
                                <div className="image-preview-fake-rect">
                                    {renderContent(
                                        {
                                            initialIndex: 0,
                                        },
                                        [{ src: transImageInfo.src, fit: transImageInfo.fit }],
                                        () => ({
                                            staticLabel,
                                            src: transImageInfo.src,
                                            animateDuration: 0,
                                            onLoad: transImageInfo.onLoad,
                                            onError: transImageInfo.onError,
                                        }),
                                    )}
                                </div>
                            ) : null}
                        </div>
                    </Transition>
                    {transImageInfo ? (
                        <div className="image-preview-lock-modal" onClick={goClose} />
                    ) : null}
                </Portal>
            )}
        </ContextLayout>
    );
});

export function methodsGenerator<P extends ImagePreviewProps>(Comp: React.FunctionComponent<P>) {
    return {
        /**
         * 打开图片预览
         * @desc {en} Open image preview
         * @param {ImagePreviewProps} config configuration
         * @returns {{ close: () => void; update: (newConfig: ImagePreviewProps) => void; }}
         */
        open: open(Comp),
    };
}

const ImagePreviewWithGlobalContext = CompWithGlobalContext(ImagePreview);

/**
 * 图片预览组件，支持循环轮播、双指/双击缩放、缩略图放大效果。
 * @en The image preview, supports circular rotation, two-finger/double-tap zoom, and thumbnail zoom effects.
 * @type 信息展示
 * @type_en Data Display
 * @name 图片预览
 * @name_en ImagePreview
 */
export default componentWrapper(ImagePreview, methodsGenerator(ImagePreviewWithGlobalContext));
