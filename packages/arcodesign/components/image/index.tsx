import React, {
    ReactNode,
    forwardRef,
    Ref,
    useImperativeHandle,
    useRef,
    useEffect,
    CSSProperties,
    useMemo,
} from 'react';
import { cls, defaultLocale, nextTick } from '@arco-design/mobile-utils';
import { ContextLayout } from '../context-provider';
import Loading from '../loading';
import { useSystem, useWindowSize, getStyleWithVendor, useMountedState } from '../_helpers';

export type ImageStatus = 'loading' | 'loaded' | 'init' | 'error';

export interface ImageProps {
    /**
     * 自定义样式
     * @en Custom stylesheet
     */
    style?: CSSProperties;
    /**
     * 自定义类名
     * @en Custom classname
     */
    className?: string;
    /**
     * 指定图片状态，staticLabel=false时有效
     * @en The specified image state, valid when staticLabel=false
     */
    status?: ImageStatus;
    /**
     * 图片链接
     * @@en Image resource
     *  */
    src: string;
    /**
     * 容器宽度，传数值，默认单位为px，传字符串则接受传入的单位
     * @en Container width, when number is input, the default unit is px, if a string is input, the unit is accepted
     *  */
    width?: string | number;
    /**
     * 容器高度，传数值，默认单位为px，传字符串则接受传入的单位
     * @en Container height, when number is input, the default unit is px, if a string is input, the unit is accepted
     *  */
    height?: string | number;
    /**
     * 替代文本
     * @en Alternative text
     * @default ""
     */
    alt?: string;
    /**
     * 图片填充模式(object-fit)，传preview-*为预览模式，预览模式仅staticLabel=false时有效
     * @en Image fill mode (object-fit), preview-* is preview mode, preview mode is only valid when staticLabel=false
     * @default "fill"
     */
    fit?: CSSProperties['objectFit'] | 'preview-y' | 'preview-x';
    /**
     * 图片填充位置(object-position)
     * @en Image fill position(object-position)
     * @default "center"
     */
    position?: CSSProperties['objectPosition'];
    /**
     * 图片圆角
     * @en Image border radius
     *  */
    radius?: string | number;
    /**
     * 是否加边框
     * @en Whether to add a border
     *  */
    bordered?: boolean;
    /**
     * 自定义展示加载中内容，staticLabel=false时有效
     * @en Custom display loading content, valid when staticLabel=false
     *  */
    loadingArea?: ReactNode;
    /**
     * 自定义展示加载失败内容，staticLabel=false时有效
     * @en Custom display failed to load content, valid when staticLabel=false
     *  */
    errorArea?: ReactNode;
    /**
     * 是否展示图片加载中提示，staticLabel=false时有效
     * @en Whether to display the image loading prompt, valid when staticLabel=false
     *  */
    showLoading?: boolean;
    /**
     * 是否展示图片加载失败提示，staticLabel=false时有效
     * @en Whether to display the image loading failure prompt, valid when staticLabel=false
     *  */
    showError?: boolean;
    /**
     * 加载完时展现动画时长，staticLabel=false时有效
     * @en Display animation duration when loading is complete, valid when staticLabel=false
     * @default 200
     */
    animateDuration?: number;
    /**
     * 失败时自动重试次数
     * @en Number of automatic retries on failure
     * @default 0
     */
    retryTime?: number;
    /**
     * 是否强制使用https
     * @en Whether to force the use of https
     *  */
    forceHttps?: boolean;
    /**
     * 预览模式下，父容器宽度
     * @en In preview mode, the width of the parent container
     *  */
    boxWidth?: number;
    /**
     * 预览模式下，父容器高度
     * @en In preview mode, the height of the parent container
     *  */
    boxHeight?: number;
    /**
     * 图片顶层内容
     * @en Top-level content of the image
     */
    topOverlap?: ReactNode;
    /**
     * 图片底层内容（placeholder），默认是灰色兜底，传null可移除
     * @en The bottom content of the image (placeholder), the default is gray bottom, input null to remove
     *  */
    bottomOverlap?: ReactNode;
    /**
     * 手动控制是否加载图片
     * @en Manually control whether to load images
     *  */
    showImage?: boolean;
    /**
     * 是否直接渲染<img>标签，不走加载图片流程
     * @en Whether to render the <img> tag directly without going through the image loading process
     *  */
    staticLabel?: boolean;
    /**
     * img标签原生属性，优先级低于单独设置
     * @en Img tag native attributes, the priority is lower than the separate setting
     */
    nativeProps?: React.DetailedHTMLProps<
        React.ImgHTMLAttributes<HTMLImageElement>,
        HTMLImageElement
    >;
    /**
     * 切换status时触发的回调
     * @en Callback triggered when switching status
     */
    onChange?: (status: string) => void;
    /**
     * 点击图片时触发的回调
     * @en Callback when clicking image
     */
    onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    /**
     * 图片加载完毕时触发的回调
     * @en Callback when the image is loaded
     * */
    onLoad?: (e: Event, image: HTMLImageElement) => void;
    /**
     * 图片加载失败时触发的回调，如果有自动重试则在重试最终失败后触发
     * @en Callback when the image fails to load, triggered after the retry finally fails if there is an automatic retry
     */
    onError?: (e: string | Event) => void;
    /**
     * 图片加载失败时自动重试触发的回调
     * @en Callback triggered by automatic retry when image loading fails
     */
    onAutoRetry?: (e: string | Event) => void;
}

export interface ImageRef {
    /**
     * 最外层元素 DOM
     * @en The outermost element DOM
     */
    dom: HTMLDivElement | null;
    /**
     * 原生图片元素 DOM
     * @en Native image element DOM
     */
    image: HTMLImageElement | null;
    /**
     * 手动重试图片加载
     * @en Manually retry image loading
     */
    retry: () => void;
}

/**
 * 增强版的 img 标签，提供多种图片填充模式，支持图片加载中提示、加载失败提示。
 * @en Enhanced img tag, provides a variety of image filling modes, and supports image loading prompts and loading failure prompts.
 * @type 信息展示
 * @type_en Data Display
 * @name 图片
 * @name_en Image
 */
export const BaseImage = forwardRef((props: ImageProps, ref: Ref<ImageRef>) => {
    const system = useSystem();
    const { windowWidth, windowHeight } = useWindowSize();
    const [imageStatus, setImageStatus] = useMountedState<ImageStatus>('init');
    const [wrapClass, setWrapClass] = useMountedState('');
    const [staticRetrying, setStaticRetrying] = useMountedState(false);
    const imageRef = useRef<HTMLDivElement | null>(null);
    const imageDomRef = useRef<HTMLImageElement | null>(null);
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const retryCountRef = useRef(0);
    const loadingImageRef = useRef<HTMLImageElement | null>(null);
    const hasLoadedRef = useRef(false);
    const {
        style,
        className,
        status,
        src,
        width,
        height,
        alt = '',
        fit = 'cover',
        position = 'center',
        radius,
        bordered,
        loadingArea,
        errorArea,
        showLoading,
        showError,
        animateDuration = 200,
        retryTime = 0,
        forceHttps,
        boxWidth = 0,
        boxHeight = 0,
        topOverlap,
        bottomOverlap,
        showImage = true,
        staticLabel,
        nativeProps = {},
        onChange,
        onClick,
        onLoad,
        onError,
        onAutoRetry,
    } = props;
    const isPreview = Boolean(fit.indexOf('preview') >= 0);
    const actualBoxWidth = boxWidth || windowWidth;
    const actualBoxHeight = boxHeight || windowHeight;
    const validStatus = status === undefined ? imageStatus : status;

    const attrs = useMemo(() => {
        const imageStyle: CSSProperties = {};
        if (!isPreview) {
            imageStyle.objectFit = fit as CSSProperties['objectFit'];
            imageStyle.objectPosition = position;
        }
        return {
            alt,
            src: forceHttps ? src.replace('http://', 'https://') : src,
            className: `image-content${bordered ? ' bordered' : ''} ${system}`,
            style: imageStyle,
        };
    }, [alt, bordered, fit, forceHttps, isPreview, position, radius, src, system]);

    function retry() {
        loadImage(true);
    }

    useImperativeHandle(ref, () => ({
        dom: wrapRef.current,
        image: imageDomRef.current,
        retry,
    }));

    useEffect(() => {
        retryCountRef.current = 0;
        loadImage();
    }, [attrs, width, height, showImage, staticLabel]);

    function changeStatus(newStatus: ImageStatus) {
        setImageStatus(newStatus);
        onChange && onChange(newStatus);
    }

    function replaceChild(newChild: HTMLElement) {
        const dom = imageRef.current;
        if (!dom) {
            return;
        }
        if (dom.children && dom.children.length) {
            dom.replaceChild(newChild, dom.children[0]);
        } else {
            dom.appendChild(newChild);
        }
    }

    function loadImage(isFromRetry?: boolean) {
        // 如果在加载图片前发现上一个图片还没加载完，则抛弃上一个图片的加载
        // @en Abort last image before starting loading new image
        if (loadingImageRef.current) {
            loadingImageRef.current.src = '';
            loadingImageRef.current = null;
        }
        if (!showImage || staticLabel) {
            return;
        }
        changeStatus('loading');
        const image = new Image();
        Object.keys(nativeProps).forEach(key => {
            image[key] = nativeProps[key];
        });
        image.className = attrs.className;
        Object.keys(attrs.style).forEach((key: string) => {
            image.style[key] = attrs.style[key];
        });
        image.onload = evt => {
            loadingImageRef.current = null;
            imageDomRef.current = image;
            hasLoadedRef.current = true;
            changeStatus('loaded');
            const { width: imageWidth = 0, height: imageHeight = 0 } = image;
            let extraClass = '';
            if (isPreview) {
                const scale = imageWidth / imageHeight;
                const windowScale = actualBoxWidth / actualBoxHeight;
                if (fit === 'preview-y') {
                    if (scale < windowScale) {
                        image.style.width = `${actualBoxWidth}px`;
                        image.style.height = `${actualBoxWidth / scale}px`;
                        extraClass = 'preview-overflow-y';
                    } else {
                        extraClass = 'preview-fit-contain-y';
                    }
                } else if (fit === 'preview-x') {
                    if (scale > windowScale) {
                        image.style.width = `${actualBoxHeight * scale}px`;
                        image.style.height = `${actualBoxHeight}px`;
                        extraClass = 'preview-overflow-x';
                    } else {
                        extraClass = 'preview-fit-contain-x';
                    }
                }
            }
            extraClass && image.classList.add(extraClass);
            setWrapClass(extraClass ? `${extraClass}-container` : '');
            replaceChild(image);
            onLoad && onLoad(evt, image);
        };
        image.onerror = evt => {
            loadingImageRef.current = null;
            if (isFromRetry || retryCountRef.current >= retryTime) {
                changeStatus('error');
                const placeholder = document.createElement('div');
                replaceChild(placeholder);
                onError && onError(evt);
            } else {
                retryCountRef.current += 1;
                onAutoRetry && onAutoRetry(evt);
                loadImage();
            }
        };
        nextTick(() => {
            image.src = attrs.src;
            image.alt = attrs.alt;
            loadingImageRef.current = image;
        });
    }

    function handleStaticImageError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
        const evt = e.nativeEvent;
        if (retryCountRef.current >= retryTime) {
            onError && onError(evt);
        } else {
            retryCountRef.current += 1;
            onAutoRetry && onAutoRetry(evt);
            // 强制刷新一下<img>使其重新加载
            // @en Force refresh <img> to reload
            setStaticRetrying(true);
            nextTick(() => {
                setStaticRetrying(false);
            });
        }
    }

    function getImageStyle(): CSSProperties {
        if (isPreview) {
            const overflow: CSSProperties =
                fit === 'preview-x'
                    ? {
                          overflowX: 'auto',
                      }
                    : {
                          overflowY: 'auto',
                      };
            return {
                width: actualBoxWidth,
                height: actualBoxHeight,
                ...overflow,
            };
        }
        return {
            width: Number(width) || width,
            height: Number(height) || height,
        };
    }

    return (
        <ContextLayout>
            {({ prefixCls, locale = defaultLocale }) => (
                <div
                    className={cls(
                        `${prefixCls}-image all-border-box`,
                        { preview: isPreview },
                        system,
                        wrapClass,
                        className,
                    )}
                    style={{ ...getImageStyle(), ...(style || {}) }}
                    ref={wrapRef}
                >
                    {bottomOverlap !== null ? (
                        <div
                            className="image-content image-bottom-overlap"
                            style={{ borderRadius: radius }}
                        >
                            {bottomOverlap || <div className="image-placeholder" />}
                        </div>
                    ) : null}
                    <div
                        className={cls('image-container', validStatus, {
                            animate: Boolean(animateDuration),
                            'static-label': staticLabel,
                            'has-loaded': hasLoadedRef.current,
                        })}
                        style={getStyleWithVendor({
                            borderRadius: radius,
                            transitionDuration: `${animateDuration}ms`,
                        })}
                        onClick={onClick}
                        ref={imageRef}
                    >
                        {staticLabel && showImage && !staticRetrying ? (
                            <img
                                {...nativeProps}
                                {...attrs}
                                ref={imageDomRef}
                                onLoad={e => onLoad && onLoad(e.nativeEvent, imageDomRef.current!)}
                                onError={handleStaticImageError}
                            />
                        ) : null}
                    </div>
                    {showLoading && validStatus === 'loading' ? (
                        <div
                            className="image-content image-loading-container"
                            style={{ borderRadius: radius }}
                        >
                            {loadingArea || (
                                <div className="image-loading">
                                    <Loading
                                        type="circle"
                                        className="loading-icon"
                                        radius={8.5}
                                        stroke={3}
                                    />
                                </div>
                            )}
                        </div>
                    ) : null}
                    {showError && validStatus === 'error' ? (
                        <div
                            className="image-content image-error-container"
                            onClick={e => {
                                e.stopPropagation();
                                retry();
                            }}
                            style={{ borderRadius: radius }}
                        >
                            {errorArea || (
                                <div className="image-retry-load">{locale.Image.loadError}</div>
                            )}
                        </div>
                    ) : null}
                    {topOverlap ? (
                        <div
                            className="image-content image-top-overlap"
                            style={{ borderRadius: radius }}
                        >
                            {topOverlap}
                        </div>
                    ) : null}
                </div>
            )}
        </ContextLayout>
    );
});

export default BaseImage;
